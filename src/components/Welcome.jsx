import React, { useState } from "react";
import { Zap, Sparkles, Loader, FileText, Shield, BarChart2, Database } from "lucide-react";
import { SAMPLE_RFP } from "../data/sampleRfp";

const features = [
  { icon: FileText,   label: "AI Question Extraction",   desc: "Every question extracted & categorised in seconds" },
  { icon: Sparkles,   label: "Draft Generation",          desc: "Library-grounded first-pass answers instantly" },
  { icon: Database,   label: "Gap Detection",             desc: "Know exactly what your library is missing" },
  { icon: BarChart2,  label: "Live Dashboard",            desc: "Real-time completion, effort & category analytics" },
];

export default function Welcome({ onAnalyze, loading }) {
  const [text,        setText]        = useState("");
  const [err,         setErr]         = useState("");
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [loadingOwn,  setLoadingOwn]  = useState(false);

  // Primary CTA — load sample and analyse immediately
  async function handleTryDemo() {
    setErr("");
    setLoadingDemo(true);
    try { await onAnalyze(SAMPLE_RFP); }
    catch (e) { setErr("Demo failed: " + e.message); }
    finally { setLoadingDemo(false); }
  }

  // Secondary CTA — analyse whatever the user pasted
  async function handleAnalyseOwn() {
    if (!text.trim()) { setErr("Please paste your RFP text above first."); return; }
    setErr("");
    setLoadingOwn(true);
    try { await onAnalyze(text); }
    catch (e) { setErr("Analysis failed: " + e.message); }
    finally { setLoadingOwn(false); }
  }

  const busy = loading || loadingDemo || loadingOwn;

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0E1A",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden",
    }}>
      {/* Background glows */}
      {[
        { w:480,h:480,bg:"#6366F1",top:"-12%",left:"-8%"  },
        { w:360,h:360,bg:"#8B5CF6",bottom:"0%",right:"-6%" },
        { w:240,h:240,bg:"#EC4899",top:"45%",left:"60%"   },
      ].map((g,i) => (
        <div key={i} style={{
          position:"absolute", borderRadius:"50%", filter:"blur(88px)", opacity:.1,
          width:g.w, height:g.h, background:g.bg,
          top:g.top, bottom:g.bottom, left:g.left, right:g.right, pointerEvents:"none",
        }}/>
      ))}

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:560, display:"flex", flexDirection:"column", alignItems:"center" }}>

        {/* Logo — no subtitle */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
          <div style={{ width:48, height:48, borderRadius:14, background:"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 28px rgba(99,102,241,.4)" }}>
            <Zap size={24} color="white" />
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:28, color:"#F8FAFC", letterSpacing:"-0.5px", lineHeight:1 }}>
            RFP Copilot
          </div>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:38, color:"#F8FAFC", lineHeight:1.18, letterSpacing:"-1.2px", textAlign:"center", marginBottom:14 }}>
          Complete Enterprise RFPs<br />
          <span style={{ background:"linear-gradient(135deg,#818CF8,#C084FC)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            10× Faster with AI
          </span>
        </h1>
        <p style={{ fontSize:14, color:"#64748B", lineHeight:1.75, textAlign:"center", marginBottom:36, maxWidth:440 }}>
          Paste your RFP below. AI extracts every question, categorises it, estimates effort, and generates professional draft responses grounded in your content library — in seconds.
        </p>

        {/* Features grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, width:"100%", marginBottom:24 }}>
          {features.map(f => (
            <div key={f.label} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", borderRadius:12, padding:"12px 14px", display:"flex", alignItems:"flex-start", gap:10 }}>
              <div style={{ width:30, height:30, borderRadius:8, background:"rgba(99,102,241,.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <f.icon size={14} color="#A5B4FC" />
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:"#CBD5E1", marginBottom:2 }}>{f.label}</div>
                <div style={{ fontSize:11, color:"#475569", lineHeight:1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input card */}
        <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.09)", borderRadius:20, padding:"1.5rem", width:"100%", backdropFilter:"blur(20px)" }}>

          {/* Textarea label */}
          <label style={{ color:"#CBD5E1", fontWeight:600, fontSize:13, display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
            <FileText size={13} color="#6366F1" /> Have your own RFP? Paste it below
          </label>
          <textarea
            value={text}
            onChange={e => { setText(e.target.value); setErr(""); }}
            placeholder={"Paste your RFP document here…\n\nThe AI will extract every question, categorise it (Technical / Security / Pricing / Legal / Company), score its complexity, estimate effort, and generate a professional draft response from the built-in content library."}
            rows={7}
            style={{ width:"100%", background:"rgba(0,0,0,.32)", border:"1px solid rgba(255,255,255,.07)", borderRadius:12, padding:"0.875rem 1rem", color:"#E2E8F0", fontSize:13, lineHeight:1.75, resize:"vertical", outline:"none", display:"block", fontFamily:"'DM Sans',sans-serif" }}
          />

          {/* Note banner */}
          <div style={{ marginTop:12, background:"rgba(99,102,241,.1)", border:"1px solid rgba(99,102,241,.25)", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"flex-start", gap:8 }}>
            <span style={{ fontSize:14, flexShrink:0 }}>💡</span>
            <p style={{ fontSize:12, color:"#A5B4FC", lineHeight:1.6, margin:0 }}>
              Don't have an API key? Hit <strong style={{ color:"#C4B5FD" }}>"Try Live Demo"</strong> below — no setup needed, it works instantly.
            </p>
          </div>

          {err && (
            <p style={{ color:"#F87171", fontSize:12, marginTop:8, display:"flex", alignItems:"center", gap:5 }}>
              <Shield size={11}/>{err}
            </p>
          )}

          {/* PRIMARY CTA — Try Live Demo */}
          <button
            onClick={handleTryDemo}
            disabled={busy}
            style={{ width:"100%", marginTop:12, padding:"14px", background:busy?"rgba(99,102,241,.4)":"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"white", border:"none", borderRadius:12, fontSize:15, fontWeight:700, fontFamily:"'Syne',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:busy?"none":"0 8px 28px rgba(99,102,241,.38)", cursor:busy?"not-allowed":"pointer", transition:"box-shadow .2s" }}
          >
            {loadingDemo
              ? [<Loader key="l" size={16} className="spin"/>, "Loading demo…"]
              : [<Sparkles key="s" size={16}/>, "Try Live Demo"]}
          </button>

          {/* SECONDARY CTA — Analyse own RFP */}
          <button
            onClick={handleAnalyseOwn}
            disabled={busy}
            style={{ width:"100%", marginTop:8, padding:"13px", background:"transparent", color:busy?"#334155":"#94A3B8", border:"1px solid rgba(255,255,255,.1)", borderRadius:12, fontSize:14, fontWeight:600, fontFamily:"'Syne',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:7, cursor:busy?"not-allowed":"pointer", transition:"border-color .2s, color .2s" }}
            onMouseEnter={e => { if(!busy){ e.currentTarget.style.borderColor="rgba(99,102,241,.5)"; e.currentTarget.style.color="#A5B4FC"; }}}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; e.currentTarget.style.color=busy?"#334155":"#94A3B8"; }}
          >
            {loadingOwn
              ? [<Loader key="l" size={14} className="spin"/>, "Analysing your RFP…"]
              : "Analyse my own RFP →"}
          </button>
        </div>

        {/* Footer — no "Powered by" text */}
        <p style={{ fontSize:11, color:"#334155", marginTop:16, textAlign:"center", lineHeight:1.6 }}>
          Built as a portfolio proof-of-work for <strong style={{color:"#475569"}}>Loopio's Lead PM role</strong>
        </p>
      </div>
    </div>
  );
}
