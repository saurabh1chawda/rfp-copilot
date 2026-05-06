import React, { useState, useRef, useCallback, useEffect } from "react";
import Welcome      from "./components/Welcome";
import Sidebar      from "./components/Sidebar";
import QuestionPanel from "./components/QuestionPanel";
import Dashboard    from "./components/Dashboard";
import { extractQuestions, generateDraft, generateAllDrafts } from "./api/claude";

function makeQuestion(raw) {
  return {
    ...raw,
    draft:       null,
    confidence:  null,
    isGap:       false,
    sourceId:    null,
    sourceTitle: null,
    finalAnswer: null,
    status:      "pending",   // pending | generating | drafted | accepted | edited | rejected | error
    errorMsg:    null,
  };
}

export default function App() {
  const [screen,    setScreen]    = useState("welcome");   // welcome | workspace
  const [questions, setQuestions] = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [selectedId,setSelectedId]= useState(null);
  const [filter,    setFilter]    = useState("all");
  const [genAll,    setGenAll]    = useState(false);
  const abortRef = useRef(null);

  // Auto-select first question when list loads
  useEffect(() => {
    if (questions.length && !selectedId) setSelectedId(questions[0].id);
  }, [questions]);

  const updateQuestion = useCallback((id, updates) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  }, []);

  // ── Analyse RFP ──────────────────────────────────────────────────────────
  async function handleAnalyze(rfpText) {
    setLoading(true);
    try {
      const raw = await extractQuestions(rfpText);
      const qs  = raw.map(makeQuestion);
      setQuestions(qs);
      setSelectedId(qs[0]?.id || null);
      setFilter("all");
      setScreen("workspace");
    } catch (e) {
      throw e;   // bubble to Welcome for display
    } finally {
      setLoading(false);
    }
  }

  // ── Generate single draft ─────────────────────────────────────────────────
  async function handleGenerate(q) {
    updateQuestion(q.id, { status: "generating" });
    try {
      const result = await generateDraft(q.question, q.category);
      updateQuestion(q.id, { ...result, status: "drafted" });
    } catch (e) {
      updateQuestion(q.id, { status: "error", errorMsg: e.message });
    }
  }

  // ── Generate ALL pending drafts ───────────────────────────────────────────
  async function handleGenerateAll() {
    setGenAll(true);
    const controller = new AbortController();
    abortRef.current = controller;
    await generateAllDrafts(questions, (id, updates) => updateQuestion(id, updates), controller.signal);
    setGenAll(false);
  }

  function handleAbort() {
    abortRef.current?.abort();
    setGenAll(false);
  }

  // ── Derived filtered list ────────────────────────────────────────────────
  const filtered = filter === "all" ? questions : questions.filter(q => q.category === filter);
  const selected = questions.find(q => q.id === selectedId) || null;

  // ── Workspace layout ─────────────────────────────────────────────────────
  if (screen === "workspace") {
    return (
      <div style={{ display:"flex", height:"100vh", overflow:"hidden", fontFamily:"'DM Sans',sans-serif" }}>
        <Sidebar
          questions={filtered}
          selectedId={selectedId}
          onSelect={setSelectedId}
          filter={filter}
          onFilter={cat => {
            setFilter(cat);
            const show = cat === "all" ? questions : questions.filter(q => q.category === cat);
            if (show.length && !show.find(q => q.id === selectedId)) setSelectedId(show[0].id);
          }}
          onReset={() => { setScreen("welcome"); setQuestions([]); setSelectedId(null); setFilter("all"); }}
        />
        <QuestionPanel
          question={selected}
          onGenerate={handleGenerate}
          onAccept={q  => updateQuestion(q.id, { status:"accepted", finalAnswer: q.draft })}
          onReject={q  => updateQuestion(q.id, { draft:null, confidence:null, isGap:false, sourceId:null, status:"pending", finalAnswer:null })}
          onSaveEdit={(q,text) => updateQuestion(q.id, { status:"edited", finalAnswer:text, draft:text })}
        />
        <Dashboard
          questions={questions}
          onGenerateAll={handleGenerateAll}
          genAll={genAll}
          genAbort={handleAbort}
        />
      </div>
    );
  }

  return <Welcome onAnalyze={handleAnalyze} loading={loading}/>;
}
