import React from "react";
import { BarChart2, Sparkles, Loader, AlertTriangle, CheckCircle, Clock, Code, Shield, DollarSign, Scale, Building } from "lucide-react";
import { CATEGORY_CONFIG } from "../data/library";

const CAT_ICONS = { Technical:Code, Security:Shield, Pricing:DollarSign, Legal:Scale, Company:Building };

function Ring({ pct, size = 92, stroke = 9 }) {
  const r   = (size - stroke) / 2;
  const c   = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#6366F1" strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition:"stroke-dashoffset .7s ease" }}/>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:19, fill:"#1E293B" }}>
        {pct}%
      </text>
    </svg>
  );
}

function StatCard({ label, val, color }) {
  return (
    <div style={{ background:"#F8FAFC", borderRadius:9, padding:"10px 12px", border:"1px solid #F1F5F9" }}>
      <div style={{ fontSize:22, fontWeight:800, color, fontFamily:"'Syne',sans-serif", lineHeight:1 }}>{val}</div>
      <div style={{ fontSize:11, color:"#94A3B8", fontWeight:500, marginTop:3 }}>{label}</div>
    </div>
  );
}

export default function Dashboard({ questions, onGenerateAll, genAll, genAbort }) {
  const total    = questions.length;
  const accepted = questions.filter(q => q.status === "accepted" || q.status === "edited").length;
  const drafted  = questions.filter(q => q.draft).length;
  const gaps     = questions.filter(q => q.isGap).length;
  const pending  = questions.filter(q => !q.draft && q.status !== "generating" && q.status !== "accepted" && q.status !== "edited");
  const genCount = questions.filter(q => q.status === "generating").length;
  const pct      = total > 0 ? Math.round(accepted / total * 100) : 0;
  const effortLeft = questions.filter(q => q.status === "pending" || q.status === "error" || !q.draft)
    .reduce((a, q) => a + (q.estimatedMinutes || 10), 0);

  return (
    <aside style={{ width:290, background:"white", borderLeft:"1px solid #E2E8F0", height:"100vh", overflowY:"auto", display:"flex", flexDirection:"column", flexShrink:0 }}>

      {/* Header */}
      <div style={{ padding:"14px 14px 12px", borderBottom:"1px solid #F1F5F9" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
          <div style={{ width:30, height:30, borderRadius:9, background:"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <BarChart2 size={15} color="white"/>
          </div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:15, color:"#0F172A" }}>Dashboard</span>
        </div>

        {/* Ring */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:14 }}>
          <Ring pct={pct}/>
          <p style={{ color:"#64748B", fontSize:12, marginTop:6 }}>Overall completion</p>
        </div>

        {/* Stat cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
          <StatCard label="Questions"  val={total}    color="#6366F1"/>
          <StatCard label="Completed"  val={accepted} color="#10B981"/>
          <StatCard label="Drafted"    val={drafted}  color="#8B5CF6"/>
          <StatCard label="Gaps"       val={gaps}     color={gaps > 0 ? "#EF4444" : "#94A3B8"}/>
        </div>

        {/* Effort remaining */}
        {effortLeft > 0 && (
          <div style={{ marginTop:10, background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:8, padding:"8px 12px", display:"flex", alignItems:"center", gap:7 }}>
            <Clock size={13} color="#F59E0B"/>
            <span style={{ fontSize:12, color:"#92400E", fontWeight:600 }}>~{effortLeft} min remaining</span>
          </div>
        )}
      </div>

      {/* Generate all button */}
      {pending.length > 0 && (
        <div style={{ padding:"10px 14px", borderBottom:"1px solid #F1F5F9" }}>
          {genAll ? (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <Loader size={13} color="#6366F1" className="spin"/>
                <span style={{ fontSize:12, color:"#6366F1", fontWeight:600 }}>
                  Generating… ({genCount} in progress)
                </span>
              </div>
              <div style={{ height:4, background:"#EEF2FF", borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${Math.round((drafted/total)*100)}%`, background:"linear-gradient(90deg,#6366F1,#8B5CF6)", borderRadius:2, transition:"width .4s" }}/>
              </div>
              <button onClick={genAbort} style={{ marginTop:8, width:"100%", padding:"7px", background:"#FEF2F2", color:"#EF4444", border:"1px solid #FECACA", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>
                Stop Generation
              </button>
            </div>
          ) : (
            <button onClick={onGenerateAll} style={{ width:"100%", padding:"10px", background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"white", border:"none", borderRadius:10, fontSize:13, fontWeight:700, fontFamily:"'Syne',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:7, boxShadow:"0 4px 16px rgba(99,102,241,.28)", cursor:"pointer" }}>
              <Sparkles size={13}/> Generate {pending.length} Remaining Drafts
            </button>
          )}
        </div>
      )}

      {/* Category breakdown */}
      <div style={{ padding:"14px", borderBottom:"1px solid #F1F5F9" }}>
        <h4 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, color:"#0F172A", marginBottom:12 }}>Category Breakdown</h4>
        {["Technical","Security","Pricing","Legal","Company"].map(cat => {
          const cqs  = questions.filter(q => q.category === cat);
          if (!cqs.length) return null;
          const cdone = cqs.filter(q => q.status === "accepted" || q.status === "edited").length;
          const cp   = Math.round(cdone / cqs.length * 100);
          const cfg  = CATEGORY_CONFIG[cat];
          const Icon = CAT_ICONS[cat];
          return (
            <div key={cat} style={{ marginBottom:11 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <Icon size={11} color={cfg.color}/>
                  <span style={{ fontSize:12, color:"#475569", fontWeight:500 }}>{cat}</span>
                </div>
                <span style={{ fontSize:11, color:"#94A3B8" }}>{cdone}/{cqs.length}</span>
              </div>
              <div style={{ height:5, background:"#F1F5F9", borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${cp}%`, background:cfg.color, borderRadius:3, transition:"width .5s ease" }}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complexity distribution */}
      <div style={{ padding:"14px", borderBottom:"1px solid #F1F5F9" }}>
        <h4 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, color:"#0F172A", marginBottom:12 }}>Complexity Distribution</h4>
        {[["Low","#10B981"],["Medium","#F59E0B"],["High","#EF4444"]].map(([cx,col]) => {
          const n = questions.filter(q=>q.complexity===cx).length;
          const p = total>0?Math.round(n/total*100):0;
          return (
            <div key={cx} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
              <span style={{ fontSize:11, color:"#475569", width:48 }}>{cx}</span>
              <div style={{ flex:1, height:5, background:"#F1F5F9", borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${p}%`, background:col, borderRadius:3 }}/>
              </div>
              <span style={{ fontSize:11, color:"#94A3B8", width:24, textAlign:"right" }}>{n}</span>
            </div>
          );
        })}
      </div>

      {/* Knowledge gaps */}
      {gaps > 0 && (
        <div style={{ padding:"14px" }}>
          <h4 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, color:"#0F172A", marginBottom:10, display:"flex", alignItems:"center", gap:5 }}>
            <AlertTriangle size={12} color="#EF4444"/> Knowledge Gaps ({gaps})
          </h4>
          {questions.filter(q => q.isGap).map(q => (
            <div key={q.id} style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:9, padding:"9px 11px", marginBottom:7 }}>
              <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
                <span style={{ fontSize:10, fontWeight:700, color:"#EF4444" }}>{q.id}</span>
                <span style={{ fontSize:10, color:"#DC2626", background:"#FEE2E2", padding:"1px 6px", borderRadius:3, fontWeight:600 }}>{q.category}</span>
              </div>
              <p style={{ fontSize:11, color:"#7F1D1D", margin:0, lineHeight:1.45, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                {q.question}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* All done */}
      {gaps === 0 && accepted === total && total > 0 && (
        <div style={{ padding:"2rem", textAlign:"center" }}>
          <CheckCircle size={40} color="#10B981" style={{ margin:"0 auto 12px" }}/>
          <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, color:"#10B981", fontSize:15, marginBottom:4 }}>RFP Complete!</p>
          <p style={{ color:"#94A3B8", fontSize:12, lineHeight:1.6 }}>All {total} questions answered with zero knowledge gaps.</p>
        </div>
      )}
    </aside>
  );
}
