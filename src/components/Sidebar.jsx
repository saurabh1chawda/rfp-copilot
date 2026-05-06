import React from "react";
import { Zap, RotateCcw, Code, Shield, DollarSign, Scale, Building } from "lucide-react";
import { CATEGORY_CONFIG } from "../data/library";

const ICONS = { Code, Shield, DollarSign, Scale, Building };

function statusDot(q) {
  if (q.status === "accepted" || q.status === "edited") return "#10B981";
  if (q.status === "generating") return "#F59E0B";
  if (q.status === "error") return "#EF4444";
  if (q.draft) return "#6366F1";
  return "#2D3748";
}

export default function Sidebar({ questions, selectedId, onSelect, filter, onFilter, onReset }) {
  const cats = ["all", "Technical", "Security", "Pricing", "Legal", "Company"];
  const done  = questions.filter(q => q.status === "accepted" || q.status === "edited").length;
  const shown = filter === "all" ? questions : questions.filter(q => q.category === filter);

  return (
    <aside style={{ width:256, background:"#0F172A", display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden", borderRight:"1px solid rgba(255,255,255,.06)", flexShrink:0 }}>

      {/* Header */}
      <div style={{ padding:"14px 12px 10px", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:30, height:30, borderRadius:9, background:"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Zap size={15} color="white"/>
            </div>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, color:"#F8FAFC", fontSize:15 }}>RFP Copilot</span>
          </div>
          <button onClick={onReset} title="Start new RFP" style={{ background:"none", border:"none", color:"#475569", fontSize:11, display:"flex", alignItems:"center", gap:4, padding:0, cursor:"pointer" }}>
            <RotateCcw size={13}/> New
          </button>
        </div>
        <div style={{ background:"rgba(99,102,241,.1)", border:"1px solid rgba(99,102,241,.22)", borderRadius:9, padding:"8px 12px", textAlign:"center" }}>
          <span style={{ color:"#A5B4FC", fontSize:15, fontWeight:800, fontFamily:"'Syne',sans-serif" }}>{done}</span>
          <span style={{ color:"#334155", fontSize:13 }}>/{questions.length} complete</span>
        </div>
      </div>

      {/* Category filters */}
      <div style={{ padding:"8px 10px 6px", borderBottom:"1px solid rgba(255,255,255,.04)", display:"flex", flexWrap:"wrap", gap:3 }}>
        {cats.map(c => {
          const cnt = c === "all" ? questions.length : questions.filter(q => q.category === c).length;
          const active = filter === c;
          const cfg = CATEGORY_CONFIG[c];
          return (
            <button key={c} onClick={() => onFilter(c)} style={{ background:active?(cfg?`${cfg.color}22`:"rgba(99,102,241,.18)"):"transparent", color:active?(cfg?.color||"#A5B4FC"):"#475569", border:active?`1px solid ${cfg?.color||"#6366F1"}44`:"1px solid transparent", borderRadius:6, padding:"3px 8px", fontSize:11, fontWeight:500, cursor:"pointer" }}>
              {c === "all" ? "All" : c.slice(0,3)} ({cnt})
            </button>
          );
        })}
      </div>

      {/* Question list */}
      <div style={{ flex:1, overflowY:"auto", padding:"6px 6px" }}>
        {shown.map(q => {
          const sel = q.id === selectedId;
          const cfg = CATEGORY_CONFIG[q.category] || CATEGORY_CONFIG.Technical;
          const dot = statusDot(q);
          const Icon = ICONS[cfg.icon];
          return (
            <button key={q.id} onClick={() => onSelect(q.id)} style={{ width:"100%", textAlign:"left", padding:"9px 10px", background:sel?"rgba(99,102,241,.14)":"transparent", border:sel?"1px solid rgba(99,102,241,.28)":"1px solid transparent", borderLeft:sel?"3px solid #6366F1":"3px solid transparent", borderRadius:9, marginBottom:2, display:"block", transition:"all .12s", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:3 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:dot, flexShrink:0, boxShadow:q.status==="generating"?`0 0 6px ${dot}`:"none" }}/>
                <span style={{ color:"#334155", fontSize:10, fontWeight:700 }}>{q.id}</span>
                <span style={{ color:cfg.color, fontSize:9, background:cfg.bg, padding:"1px 5px", borderRadius:4, fontWeight:700, display:"inline-flex", alignItems:"center", gap:3 }}>
                  {Icon && <Icon size={8}/>} {q.category.slice(0,3).toUpperCase()}
                </span>
              </div>
              <p style={{ color:sel?"#CBD5E1":"#64748B", fontSize:11, lineHeight:1.45, margin:0, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                {q.question}
              </p>
            </button>
          );
        })}
        {shown.length === 0 && (
          <div style={{ padding:"2rem 1rem", textAlign:"center", color:"#334155", fontSize:12 }}>
            No questions in this category.
          </div>
        )}
      </div>
    </aside>
  );
}
