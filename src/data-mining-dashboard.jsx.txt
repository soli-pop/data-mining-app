import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── Icons (SVG, no emojis) ───────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor", style: sx = {} }) => {
  const paths = {
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
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display:"block", flexShrink:0, ...sx }}>
      {paths[name]}
    </svg>
  );
};

// ─── Identifier Helpers ───────────────────────────────────────────────────────
const getAgeLabel    = (a) => { const n=parseInt(a); if(isNaN(n)) return "—"; if(n<=17) return "Young"; if(n<=35) return "Adult"; if(n<=59) return "Senior"; return "Elder"; };
const getIncomeLabel = (v) => { const n=parseFloat(String(v).replace(/[^0-9.]/g,"")); if(isNaN(n)) return "—"; if(n<10000) return "Low"; if(n<50000) return "Mid"; return "High"; };
const PMAP = { Cellphone:"Technology",Laptop:"Technology",Tablet:"Technology",TV:"Electronics",Headphones:"Electronics",Camera:"Electronics",Shoes:"Fashion",Bag:"Fashion",Watch:"Fashion",Rice:"Food",Groceries:"Food",Coffee:"Food",Book:"Education",Course:"Education" };
const getCat   = (p) => { for(const [k,v] of Object.entries(PMAP)) if(p?.toLowerCase().includes(k.toLowerCase())) return v; return "General"; };
const RMAP = { USA:"International",UK:"International",Japan:"International",Australia:"International",Canada:"International",Germany:"International",France:"International",Singapore:"International",Philippines:"Local",India:"International" };
const getRegion= (c) => RMAP[c]||(c?"International":"—");
const fmtM     = (n) => "₱"+Number(n||0).toLocaleString();

const AGE_C={ Young:"#ef4444",Adult:"#3b82f6",Senior:"#f59e0b",Elder:"#8b5cf6" };
const INC_C={ High:"#16a34a",Mid:"#d97706",Low:"#dc2626" };
const CAT_C={ Technology:"#4f46e5",Electronics:"#0891b2",Fashion:"#db2777",Food:"#15803d",Education:"#b45309",General:"#6b7280" };
const REG_C={ International:"#2563eb",Local:"#059669" };

// ─── Storage ──────────────────────────────────────────────────────────────────
const SAMPLE=[
  {id:1,name:"John Doe",    age:"23",income:"25000",purchase:"Cellphone",spend:"20000",country:"USA"},
  {id:2,name:"Jane Smith",  age:"42",income:"80000",purchase:"Laptop",   spend:"20000",country:"Philippines"},
  {id:3,name:"Alice Brown", age:"16",income:"15000",purchase:"Shoes",    spend:"5000", country:"Japan"},
  {id:4,name:"Carlos Reyes",age:"30",income:"9000", purchase:"Coffee",   spend:"3000", country:"Philippines"},
  {id:5,name:"Kim Tanaka",  age:"55",income:"120000",purchase:"Camera",  spend:"45000",country:"Japan"},
];
const UK="dmdb_users", DK="dmdb_data";
const getUsers=()=>{try{return JSON.parse(localStorage.getItem(UK)||"[]")}catch{return []}};
const saveUsers=(u)=>localStorage.setItem(UK,JSON.stringify(u));
const getData=()=>{try{return JSON.parse(localStorage.getItem(DK))||SAMPLE}catch{return SAMPLE}};
const saveData=(d)=>localStorage.setItem(DK,JSON.stringify(d));

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge=({label,color})=>(
  <span style={{background:color+"15",color,border:"1px solid "+color+"30",fontSize:"0.6rem",fontWeight:700,padding:"2px 8px",borderRadius:20,fontFamily:"inherit",whiteSpace:"nowrap",display:"inline-block",letterSpacing:"0.02em"}}>
    {label}
  </span>
);

// ─── Field / Select ───────────────────────────────────────────────────────────
const Field=({label,icon,value,onChange,type="text",placeholder})=>(
  <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:"0.73rem",fontWeight:700,color:"#475569",marginBottom:5,display:"flex",alignItems:"center",gap:5}}>{icon&&<Icon name={icon} size={13} color="#64748b"/>}{label}</div>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{width:"100%",padding:"11px 13px",borderRadius:10,border:"1.5px solid #e2e8f0",background:"#f8fafc",fontFamily:"inherit",fontSize:"0.88rem",color:"#1e293b",outline:"none",boxSizing:"border-box",transition:"border-color .2s"}}
      onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
  </div>
);
const Sel=({label,icon,value,onChange,opts})=>(
  <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:"0.73rem",fontWeight:700,color:"#475569",marginBottom:5,display:"flex",alignItems:"center",gap:5}}>{icon&&<Icon name={icon} size={13} color="#64748b"/>}{label}</div>}
    <div style={{position:"relative"}}>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{width:"100%",padding:"11px 36px 11px 13px",borderRadius:10,border:"1.5px solid #e2e8f0",background:"#f8fafc",fontFamily:"inherit",fontSize:"0.88rem",color:"#1e293b",outline:"none",boxSizing:"border-box",appearance:"none",transition:"border-color .2s"}}
        onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
      <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><Icon name="chevron" size={14} color="#94a3b8"/></span>
    </div>
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal=({open,title,onClose,children,center,width=480})=>{
  if(!open) return null;
  return(
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:center?"center":"flex-end",justifyContent:"center",background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",padding:center?"20px":0}}>
      <div style={{width:"100%",maxWidth:width,background:"#fff",borderRadius:center?"16px":"22px 22px 0 0",padding:"22px 20px",maxHeight:"90vh",overflowY:"auto",animation:center?"pop .22s cubic-bezier(.34,1.56,.64,1)":"up .25s cubic-bezier(.34,1.56,.64,1)"}}>
        <style>{`@keyframes up{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes pop{from{transform:scale(.88);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontWeight:800,fontSize:"1rem",color:"#0f172a",letterSpacing:"-0.01em"}}>{title}</div>
          <button onClick={onClose} style={{background:"#f1f5f9",border:"none",borderRadius:8,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="close" size={15} color="#64748b"/></button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── Filter Pill ─────────────────────────────────────────────────────────────
const FilterPill = ({ label, iconName, opts, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [pos,  setPos]  = useState({ top: 0, left: 0 });
  const btnRef  = useRef();
  const dropRef = useRef();

  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      const inBtn  = btnRef.current  && btnRef.current.contains(e.target);
      const inDrop = dropRef.current && dropRef.current.contains(e.target);
      if (!inBtn && !inDrop) setOpen(false);
    };
    // use pointerup so the click on an option has already been processed
    document.addEventListener("pointerup", h);
    return () => document.removeEventListener("pointerup", h);
  }, [open]);

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, left: r.left });
    }
    setOpen(o => !o);
  };

  const select = (o) => {
    onChange(o);
    setOpen(false);
  };

  const active = value !== "All";

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        ref={btnRef}
        onClick={toggle}
        style={{
          display: "flex", alignItems: "center", gap: 5,
          padding: "7px 12px", borderRadius: 20,
          border: "1.5px solid " + (active ? "#3b82f6" : "#e2e8f0"),
          background: active ? "#eff6ff" : "#fff",
          color: active ? "#3b82f6" : "#64748b",
          fontSize: "0.73rem", fontWeight: 700, fontFamily: "inherit",
          cursor: "pointer", whiteSpace: "nowrap",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "all .15s",
        }}
      >
        <Icon name={iconName} size={13} color={active ? "#3b82f6" : "#94a3b8"} />
        {active ? value : label}
        <Icon name="chevron" size={11} color={active ? "#3b82f6" : "#94a3b8"} />
      </button>

      {open && (
        <div
          ref={dropRef}
          style={{
            position: "fixed", top: pos.top, left: pos.left, zIndex: 999,
            background: "#fff", borderRadius: 12, minWidth: 155,
            boxShadow: "0 8px 28px rgba(0,0,0,0.16)", border: "1px solid #f1f5f9",
            overflow: "hidden", animation: "dropIn .15s ease",
          }}
        >
          <style>{`@keyframes dropIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
          {["All", ...opts].map(o => (
            <div
              key={o}
              onPointerDown={e => { e.stopPropagation(); select(o); }}
              style={{
                padding: "12px 16px", fontSize: "0.82rem", fontWeight: 600,
                color: value === o ? "#3b82f6" : "#374151",
                background: value === o ? "#eff6ff" : "transparent",
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              }}
            >
              {o}
              {value === o && <Icon name="check" size={13} color="#3b82f6" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Swipeable Row ────────────────────────────────────────────────────────────
// touchmove registered via useEffect {passive:false} so preventDefault works.
// All drag visuals go through direct DOM — no React re-renders during gesture.
const SWIPE_TRIGGER = 72;

const SwipeRow = ({ row, isLast, isGuest, onEdit, onSwipeDelete, expanded, onToggle }) => {

  const outerRef = useRef(null);
  const slideRef = useRef(null);
  const bgRef    = useRef(null);
  const iconRef  = useRef(null);

  // all mutable drag state lives here — never causes re-renders
  const drag = useRef({
    active:  false,
    fired:   false,
    startX:  0,
    startY:  0,
    curX:    0,
    axis:    null,   // "h" | "v" | null
  });

  const cbRef = useRef(onSwipeDelete);
  useEffect(() => { cbRef.current = onSwipeDelete; }, [onSwipeDelete]);
  const isGuestRef = useRef(isGuest);
  useEffect(() => { isGuestRef.current = isGuest; }, [isGuest]);

  const ageL = getAgeLabel(row.age),  incL = getIncomeLabel(row.income),
        catL = getCat(row.purchase),   cntL = getRegion(row.country);

  // direct DOM helpers
  const domMove = (x) => {
    if (slideRef.current) slideRef.current.style.transform = `translateX(${x}px)`;
    const p = Math.min(Math.max(x, 0) / SWIPE_TRIGGER, 1);
    if (bgRef.current)   bgRef.current.style.opacity   = String(Math.min(p * 1.3, 1));
    if (iconRef.current) {
      iconRef.current.style.opacity   = String(p);
      iconRef.current.style.transform = `scale(${0.4 + p * 0.6})`;
    }
  };

  const snapBack = () => {
    if (slideRef.current) {
      slideRef.current.style.transition = "transform 200ms ease";
      slideRef.current.style.transform  = "translateX(0px)";
    }
    if (bgRef.current)   bgRef.current.style.opacity   = "0";
    if (iconRef.current) iconRef.current.style.opacity  = "0";
    drag.current.curX  = 0;
    drag.current.axis  = null;
    drag.current.active = false;
  };

  const flyAndConfirm = () => {
    if (drag.current.fired) return;
    drag.current.fired  = true;
    drag.current.active = false;

    // 1 — fly row off-screen
    if (slideRef.current) {
      slideRef.current.style.transition = "transform 220ms cubic-bezier(0.4,0,0.8,1)";
      slideRef.current.style.transform  = "translateX(520px)";
    }
    if (bgRef.current) bgRef.current.style.opacity = "1";

    // 2 — collapse height
    setTimeout(() => {
      const el = outerRef.current;
      if (!el) return;
      const h = el.offsetHeight;
      el.style.overflow   = "hidden";
      el.style.maxHeight  = h + "px";
      el.getBoundingClientRect(); // force reflow
      el.style.transition = "max-height 220ms ease, opacity 180ms ease";
      el.style.maxHeight  = "0px";
      el.style.opacity    = "0";
    }, 220);

    // 3 — open popup
    setTimeout(() => {
      cbRef.current(row);
    }, 460);
  };

  // ── Register touch listeners via useEffect so touchmove can be non-passive ──
  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;

    const onStart = (e) => {
      if (drag.current.fired) return;
      const t = e.touches[0];
      drag.current.startX = t.clientX;
      drag.current.startY = t.clientY;
      drag.current.curX   = 0;
      drag.current.axis   = null;
      drag.current.active = true;
      if (slideRef.current) slideRef.current.style.transition = "none";
    };

    const onMove = (e) => {
      if (!drag.current.active || drag.current.fired) return;
      const t  = e.touches[0];
      const dx = t.clientX - drag.current.startX;
      const dy = t.clientY - drag.current.startY;

      // determine axis on first meaningful movement
      if (drag.current.axis === null) {
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
        drag.current.axis = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
      }
      if (drag.current.axis !== "h") return;

      e.preventDefault(); // works because listener is non-passive
      const clamped = Math.max(0, Math.min(dx, 400));
      drag.current.curX = clamped;
      domMove(clamped);
    };

    const onEnd = () => {
      if (!drag.current.active || drag.current.fired) return;
      if (drag.current.curX >= SWIPE_TRIGGER && !isGuestRef.current) {
        flyAndConfirm();
      } else {
        snapBack();
      }
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove",  onMove,  { passive: false }); // ← key fix
    el.addEventListener("touchend",   onEnd,   { passive: true });
    el.addEventListener("touchcancel",onEnd,   { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove",  onMove);
      el.removeEventListener("touchend",   onEnd);
      el.removeEventListener("touchcancel",onEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount once — drag ref + cbRef handle the rest

  return (
    <div
      ref={outerRef}
      style={{ position: "relative", overflow: "hidden", borderBottom: isLast ? "none" : "1px solid #f1f5f9" }}
    >
      {/* Red bg — always in DOM, opacity controlled via ref */}
      <div ref={bgRef} style={{ position: "absolute", inset: 0, background: "#dc2626", display: "flex", alignItems: "center", paddingLeft: 22, opacity: 0, pointerEvents: "none" }}>
        <div ref={iconRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: 0, transform: "scale(0.4)" }}>
          <Icon name="trash" size={26} color="#fff" />
          <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "#fff", letterSpacing: "0.08em" }}>DELETE</span>
        </div>
      </div>

      {/* Sliding content */}
      <div ref={slideRef} style={{ background: "#fff", willChange: "transform", touchAction: "pan-y" }}>
        {/* Main row */}
        <div
          onClick={() => onToggle(expanded ? null : row.id)}
          style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1.6fr) minmax(0,1.1fr) 20px", padding: "13px 14px", alignItems: "center", cursor: "pointer", userSelect: "none" }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a", marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.name || "—"}</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <Badge label={catL} color={CAT_C[catL] || "#6366f1"} />
              <Badge label={cntL} color={REG_C[cntL] || "#3b82f6"} />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: AGE_C[ageL] || "#1e293b", marginBottom: 5 }}>
              {row.age} <span style={{ fontWeight: 600, fontSize: "0.72rem", opacity: 0.85 }}>({ageL})</span>
            </div>
            <Badge label={incL + " Income"} color={INC_C[incL] || "#64748b"} />
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#0f172a", marginBottom: 2 }}>{fmtM(row.spend)}</div>
            <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600 }}>{row.country}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .25s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
            <Icon name="chevron" size={16} color="#94a3b8" />
          </div>
        </div>

        {/* Expanded panel */}
        <div style={{ overflow: "hidden", maxHeight: expanded ? "280px" : "0", transition: "max-height .3s cubic-bezier(0.4,0,0.2,1)" }}>
          <div style={{ padding: "0 12px 14px" }}>
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: 12, marginBottom: 10, border: "1px solid #f0f4f8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                <Icon name="tag" size={12} color="#94a3b8" />
                <span style={{ fontSize: "0.62rem", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.07em", textTransform: "uppercase" }}>Identifiers</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { lbl: "Age",     raw: `${row.age} yrs`,  badge: ageL,           color: AGE_C[ageL] || "#6366f1" },
                  { lbl: "Income",  raw: fmtM(row.income),  badge: incL+" Income", color: INC_C[incL] || "#64748b" },
                  { lbl: "Product", raw: row.purchase,      badge: catL,           color: CAT_C[catL] || "#6366f1" },
                  { lbl: "Region",  raw: row.country,       badge: cntL,           color: REG_C[cntL] || "#3b82f6" },
                ].map(({ lbl, raw, badge, color }) => (
                  <div key={lbl} style={{ background: "#fff", borderRadius: 9, padding: "9px 10px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: "0.58rem", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", marginBottom: 3 }}>{lbl.toUpperCase()}</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e293b", marginBottom: 5 }}>{raw}</div>
                    <Badge label={badge} color={color} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={e => { e.stopPropagation(); onToggle(null); onEdit(row); }}
                style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1.5px solid #bfdbfe", background: "#eff6ff", color: "#1d4ed8", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Icon name="edit" size={14} color="#1d4ed8" /> Edit
              </button>
              {!isGuest && (
                <button onClick={e => { e.stopPropagation(); onToggle(null); onSwipeDelete(row); }}
                  style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1.5px solid #fecaca", background: "#fff7f7", color: "#dc2626", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Icon name="trash" size={14} color="#dc2626" /> Delete
                </button>
              )}
              <button onClick={e => { e.stopPropagation(); onToggle(null); }}
                style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#64748b", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="close" size={14} color="#94a3b8" />
              </button>
            </div>

            {!isGuest && (
              <div style={{ marginTop: 9, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <Icon name="swipe" size={12} color="#cbd5e1" />
                <span style={{ fontSize: "0.63rem", color: "#cbd5e1", fontWeight: 600 }}>Swipe row right to delete</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Telegram-style Delete Dialog ────────────────────────────────────────────
const DeleteDialog=({row,onConfirm,onCancel})=>(
  <div style={{padding:"4px 0 8px"}}>
    <div style={{fontSize:"0.92rem",color:"#334155",lineHeight:1.65,marginBottom:20,fontWeight:500}}>
      Are you sure you want to delete{" "}
      <span style={{fontWeight:800,color:"#0f172a"}}>
        {row?.name||"this record"}
      </span>
      ?{" "}
      <span style={{color:"#64748b",fontSize:"0.85rem"}}>
        ({getAgeLabel(row?.age)} · {getCat(row?.purchase)} · {getRegion(row?.country)})
      </span>
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",gap:6}}>
      <button onClick={onCancel}
        style={{padding:"10px 20px",borderRadius:9,border:"none",background:"transparent",color:"#3b82f6",fontWeight:700,fontSize:"0.88rem",cursor:"pointer",fontFamily:"inherit"}}>
        Cancel
      </button>
      <button onClick={onConfirm}
        style={{padding:"10px 22px",borderRadius:9,border:"none",background:"transparent",color:"#dc2626",fontWeight:700,fontSize:"0.88rem",cursor:"pointer",fontFamily:"inherit"}}>
        Delete
      </button>
    </div>
  </div>
);

// ─── Record Form ──────────────────────────────────────────────────────────────
const COUNTRIES=["USA","Philippines","Japan","UK","Australia","Canada","Germany","France","Singapore","India"];
const PRODUCTS=["Cellphone","Laptop","Tablet","TV","Headphones","Camera","Shoes","Bag","Watch","Rice","Groceries","Coffee","Book","Course"];

const RecordForm=({initial,onSave,onCancel})=>{
  const [f,setF]=useState(initial||{name:"",age:"",income:"",purchase:"Cellphone",spend:"",country:"Philippines"});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  const ageL=getAgeLabel(f.age),incL=getIncomeLabel(f.income),catL=getCat(f.purchase),cntL=getRegion(f.country);
  return(
    <>
      <div style={{background:"#f8fafc",borderRadius:10,padding:"10px 12px",marginBottom:16,border:"1px solid #f0f4f8"}}>
        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:7}}>
          <Icon name="tag" size={12} color="#94a3b8"/>
          <span style={{fontSize:"0.62rem",fontWeight:800,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.06em"}}>Live Identifiers</span>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {f.age    &&<Badge label={ageL}           color={AGE_C[ageL]||"#6366f1"}/>}
          {f.income &&<Badge label={incL+" Income"} color={INC_C[incL]||"#64748b"}/>}
          {f.purchase&&<Badge label={catL}          color={CAT_C[catL]||"#6366f1"}/>}
          {f.country &&<Badge label={cntL}          color={REG_C[cntL]||"#3b82f6"}/>}
          {!f.age&&!f.income&&<span style={{fontSize:"0.72rem",color:"#cbd5e1",fontFamily:"inherit"}}>Fill in fields to see identifiers…</span>}
        </div>
      </div>
      <Field label="Full Name"  icon="user"  value={f.name}    onChange={v=>s("name",v)}    placeholder="e.g. John Doe"/>
      <Field label="Age"        icon="tag"   value={f.age}     onChange={v=>s("age",v)}     type="number" placeholder="e.g. 23"/>
      <Field label="Income (₱)" icon="money" value={f.income}  onChange={v=>s("income",v)} type="number" placeholder="e.g. 25000"/>
      <Sel   label="Purchase"   icon="tag"   value={f.purchase} onChange={v=>s("purchase",v)} opts={PRODUCTS}/>
      <Field label="Spend (₱)"  icon="money" value={f.spend}   onChange={v=>s("spend",v)}   type="number" placeholder="e.g. 5000"/>
      <Sel   label="Country"    icon="globe" value={f.country}  onChange={v=>s("country",v)} opts={COUNTRIES}/>
      <div style={{display:"flex",gap:10,marginTop:4}}>
        <button onClick={()=>{if(!f.name||!f.age)return;onSave(f);}}
          style={{flex:1,padding:"12px",borderRadius:10,border:"none",background:"#3b82f6",color:"#fff",fontWeight:700,fontSize:"0.88rem",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:"0 3px 12px rgba(59,130,246,0.35)"}}>
          <Icon name="check" size={15} color="#fff"/> Save Record
        </button>
        <button onClick={onCancel}
          style={{flex:1,padding:"12px",borderRadius:10,border:"1.5px solid #e2e8f0",background:"#fff",color:"#64748b",fontWeight:700,fontSize:"0.88rem",cursor:"pointer",fontFamily:"inherit"}}>
          Cancel
        </button>
      </div>
    </>
  );
};

// ─── Login ────────────────────────────────────────────────────────────────────
const Login=({onLogin})=>{
  const [tab,setTab]=useState("login");
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  const [err,setErr]=useState(""); const [ok,setOk]=useState("");
  const doLogin=()=>{setErr("");const u=getUsers().find(u=>u.email===email&&u.pass===pass);if(!u)return setErr("Invalid credentials.");onLogin({name:u.name,email:u.email,role:"user"});};
  const doSignup=()=>{setErr("");if(!name||!email||!pass)return setErr("All fields required.");if(pass.length<6)return setErr("Min 6 chars.");const us=getUsers();if(us.find(u=>u.email===email))return setErr("Email already taken.");us.push({name,email,pass});saveUsers(us);setOk("Account created!");setTab("login");};
  const T=({id,label})=>(<button onClick={()=>{setTab(id);setErr("");}} style={{flex:1,padding:"10px",border:"none",borderRadius:9,cursor:"pointer",background:tab===id?"#3b82f6":"transparent",color:tab===id?"#fff":"#64748b",fontWeight:700,fontSize:"0.82rem",fontFamily:"inherit",transition:"all .15s"}}>{label}</button>);
  return(
    <div style={{minHeight:"100vh",background:"#f0f4f8",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:380}}>
        <div style={{background:"linear-gradient(135deg,#2563eb,#3b82f6)",borderRadius:"20px 20px 0 0",padding:"32px 24px 28px",textAlign:"center"}}>
          <div style={{width:60,height:60,background:"rgba(255,255,255,0.18)",borderRadius:18,margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Icon name="chart" size={28} color="#fff"/>
          </div>
          <div style={{color:"#fff",fontWeight:800,fontSize:"1.35rem",letterSpacing:"-0.02em"}}>Data Mining Dashboard</div>
          <div style={{color:"#bfdbfe",fontSize:"0.8rem",marginTop:4,fontWeight:500}}>Manage · Visualise · Decide</div>
        </div>
        <div style={{background:"#fff",borderRadius:"0 0 20px 20px",padding:"24px",boxShadow:"0 12px 40px rgba(0,0,0,0.1)"}}>
          <div style={{display:"flex",background:"#f1f5f9",borderRadius:10,padding:4,marginBottom:22}}>
            <T id="login" label="Login"/><T id="signup" label="Sign Up"/>
          </div>
          {ok  &&<div style={{background:"#f0fdf4",color:"#166534",border:"1px solid #bbf7d0",padding:"10px 12px",borderRadius:9,fontSize:"0.8rem",fontWeight:700,marginBottom:14,display:"flex",alignItems:"center",gap:6}}><Icon name="check" size={14} color="#16a34a"/>{ok}</div>}
          {err &&<div style={{background:"#fff7f7",color:"#991b1b",border:"1px solid #fecaca",padding:"10px 12px",borderRadius:9,fontSize:"0.8rem",fontWeight:700,marginBottom:14,display:"flex",alignItems:"center",gap:6}}><Icon name="warning" size={14} color="#dc2626"/>{err}</div>}
          {tab==="signup"&&<Field label="Full Name" icon="user" value={name} onChange={setName} placeholder="Your name"/>}
          <Field label="Email"    icon="mail" value={email} onChange={setEmail} type="email"    placeholder="you@email.com"/>
          <Field label="Password" icon="lock" value={pass}  onChange={setPass}  type="password" placeholder="Min 6 characters"/>
          <button onClick={tab==="login"?doLogin:doSignup}
            style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:"#3b82f6",color:"#fff",fontWeight:700,fontSize:"0.9rem",cursor:"pointer",fontFamily:"inherit",boxShadow:"0 3px 12px rgba(59,130,246,0.35)",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            {tab==="login"?<><Icon name="check" size={16} color="#fff"/>Login</>:<><Icon name="user" size={16} color="#fff"/>Create Account</>}
          </button>
          <div style={{display:"flex",alignItems:"center",gap:8,margin:"16px 0"}}>
            <div style={{flex:1,height:1,background:"#e2e8f0"}}/><span style={{fontSize:"0.72rem",color:"#94a3b8",fontWeight:600}}>OR</span><div style={{flex:1,height:1,background:"#e2e8f0"}}/>
          </div>
          <button onClick={()=>onLogin({name:"Guest",email:"guest",role:"guest"})}
            style={{width:"100%",padding:"11px",borderRadius:10,border:"1.5px dashed #cbd5e1",background:"#f8fafc",color:"#475569",fontWeight:600,fontSize:"0.82rem",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            <Icon name="user" size={15} color="#94a3b8"/> Continue as Guest (Demo)
          </button>
          <div style={{textAlign:"center",fontSize:"0.68rem",color:"#94a3b8",marginTop:8,fontWeight:500}}>Guest access: view &amp; add only · no delete</div>
        </div>
      </div>
    </div>
  );
};

// ─── Charts ───────────────────────────────────────────────────────────────────
const Charts=({data})=>{
  const byAge=useMemo(()=>{const m={};data.forEach(r=>{const k=getAgeLabel(r.age);if(!m[k])m[k]={t:0,c:0};m[k].t+=Number(r.spend||0);m[k].c++;});return Object.entries(m).map(([name,v])=>({name,avg:Math.round(v.t/v.c)}));},[data]);
  const incD=useMemo(()=>{const m={High:0,Mid:0,Low:0};data.forEach(r=>{const k=getIncomeLabel(r.income);if(m[k]!==undefined)m[k]++;});const tot=data.length||1;return Object.entries(m).map(([name,v])=>({name:name+" Income",value:Math.round(v/tot*100)}));},[data]);
  const C=["#16a34a","#d97706","#dc2626"];
  const Tip=({active,payload})=>active&&payload?.[0]?(<div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:9,padding:"8px 12px",fontSize:"0.78rem",fontWeight:700,boxShadow:"0 4px 14px rgba(0,0,0,0.1)"}}><div style={{color:"#64748b",marginBottom:2}}>{payload[0].payload?.name}</div><div style={{color:"#0f172a"}}>{payload[0].dataKey==="avg"?fmtM(payload[0].value):payload[0].value+"%"}</div></div>):null;
  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{background:"#fff",borderRadius:16,padding:18,boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:14}}>
          <Icon name="chart" size={16} color="#3b82f6"/>
          <span style={{fontWeight:800,fontSize:"0.9rem",color:"#0f172a"}}>Avg Spend by Age Group</span>
        </div>
        <ResponsiveContainer width="100%" height={155}>
          <BarChart data={byAge} barCategoryGap="35%">
            <XAxis dataKey="name" tick={{fontSize:11,fontFamily:"inherit",fill:"#64748b",fontWeight:600}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:10,fontFamily:"inherit",fill:"#94a3b8"}} axisLine={false} tickLine={false} tickFormatter={v=>"₱"+(v>=1000?(v/1000).toFixed(0)+"k":v)}/>
            <Tooltip content={<Tip/>} cursor={{fill:"#f8fafc"}}/>
            <Bar dataKey="avg" radius={[6,6,0,0]}>{byAge.map((e,i)=><Cell key={i} fill={AGE_C[e.name]||"#3b82f6"}/>)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{background:"#fff",borderRadius:16,padding:16,boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
            <Icon name="user" size={14} color="#3b82f6"/>
            <span style={{fontWeight:800,fontSize:"0.82rem",color:"#0f172a"}}>By Income</span>
          </div>
          {incD.map((d,i)=>(
            <div key={d.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <div style={{width:9,height:9,borderRadius:3,background:C[i],flexShrink:0}}/>
                <span style={{fontSize:"0.73rem",color:"#334155",fontWeight:600}}>{d.name}</span>
              </div>
              <span style={{fontSize:"0.78rem",fontWeight:800,color:"#0f172a"}}>{d.value}%</span>
            </div>
          ))}
        </div>
        <div style={{background:"#fff",borderRadius:16,padding:16,boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <Icon name="pie" size={14} color="#3b82f6"/>
            <span style={{fontWeight:800,fontSize:"0.82rem",color:"#0f172a"}}>Income Split</span>
          </div>
          <ResponsiveContainer width="100%" height={95}>
            <PieChart><Pie data={incD} cx="50%" cy="50%" innerRadius={26} outerRadius={42} dataKey="value" paddingAngle={3}>{incD.map((_,i)=><Cell key={i} fill={C[i]}/>)}</Pie><Tooltip content={<Tip/>}/></PieChart>
          </ResponsiveContainer>
          {incD.map((d,i)=>(<div key={d.name} style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}><div style={{width:8,height:8,borderRadius:2,background:C[i]}}/><span style={{fontSize:"0.63rem",color:"#64748b",fontWeight:600}}>{d.name}</span></div>))}
        </div>
      </div>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
const PER=5;
export default function App(){
  const [user,   setUser]  =useState(null);
  const [data,   setData]  =useState(getData);
  const [search, setSrch]  =useState("");
  const [ageF,   setAgeF]  =useState("All");
  const [incF,   setIncF]  =useState("All");
  const [regF,   setRegF]  =useState("All");
  const [page,   setPage]  =useState(1);
  const [modal,  setModal] =useState(null);
  const [target, setTarget]=useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [toast,  setToast] =useState(null); // {msg,type}
  const [menu,   setMenu]  =useState(false);
  const [tab,    setTab]   =useState("table");

  // collapse any open row when page or filters change
  useEffect(()=>{ setExpandedId(null); },[page, ageF, incF, regF, search]);

  useEffect(()=>{saveData(data);},[data]);
  const pop=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),2400);};
  const nid=()=>data.length?Math.max(...data.map(d=>d.id))+1:1;

  const filtered=useMemo(()=>data.filter(r=>{
    const q=search.toLowerCase();
    if(q&&![r.name,r.age,r.income,r.purchase,r.spend,r.country].some(v=>String(v).toLowerCase().includes(q))) return false;
    if(ageF!=="All"&&getAgeLabel(r.age)!==ageF) return false;
    if(incF!=="All"&&getIncomeLabel(r.income)!==incF) return false;
    if(regF!=="All"&&getRegion(r.country)!==regF) return false;
    return true;
  }),[data,search,ageF,incF,regF]);

  const pages=Math.max(1,Math.ceil(filtered.length/PER));
  const paged=filtered.slice((page-1)*PER,page*PER);

  // swipe triggers immediate delete dialog (after row flies away)
  const handleSwipeDelete=row=>{setTarget(row);setModal("delete");};
  const doAdd  =f=>{setData(p=>[...p,{...f,id:nid()}]);setModal(null);pop("Record added");};
  const doEdit =f=>{setData(p=>p.map(r=>r.id===target.id?{...f,id:r.id}:r));setModal(null);pop("Record updated");};
  const doDel  =()=>{setData(p=>p.filter(r=>r.id!==target.id));setModal(null);setTarget(null);pop("Record deleted","del");};

  if(!user) return(
    <div style={{fontFamily:"'DM Sans','Inter','Segoe UI',sans-serif"}}>
      <style>{`*{box-sizing:border-box}body{margin:0}`}</style>
      <Login onLogin={setUser}/>
    </div>
  );

  const isGuest=user.role==="guest";

  return(
    <div style={{fontFamily:"'DM Sans','Inter','Segoe UI',sans-serif",background:"#f0f4f8",minHeight:"100vh"}}>
      <style>{`*{box-sizing:border-box}body{margin:0}input,select,button{font-family:inherit}::-webkit-scrollbar{display:none}`}</style>

      {/* Toast */}
      {toast&&(
        <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",zIndex:300,background:toast.type==="del"?"#dc2626":"#1e293b",color:"#fff",padding:"10px 18px",borderRadius:10,fontWeight:600,fontSize:"0.84rem",boxShadow:"0 4px 16px rgba(0,0,0,0.22)",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:7,animation:"fadeUp .2s ease"}}>
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
          <Icon name={toast.type==="del"?"trash":"check"} size={14} color="#fff"/>{toast.msg}
        </div>
      )}

      <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",background:"#f0f4f8"}}>

        {/* Header */}
        <div style={{background:"linear-gradient(90deg,#2563eb,#3b82f6)",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:40,boxShadow:"0 2px 16px rgba(37,99,235,0.4)"}}>
          <button onClick={()=>setMenu(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",padding:6,borderRadius:8}}><Icon name="menu" size={20} color="#fff"/></button>
          <div style={{color:"#fff",fontWeight:800,fontSize:"0.98rem",letterSpacing:"-0.01em"}}>Data Mining Dashboard</div>
          <button onClick={()=>setMenu(o=>!o)} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="user" size={18} color="#fff"/></button>
        </div>

        {/* Side menu */}
        {menu&&(
          <div style={{position:"fixed",inset:0,zIndex:90}} onClick={()=>setMenu(false)}>
            <div style={{position:"absolute",top:0,left:0,width:235,height:"100%",background:"#fff",boxShadow:"4px 0 30px rgba(0,0,0,0.12)",display:"flex",flexDirection:"column",animation:"slideR .2s ease"}} onClick={e=>e.stopPropagation()}>
              <style>{`@keyframes slideR{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>
              <div style={{padding:"28px 20px 20px",background:"linear-gradient(135deg,#2563eb,#3b82f6)",flexShrink:0}}>
                <div style={{width:46,height:46,borderRadius:13,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Icon name="user" size={22} color="#fff"/></div>
                <div style={{fontWeight:800,fontSize:"0.95rem",color:"#fff"}}>{user.name}</div>
                <div style={{fontSize:"0.72rem",color:"#bfdbfe",marginTop:2,fontWeight:500}}>{isGuest?"Guest Demo":user.email}</div>
              </div>
              <div style={{flex:1,padding:"12px 0"}}>
                {[["chart","Dashboard","table"],["pie","Analytics","charts"]].map(([ic,lb,id])=>(
                  <div key={id} onClick={()=>{setTab(id);setMenu(false);}}
                    style={{padding:"13px 20px",display:"flex",alignItems:"center",gap:11,cursor:"pointer",background:tab===id?"#eff6ff":"transparent",borderLeft:tab===id?"3px solid #3b82f6":"3px solid transparent"}}>
                    <Icon name={ic} size={17} color={tab===id?"#3b82f6":"#64748b"}/>
                    <span style={{fontWeight:700,fontSize:"0.87rem",color:tab===id?"#3b82f6":"#374151"}}>{lb}</span>
                  </div>
                ))}
              </div>
              <div style={{padding:"16px 20px",borderTop:"1px solid #f1f5f9"}}>
                <button onClick={()=>{setUser(null);setMenu(false);}} style={{width:"100%",padding:"11px",borderRadius:10,border:"1.5px solid #fecaca",background:"#fff7f7",color:"#dc2626",fontWeight:700,fontSize:"0.84rem",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                  <Icon name="logout" size={15} color="#dc2626"/> Logout
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{padding:14}}>

          {/* Search */}
          <div style={{position:"relative",marginBottom:11}}>
            <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={16} color="#94a3b8"/></div>
            <input value={search} onChange={e=>{setSrch(e.target.value);setPage(1);}} placeholder="Search records…"
              style={{width:"100%",padding:"11px 14px 11px 38px",borderRadius:12,border:"none",background:"#fff",fontSize:"0.88rem",outline:"none",boxShadow:"0 2px 8px rgba(0,0,0,0.07)",color:"#1e293b",fontFamily:"inherit",fontWeight:500}}/>
          </div>

          {/* Filters */}
          <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4,marginBottom:13,scrollbarWidth:"none"}}>
            <FilterPill label="Age Group"    iconName="user"  opts={["Young","Adult","Senior","Elder"]} value={ageF} onChange={v=>{setAgeF(v);setPage(1);}}/>
            <FilterPill label="Income Level" iconName="money" opts={["High","Mid","Low"]}               value={incF} onChange={v=>{setIncF(v);setPage(1);}}/>
            <FilterPill label="Region"       iconName="globe" opts={["International","Local"]}          value={regF} onChange={v=>{setRegF(v);setPage(1);}}/>
          </div>

          {tab==="table"?(
            <>
              {/* Stats */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:13}}>
                {[
                  {icon:"records",lbl:"Records",  val:data.length},
                  {icon:"money",  lbl:"Avg Income",val:"₱"+(data.length?Math.round(data.reduce((a,r)=>a+Number(r.income||0),0)/data.length).toLocaleString():0)},
                  {icon:"map",    lbl:"Countries", val:new Set(data.map(r=>r.country)).size},
                ].map(s=>(
                  <div key={s.lbl} style={{background:"#fff",borderRadius:14,padding:"13px 10px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:6}}><Icon name={s.icon} size={18} color="#3b82f6"/></div>
                    <div style={{fontWeight:800,fontSize:"1.05rem",color:"#0f172a"}}>{s.val}</div>
                    <div style={{fontSize:"0.65rem",fontWeight:600,color:"#94a3b8",marginTop:2}}>{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Swipe hint */}
              {!isGuest&&(
                <div style={{background:"#fff",border:"1px solid #e0e7ff",borderRadius:10,padding:"9px 12px",marginBottom:13,display:"flex",alignItems:"center",gap:9}}>
                  <Icon name="swipe" size={16} color="#4f46e5"/>
                  <span style={{fontSize:"0.75rem",color:"#4338ca",fontWeight:600}}>Swipe any row <strong>right</strong> to delete</span>
                </div>
              )}

              {/* Table */}
              <div style={{background:"#fff",borderRadius:16,boxShadow:"0 2px 10px rgba(0,0,0,0.07)",overflow:"hidden",marginBottom:13}}>
                <div style={{display:"grid",gridTemplateColumns:"minmax(0,2fr) minmax(0,1.6fr) minmax(0,1.1fr) 20px",padding:"10px 14px",background:"#f8fafc",borderBottom:"1px solid #f1f5f9"}}>
                  {[{h:"Name",s:"Product · Region"},{h:"Age",s:"Income Level"},{h:"Spend",s:"Country"},{h:"",s:""}].map((c,i)=>(
                    <div key={i}>
                      <div style={{fontSize:"0.72rem",fontWeight:800,color:"#475569",letterSpacing:"0.01em"}}>{c.h}</div>
                      {c.s&&<div style={{fontSize:"0.6rem",color:"#94a3b8",fontWeight:500,marginTop:1}}>{c.s}</div>}
                    </div>
                  ))}
                </div>

                {paged.length===0
                  ?<div style={{padding:36,textAlign:"center"}}>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:10,opacity:0.35}}><Icon name="records" size={36} color="#94a3b8"/></div>
                    <div style={{color:"#94a3b8",fontWeight:700,fontSize:"0.9rem"}}>No records found</div>
                  </div>
                  :paged.map((row,i)=>(
                    <SwipeRow key={row.id} row={row} isLast={i===paged.length-1} isGuest={isGuest}
                      expanded={expandedId === row.id}
                      onToggle={setExpandedId}
                      onEdit={r=>{setTarget(r);setModal("edit");}}
                      onSwipeDelete={handleSwipeDelete}/>
                  ))
                }

                {/* Pagination */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:12,borderTop:"1px solid #f1f5f9"}}>
                  <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                    style={{width:30,height:30,borderRadius:8,border:"1.5px solid #e2e8f0",background:"#fff",cursor:page===1?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:page===1?0.4:1}}>
                    <Icon name="chevron" size={14} color="#374151" style={{transform:"rotate(90deg)"}}/>
                  </button>
                  {Array.from({length:pages},(_,i)=>i+1).map(p=>(
                    <button key={p} onClick={()=>setPage(p)}
                      style={{width:30,height:30,borderRadius:8,border:"1.5px solid",borderColor:page===p?"#3b82f6":"#e2e8f0",background:page===p?"#3b82f6":"#fff",color:page===p?"#fff":"#374151",fontWeight:700,fontSize:"0.78rem",cursor:"pointer",fontFamily:"inherit"}}>{p}</button>
                  ))}
                  <button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages}
                    style={{width:30,height:30,borderRadius:8,border:"1.5px solid #e2e8f0",background:"#fff",cursor:page===pages?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:page===pages?0.4:1}}>
                    <Icon name="chevron" size={14} color="#374151" style={{transform:"rotate(-90deg)"}}/>
                  </button>
                </div>
              </div>

              <button onClick={()=>setModal("add")}
                style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"#3b82f6",color:"#fff",fontWeight:700,fontSize:"0.9rem",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 14px rgba(59,130,246,0.35)"}}>
                <Icon name="plus" size={18} color="#fff"/> Add Data
              </button>
            </>
          ):(
            <Charts data={data}/>
          )}
        </div>
      </div>

      {/* Add */}
      <Modal open={modal==="add"} title="Add New Record" onClose={()=>setModal(null)}>
        <RecordForm onSave={doAdd} onCancel={()=>setModal(null)}/>
      </Modal>

      {/* Edit */}
      <Modal open={modal==="edit"} title="Edit Record" onClose={()=>setModal(null)}>
        {target&&<RecordForm initial={target} onSave={doEdit} onCancel={()=>setModal(null)}/>}
      </Modal>

      {/* Delete — Telegram-style dialog */}
      <Modal open={modal==="delete"} title="Delete Record" onClose={()=>{setModal(null);setTarget(null);}} center width={340}>
        <DeleteDialog row={target} onConfirm={doDel} onCancel={()=>{setModal(null);setTarget(null);}}/>
      </Modal>
    </div>
  );
}
