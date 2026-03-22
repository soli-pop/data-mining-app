import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── Responsive ───────────────────────────────────────────────────────────────
const useWide = () => {
  const [wide, setWide] = useState(() => window.innerWidth >= 768);
  useEffect(() => {
    const h = () => setWide(window.innerWidth >= 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return wide;
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor", style: sx = {} }) => {
  const P = {
    menu:    <><line x1="3" y1="6"  x2="21" y2="6"  stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    user:    <><circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" fill="none"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/></>,
    search:  <><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    chart:   <><rect x="3" y="12" width="4" height="9" rx="1" fill={color}/><rect x="10" y="7" width="4" height="14" rx="1" fill={color}/><rect x="17" y="3" width="4" height="18" rx="1" fill={color}/></>,
    pie:     <><path d="M12 2a10 10 0 1 0 10 10H12V2z" stroke={color} strokeWidth="2" fill="none"/><path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="2" fill="none"/></>,
    edit:    <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    trash:   <><polyline points="3 6 5 6 21 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6l-1 14H6L5 6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6M14 11v6" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M9 6V4h6v2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    close:   <><line x1="18" y1="6"  x2="6"  y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="6"  y1="6"  x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    plus:    <><line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    chevron: <polyline points="6 9 12 15 18 9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    logout:  <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="16 17 21 12 16 7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    globe:   <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth="2" fill="none"/></>,
    tag:     <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke={color} strokeWidth="2" fill="none"/><line x1="7" y1="7" x2="7.01" y2="7" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></>,
    records: <><rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" fill="none"/><line x1="3" y1="9" x2="21" y2="9" stroke={color} strokeWidth="2"/><line x1="9" y1="21" x2="9" y2="9" stroke={color} strokeWidth="2"/></>,
    money:   <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none"/><path d="M12 6v2m0 8v2M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-5 2.5-5 5a2.5 2.5 0 0 0 5 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/></>,
    map:     <><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="9" y1="3" x2="9" y2="18" stroke={color} strokeWidth="2"/><line x1="15" y1="6" x2="15" y2="21" stroke={color} strokeWidth="2"/></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={color} strokeWidth="2" fill="none"/><line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></>,
    swipe:   <><line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/><polyline points="12 5 19 12 12 19" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    check:   <polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    lock:    <><rect x="5" y="11" width="14" height="11" rx="2" stroke={color} strokeWidth="2" fill="none"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/></>,
    mail:    <><rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2" fill="none"/><polyline points="2 4 12 13 22 4" stroke={color} strokeWidth="2" fill="none"/></>,
    dash:    <><rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none"/><rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none"/><rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none"/><rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none"/></>,
    bell:    <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display:"block", flexShrink:0, ...sx }}>
      {P[name]}
    </svg>
  );
};

// ─── Identifiers ──────────────────────────────────────────────────────────────
const getAgeLabel    = a => { const n=parseInt(a); if(isNaN(n)) return "—"; if(n<=17) return "Young"; if(n<=35) return "Adult"; if(n<=59) return "Senior"; return "Elder"; };
const getIncomeLabel = v => { const n=parseFloat(String(v).replace(/[^0-9.]/g,"")); if(isNaN(n)) return "—"; if(n<10000) return "Low"; if(n<50000) return "Mid"; return "High"; };
const getSpendLabel  = v => { const n=parseFloat(String(v).replace(/[^0-9.]/g,"")); if(isNaN(n)) return "—"; if(n<5000) return "Low"; if(n<20000) return "Mid"; return "High"; };
const PMAP = { Cellphone:"Technology",Laptop:"Technology",Tablet:"Technology",TV:"Electronics",Headphones:"Electronics",Camera:"Electronics",Shoes:"Fashion",Bag:"Fashion",Watch:"Fashion",Rice:"Food",Groceries:"Food",Coffee:"Food",Book:"Education",Course:"Education" };
const getCat    = p => { for(const [k,v] of Object.entries(PMAP)) if(p?.toLowerCase().includes(k.toLowerCase())) return v; return "General"; };
const RMAP = { USA:"International",UK:"International",Japan:"International",Australia:"International",Canada:"International",Germany:"International",France:"International",Singapore:"International",Philippines:"Local",India:"International" };
const getRegion = c => RMAP[c]||(c?"International":"—");
const fmtM      = n => "₱"+Number(n||0).toLocaleString();

// ─── Currency (local display + PHP conversion) ────────────────────────────────
const CURRENCY = {
  Philippines: { symbol:"₱",  code:"PHP", rate:1      },
  USA:         { symbol:"$",  code:"USD", rate:56.50  },
  UK:          { symbol:"£",  code:"GBP", rate:71.20  },
  Japan:       { symbol:"¥",  code:"JPY", rate:0.37   },
  Australia:   { symbol:"A$", code:"AUD", rate:36.80  },
  Canada:      { symbol:"C$", code:"CAD", rate:41.50  },
  Germany:     { symbol:"€",  code:"EUR", rate:60.40  },
  France:      { symbol:"€",  code:"EUR", rate:60.40  },
  Singapore:   { symbol:"S$", code:"SGD", rate:41.80  },
  India:       { symbol:"₹",  code:"INR", rate:0.67   },
};
const getCurrency = c => CURRENCY[c] || CURRENCY["Philippines"];
const fmtLocal = (n, country) => {
  const { symbol, code } = getCurrency(country);
  return symbol + Number(n||0).toLocaleString();
};
const toPhp = (n, country) => Number(n||0) * getCurrency(country).rate;

const AGE_C = { Young:"#ef4444",Adult:"#3b82f6",Senior:"#f59e0b",Elder:"#8b5cf6" };
const INC_C = { High:"#16a34a",Mid:"#d97706",Low:"#dc2626" };
const SPN_C = { High:"#0891b2",Mid:"#7c3aed",Low:"#64748b" };
const CAT_C = { Technology:"#4f46e5",Electronics:"#0891b2",Fashion:"#db2777",Food:"#15803d",Education:"#b45309",General:"#6b7280" };
const REG_C = { International:"#2563eb",Local:"#059669" };

// ─── Storage ──────────────────────────────────────────────────────────────────
const SAMPLE = [
  {id:1,name:"John Doe",    age:"23",income:"25000",purchase:"Cellphone",spend:"20000",country:"USA"},
  {id:2,name:"Jane Smith",  age:"42",income:"80000",purchase:"Laptop",   spend:"20000",country:"Philippines"},
  {id:3,name:"Alice Brown", age:"16",income:"15000",purchase:"Shoes",    spend:"5000", country:"Japan"},
  {id:4,name:"Carlos Reyes",age:"30",income:"9000", purchase:"Coffee",   spend:"3000", country:"Philippines"},
  {id:5,name:"Kim Tanaka",  age:"55",income:"120000",purchase:"Camera",  spend:"45000",country:"Japan"},
];
const UK="dmdb_users", DK="dmdb_data";
const getUsers = () => { try { return JSON.parse(localStorage.getItem(UK)||"[]"); } catch { return []; }};
const saveUsers = u => localStorage.setItem(UK,JSON.stringify(u));
const getData   = () => { try { return JSON.parse(localStorage.getItem(DK))||SAMPLE; } catch { return SAMPLE; }};
const saveData  = d => localStorage.setItem(DK,JSON.stringify(d));

// ─── Toast System ─────────────────────────────────────────────────────────────
const TOAST_ICONS = { ok:"check", err:"warning", del:"trash", info:"bell", logout:"logout" };
const TOAST_COLORS = { ok:"#16a34a", err:"#dc2626", del:"#dc2626", info:"#3b82f6", logout:"#f59e0b" };

const ToastStack = ({ toasts }) => (
  <div style={{ position:"fixed", top:18, right:18, zIndex:500, display:"flex", flexDirection:"column", gap:8, pointerEvents:"none" }}>
    <style>{`
      @keyframes toastIn  { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
      @keyframes toastOut { from{opacity:1;transform:translateX(0)}    to{opacity:0;transform:translateX(40px)} }
    `}</style>
    {toasts.map(t => (
      <div key={t.id} style={{
        background:"#1e293b", color:"#fff", padding:"11px 16px", borderRadius:12,
        fontWeight:600, fontSize:"0.84rem", boxShadow:"0 4px 20px rgba(0,0,0,0.25)",
        display:"flex", alignItems:"center", gap:9, whiteSpace:"nowrap", minWidth:220,
        borderLeft:`4px solid ${TOAST_COLORS[t.type]||"#3b82f6"}`,
        animation: t.leaving ? "toastOut .3s ease forwards" : "toastIn .3s ease",
      }}>
        <Icon name={TOAST_ICONS[t.type]||"bell"} size={15} color={TOAST_COLORS[t.type]||"#3b82f6"}/>
        {t.msg}
      </div>
    ))}
  </div>
);

const useToasts = () => {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, type="ok") => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, msg, type, leaving:false }]);
    setTimeout(() => setToasts(p => p.map(t => t.id===id ? {...t, leaving:true} : t)), 2400);
    setTimeout(() => setToasts(p => p.filter(t => t.id!==id)), 2700);
  }, []);
  return { toasts, push };
};

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ label, color, size }) => (
  <span style={{
    background: color+"18", color,
    border: "1px solid "+color+"35",
    fontSize: size==="xs" ? "0.56rem" : "0.6rem",
    fontWeight: 700,
    padding: size==="xs" ? "1px 6px" : "2px 8px",
    borderRadius: 20,
    whiteSpace: "nowrap",
    display: "inline-block",
    letterSpacing: "0.02em",
  }}>
    {label}
  </span>
);

// ─── Form Fields ──────────────────────────────────────────────────────────────
const Field = ({ label, icon, value, onChange, type="text", placeholder }) => (
  <div style={{ marginBottom:14 }}>
    {label && <div style={{ fontSize:"0.73rem", fontWeight:700, color:"#475569", marginBottom:5, display:"flex", alignItems:"center", gap:5 }}>{icon && <Icon name={icon} size={13} color="#64748b"/>}{label}</div>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{ width:"100%", padding:"11px 13px", borderRadius:10, border:"1.5px solid #e2e8f0", background:"#f8fafc", fontFamily:"inherit", fontSize:"0.88rem", color:"#1e293b", outline:"none", boxSizing:"border-box", transition:"border-color .2s" }}
      onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
  </div>
);

const Sel = ({ label, icon, value, onChange, opts }) => (
  <div style={{ marginBottom:14 }}>
    {label && <div style={{ fontSize:"0.73rem", fontWeight:700, color:"#475569", marginBottom:5, display:"flex", alignItems:"center", gap:5 }}>{icon && <Icon name={icon} size={13} color="#64748b"/>}{label}</div>}
    <div style={{ position:"relative" }}>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{ width:"100%", padding:"11px 36px 11px 13px", borderRadius:10, border:"1.5px solid #e2e8f0", background:"#f8fafc", fontFamily:"inherit", fontSize:"0.88rem", color:"#1e293b", outline:"none", boxSizing:"border-box", appearance:"none", transition:"border-color .2s" }}
        onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
      <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><Icon name="chevron" size={14} color="#94a3b8"/></span>
    </div>
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ open, title, onClose, children, center, width=520 }) => {
  if (!open) return null;
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:center?"center":"flex-end", justifyContent:"center", background:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)", padding:center?"24px":0 }}>
      <div style={{ width:"100%", maxWidth:width, background:"#fff", borderRadius:center?"16px":"22px 22px 0 0", padding:"22px 20px", maxHeight:"90vh", overflowY:"auto", animation:center?"popIn .22s cubic-bezier(.34,1.56,.64,1)":"slideUp .25s cubic-bezier(.34,1.56,.64,1)" }}>
        <style>{`
          @keyframes slideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
          @keyframes popIn   { from{transform:scale(.88);opacity:0}        to{transform:scale(1);opacity:1} }
        `}</style>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontWeight:800, fontSize:"1rem", color:"#0f172a" }}>{title}</div>
          <button onClick={onClose} style={{ background:"#f1f5f9", border:"none", borderRadius:8, width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="close" size={15} color="#64748b"/></button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── Filter Pill ──────────────────────────────────────────────────────────────
const FilterPill = ({ label, iconName, opts, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [pos,  setPos]  = useState({ top:0, left:0 });
  const btnRef  = useRef();
  const dropRef = useRef();

  useEffect(() => {
    if (!open) return;
    const h = e => {
      const inBtn  = btnRef.current  && btnRef.current.contains(e.target);
      const inDrop = dropRef.current && dropRef.current.contains(e.target);
      if (!inBtn && !inDrop) setOpen(false);
    };
    document.addEventListener("pointerup", h);
    return () => document.removeEventListener("pointerup", h);
  }, [open]);

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top:r.bottom+6, left:r.left });
    }
    setOpen(o=>!o);
  };

  const select = o => { onChange(o); setOpen(false); };
  const active = value !== "All";

  return (
    <div style={{ position:"relative", flexShrink:0 }}>
      <button ref={btnRef} onClick={toggle} style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 13px", borderRadius:20, border:"1.5px solid "+(active?"#3b82f6":"#e2e8f0"), background:active?"#eff6ff":"#fff", color:active?"#3b82f6":"#64748b", fontSize:"0.73rem", fontWeight:700, fontFamily:"inherit", cursor:"pointer", whiteSpace:"nowrap", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", transition:"all .15s" }}>
        <Icon name={iconName} size={13} color={active?"#3b82f6":"#94a3b8"}/>{active?value:label}<Icon name="chevron" size={11} color={active?"#3b82f6":"#94a3b8"}/>
      </button>
      {open && (
        <div ref={dropRef} style={{ position:"fixed", top:pos.top, left:pos.left, zIndex:999, background:"#fff", borderRadius:12, minWidth:155, boxShadow:"0 8px 28px rgba(0,0,0,0.16)", border:"1px solid #f1f5f9", overflow:"hidden", animation:"dropIn .15s ease" }}>
          <style>{`@keyframes dropIn{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}`}</style>
          {["All",...opts].map(o => (
            <div key={o} onPointerDown={e=>{ e.stopPropagation(); select(o); }}
              style={{ padding:"12px 16px", fontSize:"0.82rem", fontWeight:600, color:value===o?"#3b82f6":"#374151", background:value===o?"#eff6ff":"transparent", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
              {o}{value===o && <Icon name="check" size={13} color="#3b82f6"/>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Logout Confirm Modal ─────────────────────────────────────────────────────
const LogoutModal = ({ open, onConfirm, onCancel, user }) => (
  <Modal open={open} title="Sign Out" onClose={onCancel} center width={340}>
    <div style={{ textAlign:"center", padding:"4px 0 12px" }}>
      <div style={{ width:54, height:54, borderRadius:15, background:"#fff7ed", border:"1.5px solid #fed7aa", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
        <Icon name="logout" size={26} color="#f59e0b"/>
      </div>
      <div style={{ fontWeight:700, fontSize:"0.95rem", color:"#0f172a", marginBottom:6 }}>
        Sign out of <span style={{ color:"#3b82f6" }}>{user?.name}</span>?
      </div>
      <div style={{ fontSize:"0.78rem", color:"#64748b", lineHeight:1.6, marginBottom:22 }}>
        You'll need to log back in to access your data.
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <button onClick={onCancel} style={{ flex:1, padding:"11px", borderRadius:10, border:"1.5px solid #e2e8f0", background:"#fff", color:"#374151", fontWeight:700, fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit" }}>
          Stay
        </button>
        <button onClick={onConfirm} style={{ flex:1, padding:"11px", borderRadius:10, border:"none", background:"#f59e0b", color:"#fff", fontWeight:700, fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 3px 10px rgba(245,158,11,0.4)" }}>
          Sign Out
        </button>
      </div>
    </div>
  </Modal>
);

// ─── Delete Dialog ────────────────────────────────────────────────────────────
const DeleteDialog = ({ row, onConfirm, onCancel }) => (
  <div style={{ padding:"4px 0 8px" }}>
    <div style={{ textAlign:"center", marginBottom:20 }}>
      <div style={{ width:52, height:52, borderRadius:14, background:"#fff1f2", border:"1.5px solid #fecaca", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
        <Icon name="trash" size={24} color="#dc2626"/>
      </div>
      <div style={{ fontWeight:700, fontSize:"0.95rem", color:"#0f172a", marginBottom:6 }}>
        Delete <span style={{ color:"#dc2626" }}>{row?.name}</span>?
      </div>
      <div style={{ fontSize:"0.78rem", color:"#64748b", lineHeight:1.6 }}>
        {getAgeLabel(row?.age)} · {getCat(row?.purchase)} · {getRegion(row?.country)}
      </div>
    </div>
    <div style={{ display:"flex", gap:10 }}>
      <button onClick={onCancel} style={{ flex:1, padding:"11px", borderRadius:10, border:"1.5px solid #e2e8f0", background:"#fff", color:"#374151", fontWeight:700, fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit" }}>
        Cancel
      </button>
      <button onClick={onConfirm} style={{ flex:1, padding:"11px", borderRadius:10, border:"none", background:"#dc2626", color:"#fff", fontWeight:700, fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 3px 10px rgba(220,38,38,0.35)" }}>
        Delete
      </button>
    </div>
  </div>
);

// ─── Swipe Row ────────────────────────────────────────────────────────────────
const SWIPE_TRIGGER = 75;

const SwipeRow = ({ row, isLast, isGuest, onEdit, onDelete, expanded, onToggle }) => {
  const outerRef = useRef(null);
  const slideRef = useRef(null);
  const bgRef    = useRef(null);
  const iconWrap = useRef(null);
  const drag = useRef({ active:false, fired:false, startX:0, startY:0, curX:0, axis:null });

  const ageL=getAgeLabel(row.age), incL=getIncomeLabel(row.income), catL=getCat(row.purchase), cntL=getRegion(row.country), spnL=getSpendLabel(row.spend);

  const domSet = x => {
    if (slideRef.current) slideRef.current.style.transform=`translateX(${x}px)`;
    const p = Math.min(Math.max(x,0)/SWIPE_TRIGGER,1);
    if (bgRef.current) bgRef.current.style.opacity=String(Math.min(p*1.3,1));
    if (iconWrap.current){ iconWrap.current.style.opacity=String(p); iconWrap.current.style.transform=`scale(${0.4+p*0.6})`; }
  };
  const snapBack = () => {
    if (slideRef.current){ slideRef.current.style.transition="transform 200ms ease"; slideRef.current.style.transform="translateX(0px)"; }
    if (bgRef.current) bgRef.current.style.opacity="0";
    if (iconWrap.current) iconWrap.current.style.opacity="0";
    drag.current={...drag.current,active:false,curX:0,axis:null};
  };
  const flyAndDelete = useCallback(()=>{
    if (drag.current.fired) return;
    drag.current.fired=true; drag.current.active=false;

    // Slide row off-screen
    if (slideRef.current){ slideRef.current.style.transition="transform 220ms cubic-bezier(0.4,0,0.8,1)"; slideRef.current.style.transform="translateX(520px)"; }
    if (bgRef.current) bgRef.current.style.opacity="1";

    // Collapse height
    setTimeout(()=>{
      if (!outerRef.current) return;
      const h=outerRef.current.offsetHeight;
      outerRef.current.style.overflow="hidden";
      outerRef.current.style.maxHeight=h+"px";
      outerRef.current.getBoundingClientRect();
      outerRef.current.style.transition="max-height 200ms ease,opacity 180ms ease";
      outerRef.current.style.maxHeight="0px";
      outerRef.current.style.opacity="0";
    },220);

    // After animation, open confirm dialog — pass a restore fn in case user cancels
    setTimeout(()=>{
      const restore = () => {
        drag.current.fired = false;
        // Restore outer wrapper
        if (outerRef.current){
          outerRef.current.style.transition="max-height 250ms ease,opacity 200ms ease";
          outerRef.current.style.maxHeight="400px";
          outerRef.current.style.opacity="1";
          setTimeout(()=>{ if(outerRef.current) outerRef.current.style.overflow="visible"; },260);
        }
        // Slide row back in
        if (slideRef.current){
          slideRef.current.style.transition="transform 250ms cubic-bezier(0.34,1.56,0.64,1)";
          slideRef.current.style.transform="translateX(0px)";
        }
        // Hide red bg
        if (bgRef.current) bgRef.current.style.opacity="0";
        if (iconWrap.current) iconWrap.current.style.opacity="0";
      };
      onDelete(row, restore);
    },440);
  },[row,onDelete]);

  useEffect(()=>{
    const el=slideRef.current; if (!el) return;
    const onStart=e=>{
      if (drag.current.fired) return;
      const t=e.touches[0];
      drag.current={...drag.current,active:true,startX:t.clientX,startY:t.clientY,curX:0,axis:null};
      el.style.transition="none";
    };
    const onMove=e=>{
      if (!drag.current.active||drag.current.fired) return;
      const t=e.touches[0],dx=t.clientX-drag.current.startX,dy=t.clientY-drag.current.startY;
      if (drag.current.axis===null){ if(Math.abs(dx)<5&&Math.abs(dy)<5) return; drag.current.axis=Math.abs(dx)>=Math.abs(dy)?"h":"v"; }
      if (drag.current.axis!=="h") return;
      e.preventDefault();
      const c=Math.max(0,Math.min(dx,400)); drag.current.curX=c; domSet(c);
    };
    const onEnd=()=>{
      if (!drag.current.active||drag.current.fired) return;
      if (drag.current.curX>=SWIPE_TRIGGER&&!isGuest) flyAndDelete(); else snapBack();
    };
    el.addEventListener("touchstart",onStart,{passive:true});
    el.addEventListener("touchmove", onMove, {passive:false});
    el.addEventListener("touchend",  onEnd,  {passive:true});
    el.addEventListener("touchcancel",onEnd, {passive:true});
    return ()=>{ el.removeEventListener("touchstart",onStart); el.removeEventListener("touchmove",onMove); el.removeEventListener("touchend",onEnd); el.removeEventListener("touchcancel",onEnd); };
  },[isGuest,flyAndDelete]);

  return (
    <div ref={outerRef} style={{ position:"relative", overflow:"hidden", borderBottom: isLast ? "none" : "1px solid #d1d9e6" }}>

      {/* Swipe bg */}
      <div ref={bgRef} style={{ position:"absolute", inset:0, background:"#dc2626", display:"flex", alignItems:"center", paddingLeft:22, opacity:0, pointerEvents:"none" }}>
        <div ref={iconWrap} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, opacity:0, transform:"scale(0.4)" }}>
          <Icon name="trash" size={24} color="#fff"/>
          <span style={{ fontSize:"0.55rem", fontWeight:800, color:"#fff", letterSpacing:"0.08em" }}>DELETE</span>
        </div>
      </div>

      <div ref={slideRef} style={{ background:"#fff", willChange:"transform", touchAction:"pan-y" }}>

        {/* ── Collapsed row ── */}
        <div
          onClick={() => onToggle(expanded ? null : row.id)}
          style={{ display:"grid", gridTemplateColumns:"minmax(0,2fr) minmax(0,1.5fr) minmax(0,1.2fr) 22px", padding:"12px 14px", alignItems:"center", cursor:"pointer", userSelect:"none", gap:8 }}
        >
          {/* Name + badges */}
          <div style={{ minWidth:0 }}>
            <div style={{ fontWeight:700, fontSize:"0.88rem", color:"#0f172a", marginBottom:5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{row.name||"—"}</div>
            <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
              <Badge label={catL} color={CAT_C[catL]||"#6366f1"} size="xs"/>
              <Badge label={cntL} color={REG_C[cntL]||"#3b82f6"} size="xs"/>
            </div>
          </div>

          {/* Age + income badge */}
          <div>
            <div style={{ fontWeight:700, fontSize:"0.82rem", color:AGE_C[ageL]||"#1e293b", marginBottom:4 }}>
              {row.age} <span style={{ fontWeight:500, fontSize:"0.7rem" }}>({ageL})</span>
            </div>
            <Badge label={incL+" Income"} color={INC_C[incL]||"#64748b"} size="xs"/>
          </div>

          {/* Spend + spend badge + country */}
          <div>
            <div style={{ fontWeight:700, fontSize:"0.82rem", color:"#0f172a", marginBottom:4 }}>{fmtLocal(row.spend, row.country)}</div>
            <Badge label={spnL+" Spend"} color={SPN_C[spnL]||"#64748b"} size="xs"/>
            <div style={{ fontSize:"0.65rem", color:"#64748b", fontWeight:600, marginTop:4 }}>{row.country}</div>
          </div>

          {/* Chevron */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .25s", transform:expanded?"rotate(180deg)":"rotate(0deg)" }}>
            <Icon name="chevron" size={15} color="#94a3b8"/>
          </div>
        </div>

        {/* ── Expanded panel ── */}
        <div style={{ overflow:"hidden", maxHeight:expanded?"500px":"0", transition:"max-height .35s cubic-bezier(0.4,0,0.2,1)" }}>
          <div style={{ borderTop:"1.5px solid #e8edf5", padding:"12px 14px 14px", background:"#f8fafc" }}>

            {/* Identifier grid */}
            <div style={{ fontSize:"0.58rem", fontWeight:800, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8, display:"flex", alignItems:"center", gap:4 }}>
              <Icon name="tag" size={10} color="#94a3b8"/> Identifiers
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:10 }}>
              {[
                { lbl:"Age",              raw:`${row.age} yrs`,          badge:ageL,           color:AGE_C[ageL]||"#6366f1" },
                { lbl:"Income",           raw:fmtLocal(row.income, row.country), badge:incL+" Income", color:INC_C[incL]||"#64748b" },
                { lbl:"Purchase",         raw:row.purchase,              badge:catL,           color:CAT_C[catL]||"#6366f1" },
                { lbl:"Amt. Spent",       raw:fmtLocal(row.spend, row.country),  badge:spnL+" Spend",  color:SPN_C[spnL]||"#64748b" },
                { lbl:"Country",          raw:row.country,               badge:cntL,           color:REG_C[cntL]||"#3b82f6" },
              ].map(({ lbl, raw, badge, color }) => (
                <div key={lbl} style={{ background:"#fff", borderRadius:9, padding:"8px 10px", border:"1px solid #eef0f5", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize:"0.55rem", fontWeight:800, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{lbl}</div>
                  <div style={{ fontSize:"0.8rem", fontWeight:700, color:"#1e293b", marginBottom:4, lineHeight:1.2 }}>{raw}</div>
                  <Badge label={badge} color={color} size="xs"/>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={e=>{e.stopPropagation();onToggle(null);onEdit(row);}}
                style={{ flex:1, padding:"10px", borderRadius:10, border:"1.5px solid #bfdbfe", background:"#eff6ff", color:"#1d4ed8", fontWeight:700, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                <Icon name="edit" size={13} color="#1d4ed8"/> Edit
              </button>
              {!isGuest && (
                <button onClick={e=>{e.stopPropagation();onToggle(null);onDelete(row);}}
                  style={{ flex:1, padding:"10px", borderRadius:10, border:"1.5px solid #fecaca", background:"#fff7f7", color:"#dc2626", fontWeight:700, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                  <Icon name="trash" size={13} color="#dc2626"/> Delete
                </button>
              )}
              <button onClick={e=>{e.stopPropagation();onToggle(null);}}
                style={{ width:40, borderRadius:10, border:"1.5px solid #e2e8f0", background:"#fff", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name="close" size={13} color="#94a3b8"/>
              </button>
            </div>

            {!isGuest && (
              <div style={{ marginTop:8, display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
                <Icon name="swipe" size={11} color="#cbd5e1"/>
                <span style={{ fontSize:"0.6rem", color:"#cbd5e1", fontWeight:600 }}>Swipe right to quick-delete</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Desktop Table Row ────────────────────────────────────────────────────────
const TableCell = ({ value, badge, badgeColor, valueColor, muted }) => (
  <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:5, minWidth:0 }}>
    <div style={{
      fontWeight: muted ? 500 : 700,
      fontSize:"0.88rem",
      color: valueColor || (muted ? "#64748b" : "#0f172a"),
      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
      lineHeight:1.2,
    }}>{value}</div>
    {badge && (
      <Badge label={badge} color={badgeColor}/>
    )}
  </div>
);

const DesktopRow = ({ row, isLast, isGuest, onEdit, onDelete, idx }) => {
  const ageL = getAgeLabel(row.age);
  const incL = getIncomeLabel(row.income);
  const catL = getCat(row.purchase);
  const cntL = getRegion(row.country);
  const spnL = getSpendLabel(row.spend);
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"grid",
        gridTemplateColumns:"minmax(0,2fr) 90px 140px 130px 140px 140px 120px",
        alignItems:"center",
        padding:"16px 20px",
        borderBottom: isLast ? "none" : "1px solid #d1d9e6",
        background: hov ? "#f5f8ff" : "#fff",
        transition:"background .15s",
        animation:`rowIn .2s ease ${idx*0.04}s both`,
        minHeight:72,
        gap:12,
      }}
    >
      {/* Name — bold, no badge clutter */}
      <div style={{ minWidth:0 }}>
        <div style={{ fontWeight:700, fontSize:"0.92rem", color:"#0f172a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginBottom:5 }}>
          {row.name || "—"}
        </div>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          <Badge label={catL} color={CAT_C[catL]||"#6366f1"}/>
          <Badge label={cntL} color={REG_C[cntL]||"#3b82f6"}/>
        </div>
      </div>

      {/* Age */}
      <TableCell
        value={row.age}
        badge={ageL}
        badgeColor={AGE_C[ageL]||"#6366f1"}
        valueColor={AGE_C[ageL]||"#0f172a"}
      />

      {/* Income */}
      <TableCell
        value={fmtLocal(row.income, row.country)}
        badge={incL+" Income"}
        badgeColor={INC_C[incL]||"#64748b"}
        valueColor={INC_C[incL]||"#334155"}
      />

      {/* Purchase */}
      <TableCell
        value={row.purchase}
        badge={catL}
        badgeColor={CAT_C[catL]||"#6366f1"}
        muted
      />

      {/* Amt. Spent */}
      <TableCell
        value={fmtLocal(row.spend, row.country)}
        badge={spnL+" Spend"}
        badgeColor={SPN_C[spnL]||"#64748b"}
        valueColor={SPN_C[spnL]||"#334155"}
      />

      {/* Country */}
      <TableCell
        value={row.country}
        badge={cntL}
        badgeColor={REG_C[cntL]||"#3b82f6"}
        muted
      />

      {/* Actions */}
      <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
        <button
          onClick={() => onEdit(row)}
          style={{ display:"flex", alignItems:"center", gap:4, padding:"7px 12px", borderRadius:8, border:"1.5px solid #bfdbfe", background:"#eff6ff", color:"#1d4ed8", fontWeight:600, fontSize:"0.76rem", cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", transition:"all .12s" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="#dbeafe"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="#eff6ff"; }}
        >
          <Icon name="edit" size={12} color="#1d4ed8"/> Edit
        </button>
        {!isGuest && (
          <button
            onClick={() => onDelete(row)}
            style={{ display:"flex", alignItems:"center", gap:4, padding:"7px 12px", borderRadius:8, border:"1.5px solid #fecaca", background:"#fff7f7", color:"#dc2626", fontWeight:600, fontSize:"0.76rem", cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", transition:"all .12s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background="#fee2e2"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="#fff7f7"; }}
          >
            <Icon name="trash" size={12} color="#dc2626"/> Del
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Record Form ──────────────────────────────────────────────────────────────
const COUNTRIES = ["USA","Philippines","Japan","UK","Australia","Canada","Germany","France","Singapore","India"];
const PRODUCTS  = ["Cellphone","Laptop","Tablet","TV","Headphones","Camera","Shoes","Bag","Watch","Rice","Groceries","Coffee","Book","Course"];

const RecordForm = ({ initial, onSave, onCancel }) => {
  const [f,setF] = useState(initial||{name:"",age:"",income:"",purchase:"Cellphone",spend:"",country:"Philippines"});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  const ageL=getAgeLabel(f.age), incL=getIncomeLabel(f.income), catL=getCat(f.purchase), cntL=getRegion(f.country);
  const curr = getCurrency(f.country);
  return (
    <>
      <div style={{ background:"#f8fafc", borderRadius:10, padding:"10px 12px", marginBottom:16, border:"1px solid #f0f4f8" }}>
        <div style={{ fontSize:"0.62rem", fontWeight:800, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:7 }}>Live Identifiers</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {f.age     && <Badge label={ageL}           color={AGE_C[ageL]||"#6366f1"}/>}
          {f.income  && <Badge label={incL+" Income"} color={INC_C[incL]||"#64748b"}/>}
          {f.purchase && <Badge label={catL}          color={CAT_C[catL]||"#6366f1"}/>}
          {f.country  && <Badge label={cntL}          color={REG_C[cntL]||"#3b82f6"}/>}
          {!f.age&&!f.income && <span style={{ fontSize:"0.72rem", color:"#cbd5e1" }}>Fill fields to preview identifiers…</span>}
        </div>
        {f.country && f.country !== "Philippines" && (
          <div style={{ marginTop:8, display:"flex", alignItems:"center", gap:6, padding:"6px 10px", background:"#fffbeb", border:"1px solid #fde68a", borderRadius:8 }}>
            <span style={{ fontSize:"1rem" }}>💱</span>
            <span style={{ fontSize:"0.7rem", color:"#92400e", fontWeight:600 }}>
              Values in <strong>{curr.code}</strong> ({curr.symbol}) · 1 {curr.code} = ₱{curr.rate.toLocaleString()}
            </span>
          </div>
        )}
      </div>
      <Field label="Full Name"  icon="user"  value={f.name}    onChange={v=>s("name",v)}    placeholder="e.g. John Doe"/>
      <Field label="Age"        icon="tag"   value={f.age}     onChange={v=>s("age",v)}     type="number" placeholder="e.g. 23"/>
      <Sel   label="Country"    icon="globe" value={f.country}  onChange={v=>s("country",v)} opts={COUNTRIES}/>
      <Field label={`Income (${curr.symbol})`} icon="money" value={f.income} onChange={v=>s("income",v)} type="number" placeholder={`e.g. ${curr.code==="USD"?"450":curr.code==="JPY"?"25000":curr.code==="INR"?"20000":"25000"}`}/>
      <Sel   label="Purchase"   icon="tag"   value={f.purchase} onChange={v=>s("purchase",v)} opts={PRODUCTS}/>
      <Field label={`Amt. Spent (${curr.symbol})`} icon="money" value={f.spend} onChange={v=>s("spend",v)} type="number" placeholder={`e.g. ${curr.code==="USD"?"350":curr.code==="JPY"?"10000":curr.code==="INR"?"8000":"5000"}`}/>
      <div style={{ display:"flex", gap:10, marginTop:4 }}>
        <button onClick={()=>{if(!f.name||!f.age)return;onSave(f);}} style={{ flex:1, padding:"12px", borderRadius:10, border:"none", background:"#3b82f6", color:"#fff", fontWeight:700, fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 3px 12px rgba(59,130,246,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          <Icon name="check" size={15} color="#fff"/> Save Record
        </button>
        <button onClick={onCancel} style={{ flex:1, padding:"12px", borderRadius:10, border:"1.5px solid #e2e8f0", background:"#fff", color:"#64748b", fontWeight:700, fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
      </div>
    </>
  );
};

// ─── Charts ───────────────────────────────────────────────────────────────────
const Charts = ({ data }) => {
  const byAge = useMemo(()=>{ const m={}; data.forEach(r=>{const k=getAgeLabel(r.age);if(!m[k])m[k]={t:0,c:0};m[k].t+=Number(r.spend||0);m[k].c++;}); return Object.entries(m).map(([name,v])=>({name,avg:Math.round(v.t/v.c)})); },[data]);
  const incD  = useMemo(()=>{ const m={High:0,Mid:0,Low:0}; data.forEach(r=>{const k=getIncomeLabel(r.income);if(m[k]!==undefined)m[k]++;}); const tot=data.length||1; return Object.entries(m).map(([name,v])=>({name:name+" Income",value:Math.round(v/tot*100)})); },[data]);
  const C = ["#16a34a","#d97706","#dc2626"];
  const Tip = ({active,payload}) => active&&payload?.[0] ? (
    <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:9, padding:"8px 12px", fontSize:"0.78rem", fontWeight:700, boxShadow:"0 4px 14px rgba(0,0,0,0.1)" }}>
      <div style={{ color:"#64748b", marginBottom:2 }}>{payload[0].payload?.name}</div>
      <div style={{ color:"#0f172a" }}>{payload[0].dataKey==="avg"?fmtM(payload[0].value):payload[0].value+"%"}</div>
    </div>
  ) : null;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:14 }}><Icon name="chart" size={16} color="#3b82f6"/><span style={{ fontWeight:800, fontSize:"0.92rem", color:"#0f172a" }}>Avg Spend by Age Group</span></div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={byAge} barCategoryGap="35%">
            <XAxis dataKey="name" tick={{fontSize:11,fontFamily:"inherit",fill:"#64748b",fontWeight:600}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:10,fontFamily:"inherit",fill:"#94a3b8"}} axisLine={false} tickLine={false} tickFormatter={v=>"₱"+(v>=1000?(v/1000).toFixed(0)+"k":v)}/>
            <Tooltip content={<Tip/>} cursor={{fill:"#f8fafc"}}/>
            <Bar dataKey="avg" radius={[6,6,0,0]}>{byAge.map((e,i)=><Cell key={i} fill={AGE_C[e.name]||"#3b82f6"}/>)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}><Icon name="user" size={14} color="#3b82f6"/><span style={{ fontWeight:800, fontSize:"0.84rem", color:"#0f172a" }}>By Income Level</span></div>
          {incD.map((d,i)=>(
            <div key={d.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:9 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}><div style={{ width:9, height:9, borderRadius:3, background:C[i], flexShrink:0 }}/><span style={{ fontSize:"0.75rem", color:"#334155", fontWeight:600 }}>{d.name}</span></div>
              <span style={{ fontSize:"0.8rem", fontWeight:800, color:"#0f172a" }}>{d.value}%</span>
            </div>
          ))}
        </div>
        <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}><Icon name="pie" size={14} color="#3b82f6"/><span style={{ fontWeight:800, fontSize:"0.84rem", color:"#0f172a" }}>Income Split</span></div>
          <ResponsiveContainer width="100%" height={100}>
            <PieChart><Pie data={incD} cx="50%" cy="50%" innerRadius={28} outerRadius={44} dataKey="value" paddingAngle={3}>{incD.map((_,i)=><Cell key={i} fill={C[i]}/>)}</Pie><Tooltip content={<Tip/>}/></PieChart>
          </ResponsiveContainer>
          {incD.map((d,i)=><div key={d.name} style={{ display:"flex", alignItems:"center", gap:5, marginBottom:2 }}><div style={{ width:8, height:8, borderRadius:2, background:C[i] }}/><span style={{ fontSize:"0.65rem", color:"#64748b", fontWeight:600 }}>{d.name}</span></div>)}
        </div>
      </div>
    </div>
  );
};

// ─── Login ────────────────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [tab, setTab] = useState("login");
  const [name,setName]=useState(""), [email,setEmail]=useState(""), [pass,setPass]=useState("");
  const [err, setErr]=useState(""), [loading,setLoading]=useState(false);
  const { toasts, push } = useToasts();

  const doLogin = () => {
    setErr(""); setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      const u=getUsers().find(u=>u.email===email&&u.pass===pass);
      if (!u){ setErr("Invalid email or password."); push("Login failed","err"); return; }
      push(`Welcome back, ${u.name}!`,"ok");
      setTimeout(()=>onLogin({name:u.name,email:u.email,role:"user"}),600);
    },500);
  };
  const doSignup = () => {
    setErr(""); setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      if (!name||!email||!pass){ setErr("All fields are required."); push("Please fill all fields","err"); return; }
      if (pass.length<6){ setErr("Password must be at least 6 characters."); push("Password too short","err"); return; }
      const us=getUsers();
      if (us.find(u=>u.email===email)){ setErr("Email is already registered."); push("Email already in use","err"); return; }
      us.push({name,email,pass}); saveUsers(us);
      push(`Account created! Welcome, ${name}!`,"ok");
      setTimeout(()=>{ setTab("login"); setErr(""); setLoading(false); },700);
    },500);
  };
  const doGuest = () => {
    push("Entering guest mode…","info");
    setTimeout(()=>onLogin({name:"Guest",email:"guest",role:"guest"}),400);
  };

  const T=({id,label})=>(
    <button onClick={()=>{setTab(id);setErr("");}} style={{ flex:1, padding:"10px", border:"none", borderRadius:9, cursor:"pointer", background:tab===id?"#3b82f6":"transparent", color:tab===id?"#fff":"#64748b", fontWeight:700, fontSize:"0.82rem", fontFamily:"inherit", transition:"all .15s" }}>{label}</button>
  );

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#eff6ff 0%,#f0f4f8 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <ToastStack toasts={toasts}/>
      <div style={{ width:"100%", maxWidth:400, animation:"fadeUp .4s ease" }}>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ background:"linear-gradient(135deg,#2563eb,#3b82f6)", borderRadius:"20px 20px 0 0", padding:"32px 28px 28px", textAlign:"center" }}>
          <div style={{ width:62, height:62, background:"rgba(255,255,255,0.2)", borderRadius:18, margin:"0 auto 14px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name="chart" size={30} color="#fff"/>
          </div>
          <div style={{ color:"#fff", fontWeight:800, fontSize:"1.4rem", letterSpacing:"-0.02em" }}>Data Mining Dashboard</div>
          <div style={{ color:"#bfdbfe", fontSize:"0.8rem", marginTop:4 }}>Manage · Visualise · Decide</div>
        </div>
        <div style={{ background:"#fff", borderRadius:"0 0 20px 20px", padding:28, boxShadow:"0 12px 40px rgba(0,0,0,0.1)" }}>
          <div style={{ display:"flex", background:"#f1f5f9", borderRadius:10, padding:4, marginBottom:22 }}>
            <T id="login" label="Login"/><T id="signup" label="Sign Up"/>
          </div>
          {err && (
            <div style={{ background:"#fff7f7", color:"#991b1b", border:"1px solid #fecaca", padding:"10px 12px", borderRadius:9, fontSize:"0.8rem", fontWeight:700, marginBottom:14, display:"flex", alignItems:"center", gap:6, animation:"fadeUp .2s ease" }}>
              <Icon name="warning" size={14} color="#dc2626"/>{err}
            </div>
          )}
          {tab==="signup" && <Field label="Full Name" icon="user" value={name} onChange={setName} placeholder="Your name"/>}
          <Field label="Email"    icon="mail" value={email} onChange={setEmail} type="email"    placeholder="you@email.com"/>
          <Field label="Password" icon="lock" value={pass}  onChange={setPass}  type="password" placeholder="Min 6 characters"/>
          <button onClick={tab==="login"?doLogin:doSignup} disabled={loading}
            style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background:loading?"#93c5fd":"#3b82f6", color:"#fff", fontWeight:700, fontSize:"0.9rem", cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:"0 3px 12px rgba(59,130,246,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:7, transition:"background .2s" }}>
            {loading
              ? <><span style={{ width:16, height:16, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", display:"inline-block", animation:"spin .6s linear infinite" }}/> Please wait…</>
              : <><Icon name={tab==="login"?"check":"user"} size={16} color="#fff"/>{tab==="login"?"Login":"Create Account"}</>
            }
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:8, margin:"16px 0" }}>
            <div style={{ flex:1, height:1, background:"#e2e8f0" }}/><span style={{ fontSize:"0.72rem", color:"#94a3b8", fontWeight:600 }}>OR</span><div style={{ flex:1, height:1, background:"#e2e8f0" }}/>
          </div>
          <button onClick={doGuest} style={{ width:"100%", padding:"11px", borderRadius:10, border:"1.5px dashed #cbd5e1", background:"#f8fafc", color:"#475569", fontWeight:600, fontSize:"0.82rem", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
            <Icon name="user" size={15} color="#94a3b8"/> Continue as Guest (Demo)
          </button>
          <div style={{ textAlign:"center", fontSize:"0.68rem", color:"#94a3b8", marginTop:8 }}>Guest: view &amp; add only · no delete</div>
        </div>
      </div>
    </div>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ user, tab, setTab, onLogoutClick, wide, menuOpen, onClose }) => {
  const isGuest = user?.role==="guest";
  const nav = [["dash","Dashboard","table"],["pie","Analytics","charts"]];
  const body = (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ padding:"28px 20px 22px", background:"linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
        <div style={{ width:46, height:46, borderRadius:13, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
          <Icon name="user" size={22} color="#fff"/>
        </div>
        <div style={{ fontWeight:800, fontSize:"0.96rem", color:"#fff" }}>{user?.name}</div>
        <div style={{ fontSize:"0.71rem", color:"#bfdbfe", marginTop:2, fontWeight:500 }}>{isGuest?"Guest Demo":user?.email}</div>
        {isGuest && <div style={{ marginTop:8, display:"inline-block", background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"2px 10px", fontSize:"0.65rem", color:"#fff", fontWeight:700 }}>DEMO</div>}
      </div>
      <div style={{ flex:1, padding:"10px 0" }}>
        {nav.map(([ic,lb,id])=>(
          <div key={id} onClick={()=>{setTab(id);if(!wide)onClose();}}
            style={{ padding:"13px 20px", display:"flex", alignItems:"center", gap:11, cursor:"pointer", background:tab===id?"#eff6ff":"transparent", borderLeft:tab===id?"3px solid #3b82f6":"3px solid transparent", transition:"background .15s" }}>
            <Icon name={ic} size={17} color={tab===id?"#3b82f6":"#64748b"}/>
            <span style={{ fontWeight:700, fontSize:"0.87rem", color:tab===id?"#3b82f6":"#374151" }}>{lb}</span>
            {tab===id && <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:"#3b82f6" }}/>}
          </div>
        ))}
      </div>
      <div style={{ padding:"16px 20px", borderTop:"1px solid #f1f5f9" }}>
        <button onClick={onLogoutClick} style={{ width:"100%", padding:"11px", borderRadius:10, border:"1.5px solid #fecaca", background:"#fff7f7", color:"#dc2626", fontWeight:700, fontSize:"0.84rem", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:7, transition:"background .15s" }}
          onMouseEnter={e=>e.currentTarget.style.background="#fee2e2"} onMouseLeave={e=>e.currentTarget.style.background="#fff7f7"}>
          <Icon name="logout" size={15} color="#dc2626"/> Sign Out
        </button>
      </div>
    </div>
  );
  if (wide) return (
    <div style={{ width:220, flexShrink:0, background:"#fff", borderRight:"1px solid #f1f5f9", height:"100vh", position:"sticky", top:0, overflowY:"auto", boxShadow:"2px 0 12px rgba(0,0,0,0.04)" }}>
      {body}
    </div>
  );
  if (!menuOpen) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:90 }} onClick={onClose}>
      <div style={{ position:"absolute", top:0, left:0, width:240, height:"100%", background:"#fff", boxShadow:"4px 0 30px rgba(0,0,0,0.14)", animation:"slideR .22s ease" }} onClick={e=>e.stopPropagation()}>
        <style>{`@keyframes slideR{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>
        {body}
      </div>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
const PER = 8;

export default function App() {
  const wide = useWide();
  const { toasts, push } = useToasts();

  const [user,       setUser]       = useState(null);
  const [data,       setData]       = useState(getData);
  const [search,     setSearch]     = useState("");
  const [ageF,       setAgeF]       = useState("All");
  const [incF,       setIncF]       = useState("All");
  const [regF,       setRegF]       = useState("All");
  const [catF,       setCatF]       = useState("All");
  const [spendF,     setSpendF]     = useState("All");
  const [page,       setPage]       = useState(1);
  const [modal,      setModal]      = useState(null);
  const [target,     setTarget]     = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [tab,        setTab]        = useState("table");
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(()=>{ saveData(data); },[data]);
  useEffect(()=>{ setExpandedId(null); },[page,ageF,incF,regF,catF,spendF,search]);

  const nid = () => data.length ? Math.max(...data.map(d=>d.id))+1 : 1;

  const filtered = useMemo(()=>data.filter(r=>{
    const q=search.toLowerCase();
    if (q&&![r.name,r.age,r.income,r.purchase,r.spend,r.country].some(v=>String(v).toLowerCase().includes(q))) return false;
    if (ageF!=="All"&&getAgeLabel(r.age)!==ageF) return false;
    if (incF!=="All"&&getIncomeLabel(r.income)!==incF) return false;
    if (regF!=="All"&&getRegion(r.country)!==regF) return false;
    if (catF!=="All"&&getCat(r.purchase)!==catF) return false;
    if (spendF!=="All"&&getSpendLabel(r.spend)!==spendF) return false;
    return true;
  }),[data,search,ageF,incF,regF,catF,spendF]);

  const pages = Math.max(1,Math.ceil(filtered.length/PER));
  const paged = filtered.slice((page-1)*PER,page*PER);

  const restoreFn = useRef(null);

  const handleDelete = useCallback((row, restore) => {
    restoreFn.current = restore || null;
    setTarget(row);
    setModal("delete");
  },[]);

  const doAdd  = f => { setData(p=>[...p,{...f,id:nid()}]); setModal(null); push(`${f.name} added`,"ok"); };
  const doEdit = f => { setData(p=>p.map(r=>r.id===target.id?{...f,id:r.id}:r)); setModal(null); push("Record updated","ok"); };
  const doDel  = () => {
    restoreFn.current = null; // confirmed — no restore needed
    const n=target?.name;
    setData(p=>p.filter(r=>r.id!==target.id));
    setModal(null); setTarget(null);
    push(`${n} deleted`,"del");
  };
  const cancelDel = () => {
    if (restoreFn.current) { restoreFn.current(); restoreFn.current = null; }
    setModal(null); setTarget(null);
  };

  const doLogout = () => {
    setLogoutOpen(false);
    push(`Goodbye, ${user?.name}!`,"logout");
    setTimeout(()=>setUser(null),600);
  };

  if (!user) return (
    <div style={{ fontFamily:"'DM Sans','Inter','Segoe UI',sans-serif" }}>
      <style>{`*{box-sizing:border-box}body{margin:0}`}</style>
      <Login onLogin={u=>{ setUser(u); push(`Welcome${u.role==="guest"?", Guest":"back, "+u.name}!`,"ok"); }}/>
    </div>
  );

  const isGuest = user.role==="guest";

  return (
    <div style={{ fontFamily:"'DM Sans','Inter','Segoe UI',sans-serif", background:"#f0f4f8", minHeight:"100vh" }}>
      <style>{`*{box-sizing:border-box}body{margin:0}input,select,button{font-family:inherit}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:4px}@keyframes rowIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <ToastStack toasts={toasts}/>

      <LogoutModal open={logoutOpen} user={user} onConfirm={doLogout} onCancel={()=>setLogoutOpen(false)}/>

      <div style={{ display:"flex", minHeight:"100vh" }}>
        <Sidebar user={user} tab={tab} setTab={setTab} onLogoutClick={()=>setLogoutOpen(true)} wide={wide} menuOpen={menuOpen} onClose={()=>setMenuOpen(false)}/>

        <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
          {/* Header */}
          <div style={{ background:"linear-gradient(90deg,#1d4ed8,#3b82f6)", padding:"13px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:40, boxShadow:"0 2px 16px rgba(37,99,235,0.35)" }}>
            {!wide
              ? <button onClick={()=>setMenuOpen(o=>!o)} style={{ background:"none", border:"none", cursor:"pointer", padding:6, borderRadius:8, display:"flex" }}><Icon name="menu" size={22} color="#fff"/></button>
              : <span style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.8rem", fontWeight:600 }}>{tab==="table"?"Records":"Analytics"}</span>
            }
            <div style={{ color:"#fff", fontWeight:800, fontSize:wide?"1.1rem":"1rem", letterSpacing:"-0.01em" }}>
              Data Mining Dashboard
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {wide && <span style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.8)", fontWeight:600 }}>{isGuest?"Guest":user.name}</span>}
              <div style={{ width:34, height:34, borderRadius:10, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name="user" size={17} color="#fff"/>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding:wide?"24px":"14px", flex:1, maxWidth:wide?"1200px":"100%", width:"100%", margin:"0 auto", alignSelf:"stretch" }}>

            {/* Search + Filters */}
            <div style={{ marginBottom:14 }}>
              {/* Search bar */}
              <div style={{ position:"relative", marginBottom:10 }}>
                <div style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)" }}><Icon name="search" size={16} color="#94a3b8"/></div>
                <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="Search by name, age, product, country…"
                  style={{ width:"100%", padding:"11px 14px 11px 40px", borderRadius:12, border:"1.5px solid #e2e8f0", background:"#fff", fontSize:"0.88rem", outline:"none", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", color:"#1e293b", transition:"border-color .2s", boxSizing:"border-box" }}
                  onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
              </div>
              {/* Filter pills — wrap naturally, never overflow */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                <FilterPill label="Age Group"    iconName="user"  opts={["Young","Adult","Senior","Elder"]}                              value={ageF}   onChange={v=>{setAgeF(v);setPage(1);}}/>
                <FilterPill label="Income Level" iconName="money" opts={["High","Mid","Low"]}                                            value={incF}   onChange={v=>{setIncF(v);setPage(1);}}/>
                <FilterPill label="Spend Level"  iconName="tag"   opts={["High","Mid","Low"]}                                            value={spendF} onChange={v=>{setSpendF(v);setPage(1);}}/>
                <FilterPill label="Category"     iconName="tag"   opts={["Technology","Electronics","Fashion","Food","Education","General"]} value={catF}   onChange={v=>{setCatF(v);setPage(1);}}/>
                <FilterPill label="Region"       iconName="globe" opts={["International","Local"]}                                       value={regF}   onChange={v=>{setRegF(v);setPage(1);}}/>
                {/* Active filter count badge + clear all */}
                {[ageF,incF,spendF,catF,regF].some(f=>f!=="All") && (
                  <button onClick={()=>{setAgeF("All");setIncF("All");setSpendF("All");setCatF("All");setRegF("All");setPage(1);}}
                    style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 12px", borderRadius:20, border:"1.5px solid #fecaca", background:"#fff7f7", color:"#dc2626", fontSize:"0.73rem", fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
                    <Icon name="close" size={11} color="#dc2626"/> Clear filters
                  </button>
                )}
              </div>
            </div>

            {tab==="table" ? (
              <>
                {/* Stats */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:wide?16:10, marginBottom:wide?18:13 }}>
                  {[
                    {icon:"records",lbl:"Records",    val:data.length},
                    {icon:"money",  lbl:"Avg Income (₱)", val:"₱"+(data.length?Math.round(data.reduce((a,r)=>a+toPhp(r.income,r.country),0)/data.length).toLocaleString():0)},
                    {icon:"map",    lbl:"Countries",  val:new Set(data.map(r=>r.country)).size},
                  ].map(s=>(
                    <div key={s.lbl} style={{ background:"#fff", borderRadius:14, padding:wide?"18px 16px":"12px 10px", textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", transition:"transform .15s", cursor:"default" }}
                      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                      <div style={{ display:"flex", justifyContent:"center", marginBottom:6 }}><Icon name={s.icon} size={wide?22:18} color="#3b82f6"/></div>
                      <div style={{ fontWeight:800, fontSize:wide?"1.3rem":"1.05rem", color:"#0f172a" }}>{s.val}</div>
                      <div style={{ fontSize:"0.66rem", fontWeight:600, color:"#94a3b8", marginTop:2 }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Swipe hint (mobile only) */}
                {!wide && !isGuest && (
                  <div style={{ background:"#fff", border:"1px solid #e0e7ff", borderRadius:10, padding:"9px 12px", marginBottom:13, display:"flex", alignItems:"center", gap:9 }}>
                    <Icon name="swipe" size={16} color="#4f46e5"/>
                    <span style={{ fontSize:"0.75rem", color:"#4338ca", fontWeight:600 }}>Swipe any row <strong>right</strong> to delete</span>
                  </div>
                )}

                {/* Table */}
                <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 2px 10px rgba(0,0,0,0.07)", overflow:"hidden", marginBottom:14, border:"1.5px solid #d1d9e6" }}>
                  {/* Header */}
                  <div style={{ display:"grid", gridTemplateColumns:wide?"minmax(0,2fr) 90px 140px 130px 140px 140px 120px":"minmax(0,2fr) minmax(0,1.5fr) minmax(0,1.2fr) 22px", gap:wide?12:8, padding:wide?"12px 20px":"10px 14px", background:"#eef1f7", borderBottom:"2px solid #d1d9e6" }}>
                    {(wide
                      ? [
                          {h:"Name",       s:"Product · Region"},
                          {h:"Age",        s:"Label"},
                          {h:"Income",     s:"Level"},
                          {h:"Purchase",   s:"Category"},
                          {h:"Amt. Spent", s:"Spend Level"},
                          {h:"Country",    s:"Region"},
                          {h:"Actions",    s:""},
                        ]
                      : [
                          {h:"Name",    s:"Product · Region"},
                          {h:"Age",     s:"Income Level"},
                          {h:"Spend",   s:"Country"},
                          {h:"",        s:""},
                        ]
                    ).map((c,i)=>(
                      <div key={i} style={{ textAlign:wide&&i===6?"right":"left" }}>
                        <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#374151" }}>{c.h}</div>
                        {c.s && <div style={{ fontSize:"0.62rem", color:"#9ca3af", fontWeight:500, marginTop:2 }}>{c.s}</div>}
                      </div>
                    ))}
                  </div>

                  {paged.length===0
                    ? <div style={{ padding:40, textAlign:"center" }}>
                        <div style={{ display:"flex", justifyContent:"center", marginBottom:10, opacity:0.3 }}><Icon name="records" size={40} color="#94a3b8"/></div>
                        <div style={{ color:"#94a3b8", fontWeight:700, fontSize:"0.9rem" }}>No records found</div>
                      </div>
                    : paged.map((row,i)=> wide
                        ? <DesktopRow key={row.id} row={row} isLast={i===paged.length-1} isGuest={isGuest} onEdit={r=>{setTarget(r);setModal("edit");}} onDelete={handleDelete} idx={i}/>
                        : <SwipeRow  key={row.id} row={row} isLast={i===paged.length-1} isGuest={isGuest} expanded={expandedId===row.id} onToggle={setExpandedId} onEdit={r=>{setTarget(r);setModal("edit");}} onDelete={handleDelete}/>
                      )
                  }

                  {/* Pagination */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:13, borderTop:"1.5px solid #e2e8f0" }}>
                    <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                      style={{ width:30, height:30, borderRadius:8, border:"1.5px solid #e2e8f0", background:"#fff", cursor:page===1?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", opacity:page===1?0.35:1 }}>
                      <Icon name="chevron" size={14} color="#374151" style={{transform:"rotate(90deg)"}}/>
                    </button>
                    {Array.from({length:pages},(_,i)=>i+1).map(p=>(
                      <button key={p} onClick={()=>setPage(p)}
                        style={{ width:30, height:30, borderRadius:8, border:"1.5px solid", borderColor:page===p?"#3b82f6":"#e2e8f0", background:page===p?"#3b82f6":"#fff", color:page===p?"#fff":"#374151", fontWeight:700, fontSize:"0.78rem", cursor:"pointer" }}>{p}</button>
                    ))}
                    <button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages}
                      style={{ width:30, height:30, borderRadius:8, border:"1.5px solid #e2e8f0", background:"#fff", cursor:page===pages?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", opacity:page===pages?0.35:1 }}>
                      <Icon name="chevron" size={14} color="#374151" style={{transform:"rotate(-90deg)"}}/>
                    </button>
                  </div>
                </div>

                <button onClick={()=>setModal("add")}
                  style={{ width:"100%", padding:"13px", borderRadius:12, border:"none", background:"#3b82f6", color:"#fff", fontWeight:700, fontSize:"0.9rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 4px 14px rgba(59,130,246,0.35)", transition:"background .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#2563eb"} onMouseLeave={e=>e.currentTarget.style.background="#3b82f6"}>
                  <Icon name="plus" size={18} color="#fff"/> Add Data
                </button>
              </>
            ) : (
              <Charts data={data}/>
            )}
          </div>
        </div>
      </div>

      <Modal open={modal==="add"}    title="Add New Record" onClose={()=>setModal(null)}>
        <RecordForm onSave={doAdd} onCancel={()=>setModal(null)}/>
      </Modal>
      <Modal open={modal==="edit"}   title="Edit Record"    onClose={()=>setModal(null)}>
        {target && <RecordForm initial={target} onSave={doEdit} onCancel={()=>setModal(null)}/>}
      </Modal>
      <Modal open={modal==="delete"} title="Delete Record"  onClose={cancelDel} center width={360}>
        <DeleteDialog row={target} onConfirm={doDel} onCancel={cancelDel}/>
      </Modal>
    </div>
  );
}
