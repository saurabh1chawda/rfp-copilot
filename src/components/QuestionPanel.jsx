import React, { useState, useEffect } from "react";
import {
  Sparkles, Loader, Check, Edit3, X, CheckCircle, AlertTriangle,
  Clock, RefreshCw, FileText, Database
} from "lucide-react";
import { CATEGORY_CONFIG, CONTENT_LIBRARY } from "../data/library";

function Badge({ children, color, bg, border }) {
  return <span style={{ background:bg, color, border:`1px solid ${border||color}33`, borderRadius:20, padding:"2px 9px", fontSize:11, fontWeight:600, display:"inline-flex", alignItems:"center", gap:4 }}>{children}</span>;
}

function ConfidenceBar({ score }) {
  const col = score > 70 ? "#10B981" : score > 40 ? "#F59E0B" : "#EF4444";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ width:60, height:5, borderRadius:3, background:"#E2E8F0", overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${score}%`, background:col, borderRadius:3, transition:"width .5s" }}/>
      </div>
      <span style={{ fontSize:11, fontWeight:700, color:col }}>{score}%</span>
      <span style={{ fontSize:11, color:"#94A3B8" }}>confidence</span>
    </div>
  );
}

export default function QuestionPanel({ question, onGenerate, onAccept, onReject, onSaveEdit }) {
  const [editing,  setEditing]  = useState(false);
  const [editText, setEditText] = useState("");

  useEffect(() => { setEditing(false); setEditText(""); }, [question?.id]);

  if (!question) {
    return (
      <main style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"#F8FAFC" }}>
        <div style={{ textAlign:"center", color:"#CBD5E1" }}>
          <FileText size={48} style={{ margin:"0 auto 12px", opacity:.3 }}/>
          <p style={{ fontSize:14 }}>Select a question from the sidebar</p>
        </div>
      </main>
    );
  }

  const cfg  = CATEGORY_CONFIG[question.category] || CATEGORY_CONFIG.Technical;
  const done = question.status === "accepted" || question.status === "edited";
  const srcEntry = question.sourceId ? CONTENT_LIBRARY.find(e => e.id === question.sourceId) : null;

  return (
    <main style={{ flex:1, background:"#F8FAFC", display:"flex", flexDirection:"column", overflowY:"auto" }}>

      {/* Question header */}
      <div style={{ background:"white", borderBottom:"1px solid #E2E8F0", padding:"1.25rem 1.5rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:10 }}>
          <Badge color={cfg.color} bg={cfg.bg}>{question.category}</Badge>
          <Badge
            color={question.complexity==="High"?"#EF4444":question.complexity==="Medium"?"#F59E0B":"#10B981"}
            bg={question.complexity==="High"?"#FEF2F2":question.complexity==="Medium"?"#FFFBEB":"#ECFDF5"}
          >
            {question.complexity}
          </Badge>
          <span style={{ display:"flex", alignItems:"center", gap:4, color:"#94A3B8", fontSize:11 }}>
            <Clock size={11}/> ~{question.estimatedMinutes} min
          </span>
          <span style={{ marginLeft:"auto", color:"#CBD5E1", fontSize:12, fontWeight:700 }}>{question.id}</span>
        </div>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:19, color:"#0F172A", lineHeight:1.45 }}>
          {question.question}
        </h2>
      </div>

      {/* Content area */}
      <div className="fade-in" style={{ padding:"1.5rem", flex:1 }}>

        {/* PENDING state */}
        {question.status === "pending" && (
          <div style={{ background:"white", border:"2px dashed #E2E8F0", borderRadius:16, padding:"3rem 2rem", textAlign:"center" }}>
            <div style={{ width:64, height:64, borderRadius:16, background:"#EEF2FF", margin:"0 auto 1.5rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Sparkles size={28} color="#6366F1"/>
            </div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18, color:"#1E293B", marginBottom:8 }}>Generate AI Draft</h3>
            <p style={{ color:"#94A3B8", fontSize:13, marginBottom:"1.5rem", lineHeight:1.65, maxWidth:360, margin:"0 auto 1.5rem" }}>
              Claude searches your content library and writes a professional, credible first-pass response in seconds.
            </p>
            <button onClick={() => onGenerate(question)} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"white", border:"none", borderRadius:12, padding:"12px 28px", fontSize:14, fontWeight:700, fontFamily:"'Syne',sans-serif", boxShadow:"0 6px 22px rgba(99,102,241,.32)", display:"inline-flex", alignItems:"center", gap:8, cursor:"pointer" }}>
              <Sparkles size={15}/> Generate Draft
            </button>
          </div>
        )}

        {/* GENERATING state */}
        {question.status === "generating" && (
          <div style={{ background:"white", border:"2px solid #EEF2FF", borderRadius:16, padding:"3rem 2rem", textAlign:"center" }}>
            <div className="pulse" style={{ width:64, height:64, borderRadius:16, background:"#EEF2FF", margin:"0 auto 1.5rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Loader size={28} color="#6366F1" className="spin"/>
            </div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18, color:"#1E293B", marginBottom:6 }}>Generating Draft…</h3>
            <p style={{ color:"#94A3B8", fontSize:13 }}>Searching the content library and composing your response</p>
          </div>
        )}

        {/* ERROR state */}
        {question.status === "error" && (
          <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:12, padding:"1.5rem", textAlign:"center" }}>
            <AlertTriangle size={28} color="#EF4444" style={{ margin:"0 auto 10px" }}/>
            <h3 style={{ color:"#EF4444", fontSize:15, fontWeight:700, marginBottom:6 }}>Generation Failed</h3>
            <p style={{ color:"#7F1D1D", fontSize:13, marginBottom:"1rem" }}>{question.errorMsg || "An unexpected error occurred."}</p>
            <button onClick={() => onGenerate(question)} style={{ background:"#EF4444", color:"white", border:"none", borderRadius:8, padding:"9px 20px", fontSize:13, fontWeight:600, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6 }}>
              <RefreshCw size={13}/> Retry
            </button>
          </div>
        )}

        {/* DRAFTED / ACCEPTED / EDITED state */}
        {(question.status === "drafted" || done) && question.draft && (
          <div>
            {/* Status badges row */}
            <div style={{ display:"flex", gap:10, marginBottom:"1rem", flexWrap:"wrap" }}>
              <div style={{ background:question.isGap?"#FEF2F2":"#F0FDF4", border:`1px solid ${question.isGap?"#FECACA":"#BBF7D0"}`, borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", gap:7 }}>
                {question.isGap
                  ? <AlertTriangle size={14} color="#EF4444"/>
                  : <CheckCircle size={14} color="#10B981"/>}
                <span style={{ fontSize:12, fontWeight:600, color:question.isGap?"#EF4444":"#10B981" }}>
                  {question.isGap ? "Knowledge gap — needs SME input" : "Content library match found"}
                </span>
              </div>
              {question.confidence != null && <ConfidenceBar score={question.confidence}/>}
            </div>

            {/* Source entry callout */}
            {srcEntry && !question.isGap && (
              <div style={{ background:"white", border:"1px solid #E2E8F0", borderRadius:10, padding:"10px 14px", marginBottom:"1rem", display:"flex", alignItems:"flex-start", gap:10 }}>
                <Database size={14} color="#6366F1" style={{ flexShrink:0, marginTop:2 }}/>
                <div>
                  <span style={{ fontSize:11, fontWeight:700, color:"#6366F1" }}>{srcEntry.id} · {srcEntry.topic}</span>
                  <p style={{ fontSize:11, color:"#64748B", marginTop:3, lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                    {srcEntry.answer}
                  </p>
                </div>
              </div>
            )}

            {/* Draft / answer card */}
            <div style={{ background:"white", border:"1px solid #E2E8F0", borderRadius:14, overflow:"hidden", marginBottom:"1rem", borderTop:`3px solid ${done?"#10B981":"#6366F1"}` }}>
              <div style={{ padding:"10px 14px", borderBottom:"1px solid #F1F5F9", background:done?"#F0FDF4":"#FAFBFF", display:"flex", alignItems:"center", gap:7 }}>
                {done ? <CheckCircle size={13} color="#10B981"/> : <Sparkles size={13} color="#6366F1"/>}
                <span style={{ fontSize:12, fontWeight:600, color:done?"#10B981":"#6366F1" }}>
                  {done ? "Accepted response" : "AI draft — review & accept"}
                </span>
              </div>
              <div style={{ padding:"1rem 1.25rem" }}>
                {editing ? (
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    rows={6}
                    style={{ width:"100%", border:"1px solid #C7D2FE", borderRadius:8, padding:"0.875rem", fontSize:13, lineHeight:1.8, color:"#1E293B", outline:"none", resize:"vertical", background:"#FAFBFF", display:"block", fontFamily:"'DM Sans',sans-serif" }}
                    autoFocus
                  />
                ) : (
                  <p style={{ fontSize:13, lineHeight:1.85, color:"#1E293B", margin:0 }}>
                    {done && question.finalAnswer ? question.finalAnswer : question.draft}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons — DRAFTED */}
{question.status === "drafted" && !editing && (
  <div style={{ display:"flex", gap:8 }}>
    <button onClick={() => onAccept(question)} style={{ flex:1, padding:"12px 8px", background:"#10B981", color:"white", border:"2px solid #10B981", borderRadius:10, fontSize:13, fontWeight:700, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, cursor:"pointer", boxShadow:"0 4px 14px rgba(16,185,129,.3)" }}>
      <Check size={16}/>
      <span style={{ fontSize:11, fontWeight:600, opacity:.9 }}>Accept</span>
    </button>
    <button onClick={() => { setEditText(question.draft); setEditing(true); }} style={{ flex:1, padding:"12px 8px", background:"white", color:"#475569", border:"2px solid #E2E8F0", borderRadius:10, fontSize:13, fontWeight:600, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, cursor:"pointer" }}>
      <Edit3 size={16}/>
      <span style={{ fontSize:11, fontWeight:600 }}>Edit</span>
    </button>
    <button onClick={() => onReject(question)} style={{ flex:1, padding:"12px 8px", background:"white", color:"#EF4444", border:"2px solid #FECACA", borderRadius:10, fontSize:13, fontWeight:600, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, cursor:"pointer" }}>
      <X size={16}/>
      <span style={{ fontSize:11, fontWeight:600 }}>Reject</span>
    </button>
  </div>
)}

            {/* Action buttons — EDITING */}
            {editing && (
              <div style={{ display:"flex", gap:9 }}>
                <button onClick={() => { onSaveEdit(question, editText); setEditing(false); }} style={{ flex:1, padding:"11px", background:"#10B981", color:"white", border:"none", borderRadius:10, fontSize:13, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", gap:7, cursor:"pointer" }}>
                  <Check size={15}/> Save & Accept
                </button>
                <button onClick={() => setEditing(false)} style={{ padding:"11px 16px", background:"#F8FAFC", color:"#475569", border:"1px solid #E2E8F0", borderRadius:10, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                  <X size={13}/> Cancel
                </button>
              </div>
            )}

            {/* Action buttons — DONE */}
{done && !editing && (
  <div style={{ display:"flex", gap:8 }}>
    <button onClick={() => { setEditText(question.finalAnswer || question.draft); setEditing(true); }} style={{ flex:1, padding:"12px 8px", background:"white", color:"#475569", border:"2px solid #E2E8F0", borderRadius:10, fontSize:13, fontWeight:600, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, cursor:"pointer" }}>
      <Edit3 size={16}/>
      <span style={{ fontSize:11, fontWeight:600 }}>Revise</span>
    </button>
    <button onClick={() => onReject(question)} style={{ flex:1, padding:"12px 8px", background:"white", color:"#EF4444", border:"2px solid #FECACA", borderRadius:10, fontSize:13, fontWeight:600, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, cursor:"pointer" }}>
      <RefreshCw size={16}/>
      <span style={{ fontSize:11, fontWeight:600 }}>Reset</span>
    </button>
  </div>
)}
          </div>
        )}
      </div>
    </main>
  );
}
