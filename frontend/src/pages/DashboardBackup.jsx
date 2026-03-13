import { useState, useRef, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Legend
} from "recharts";

/* ─── Data ─────────────────────────────────────────────────── */
const revenueData = [
  { m: "Jan", rev: 30, exp: 25, profit: 60 }, { m: "Feb", rev: 60, exp: 80, profit: 90 },
  { m: "Mar", rev: 90, exp: 110, profit: 70 }, { m: "Apr", rev: 70, exp: 90, profit: 100 },
  { m: "May", rev: 110, exp: 130, profit: 80 }, { m: "Jun", rev: 130, exp: 120, profit: 120 },
  { m: "Jul", rev: 120, exp: 110, profit: 110 }, { m: "Aug", rev: 140, exp: 130, profit: 130 },
  { m: "Sep", rev: 100, exp: 110, profit: 90 }, { m: "Oct", rev: 150, exp: 120, profit: 140 },
  { m: "Nov", rev: 160, exp: 140, profit: 150 },
];
const radarData = [
  { s: "2018", R: 120, D: 90, F: 60 }, { s: "2019", R: 80, D: 110, F: 30 },
  { s: "2020", R: 60, D: 70, F: 50 }, { s: "2021", R: 90, D: 60, F: 80 },
  { s: "2022", R: 50, D: 80, F: 40 }, { s: "2023", R: 100, D: 90, F: 70 },
];
const contacts = [
  { name: "Doris Nixon", phone: "38855-02258", loc: "Edinburgh", score: 61, date: "2023/04/25" },
  { name: "Garrett Ross", phone: "12546-78956", loc: "Tokyo", score: 63, date: "2023/07/25" },
  { name: "Ashton Cox", phone: "15458-12546", loc: "San Francisco", score: 66, date: "2023/01/12" },
  { name: "Cedric Kelly", phone: "12456-75968", loc: "Edinburgh", score: 22, date: "2023/03/29" },
  { name: "Airi Satou", phone: "45398-74398", loc: "Tokyo", score: 33, date: "2023/11/28" },
  { name: "Brielle W.", phone: "12348-97436", loc: "New York", score: 61, date: "2023/12/02" },
  { name: "Herrod Chandler", phone: "46985-41369", loc: "Tokyo", score: 59, date: "2023/08/06" },
];
const userDeals = [
  { name: "Austin", role: "MD", amount: "₹49.99", bg: "#e8f0fe", col: "#4285f4" },
  { name: "Thomas", role: "CEO", amount: "₹90.99", bg: "#f3e8fd", col: "#9c27b0" },
  { name: "Chase", role: "MD", amount: "₹135.50", bg: "#e6f4ea", col: "#34a853" },
  { name: "Xavier", role: "HR", amount: "₹60.30", bg: "#fff3e0", col: "#f57c00" },
  { name: "Brody", role: "HR", amount: "₹70.20", bg: "#fce8e6", col: "#e91e63" },
  { name: "Jaxon", role: "PMO", amount: "₹67.50", bg: "#e0f7fa", col: "#00bcd4" },
];
const tasks = [
  { title: "Slips through cracks", desc: "If someone cracks, they lose control of their emotions because they are under a lot of pressure.", date: "10 Mar, 2023", done: false },
  { title: "Sales campaign", desc: "Invite is a verb and invitation is the noun. A meeting invite should be a meeting invitation.", date: "20 Sep, 2023", done: true },
  { title: "Creating an account profile", desc: "A profile essay has three main parts: the introduction, body, and conclusion.", date: "05 Feb, 2023", done: false },
  { title: "Change email option", desc: "If people have you saved as something else in their contacts, that's what they'll see.", date: "30 Jan, 2023", done: true },
  { title: "Additional Calendar", desc: "Employees can use shared calendars to manage their own assignments and appointments.", date: "09 Jan, 2023", done: false },
];

/* ─── Nav config ────────────────────────────────────────────── */
const NAV = [
  { id: "dashboard", label: "Dashboard", section: "Dashboard & Apps",
    sub: [{ label: "Dashboard 1" }, { label: "Dashboard 2" }, { label: "Dashboard 3" }, { label: "Dashboard 4", active: true }, { label: "Dashboard 5", badge: "New" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" fill={active ? "#4285f4" : "#b0bec5"} />
        <rect x="14" y="3" width="7" height="7" rx="1.5" fill={active ? "#4285f4" : "#b0bec5"} />
        <rect x="3" y="14" width="7" height="7" rx="1.5" fill={active ? "#4285f4" : "#b0bec5"} />
        <rect x="14" y="14" width="7" height="7" rx="1.5" fill={active ? "#4285f4" : "#b0bec5"} />
      </svg>
    ),
  },
  { id: "apps", label: "Apps", section: "Dashboard & Apps",
    sub: [{ label: "Calendar" }, { label: "Contact List" }, { label: "Chat" }, { label: "Todo" }, { label: "Mailbox" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        {[5,12,19].map(cx => [5,12,19].map(cy => (
          <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="2" fill={active ? "#4285f4" : "#b0bec5"} />
        )))}
      </svg>
    ),
  },
  { id: "ui", label: "UI Elements", section: "Components & UI",
    sub: [{ label: "Grid System" }, { label: "Badges" }, { label: "Buttons" }, { label: "Typography" }, { label: "Progress Bars" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? "#4285f4" : "#b0bec5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  { id: "forms", label: "Forms & Tables", section: "Components & UI",
    sub: [{ label: "Form Elements" }, { label: "Form Layout" }, { label: "Simple Tables" }, { label: "Data Tables" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? "#4285f4" : "#b0bec5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
  },
  { id: "charts", label: "Charts", section: "Components & UI",
    sub: [{ label: "ChartJS" }, { label: "Morris" }, { label: "Peity" }, { label: "Line Chart" }, { label: "Bar Chart" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? "#4285f4" : "#b0bec5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
  { id: "widgets", label: "Widgets", section: "Collections",
    sub: [{ label: "Blog" }, { label: "Chart" }, { label: "List" }, { label: "Social" }, { label: "Weather" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? "#4285f4" : "#b0bec5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      </svg>
    ),
  },
  { id: "ecom", label: "Ecommerce", section: "Collections",
    sub: [{ label: "Products" }, { label: "Products Cart" }, { label: "Product Orders" }, { label: "Product Details" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? "#4285f4" : "#b0bec5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  { id: "pages", label: "Pages", section: "Collections",
    sub: [{ label: "Invoice" }, { label: "User Profile" }, { label: "FAQs" }, { label: "Gallery" }, { label: "Pricing" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? "#4285f4" : "#b0bec5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  { id: "auth", label: "Authentication", section: "Login & Error",
    sub: [{ label: "Login" }, { label: "Register" }, { label: "Lockscreen" }, { label: "Recover password" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? "#4285f4" : "#b0bec5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
  },
  { id: "chat", label: "Messages", section: "Login & Error",
    sub: [{ label: "Inbox" }, { label: "Compose" }, { label: "Sent" }],
    renderIcon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? "#4285f4" : "#b0bec5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */
const avatarPalette = [
  { bg: "#e8f0fe", col: "#4285f4" }, { bg: "#f3e8fd", col: "#9c27b0" },
  { bg: "#e6f4ea", col: "#34a853" }, { bg: "#fff3e0", col: "#f57c00" },
  { bg: "#fce8e6", col: "#ea4335" }, { bg: "#e0f7fa", col: "#00bcd4" },
  { bg: "#f3e8fd", col: "#673ab7" },
];
function ScoreBadge({ score }) {
  const [bg, col] = score >= 60 ? ["#e6f4ea","#34a853"] : score >= 40 ? ["#e8f0fe","#4285f4"] : ["#fce8e6","#ea4335"];
  return <span style={{ background: bg, color: col, fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>{score}</span>;
}
function Btn({ children, style, ...p }) {
  return <button style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "'Nunito',sans-serif", ...style }} {...p}>{children}</button>;
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function App() {
  const [activeId, setActiveId] = useState("dashboard");
  const [flyout, setFlyout] = useState("dashboard");
  const [revTab, setRevTab] = useState("1Y");
  const [actTab, setActTab] = useState("Today");
  const [taskTab, setTaskTab] = useState("Today");
  const [done, setDone] = useState(tasks.map(t => t.done));
  const [notif, setNotif] = useState(false);
  const [prof, setProf] = useState(false);
  const flyRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (flyRef.current && !flyRef.current.contains(e.target)) setFlyout(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const STRIP = 50;
  const PANEL = 220;
  const leftOffset = flyout ? STRIP + PANEL : STRIP;

  /* tiny reusable topbar icon button */
  const TopBtn = ({ children, onClick, badge }) => (
    <Btn onClick={onClick} style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", color: "#5a6a8a" }}
      onMouseEnter={e => e.currentTarget.style.background = "#f5f6fa"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
      {children}
      {badge && <span style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, background: "#ff4757", borderRadius: "50%", border: "2px solid #fff" }} />}
    </Btn>
  );

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: "#f5f6fa", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#dde3ec;border-radius:4px}
        @keyframes flyIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes cardUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .card-up{animation:cardUp 0.4s ease-out both}
        tr:hover td{background:#f8f9ff!important}
      `}</style>

      {/* ══════════════ SIDEBAR ══════════════ */}
      <div ref={flyRef} style={{ position: "fixed", top: 0, left: 0, height: "100%", zIndex: 200, display: "flex" }}>

        {/* Icon strip — white, 50px */}
        <div style={{
          width: STRIP, background: "#fff",
          borderRight: "1px solid #eef0f4",
          boxShadow: "2px 0 6px rgba(0,0,0,0.04)",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          {/* Logo mark */}
          <div style={{ height: 56, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #eef0f4" }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#4285f4,#1a56db)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
              </svg>
            </div>
          </div>

          {/* Nav icons */}
          <div style={{ flex: 1, width: "100%", overflowY: "auto", paddingTop: 6, paddingBottom: 6 }}>
            {NAV.map((item) => {
              const isActive = activeId === item.id;
              const isFlyout = flyout === item.id;
              return (
                <button key={item.id} title={item.label}
                  onClick={() => { setActiveId(item.id); setFlyout(isFlyout ? null : item.id); setNotif(false); setProf(false); }}
                  style={{
                    width: "100%", height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                    background: "transparent", border: "none", cursor: "pointer", position: "relative",
                    borderLeft: isActive ? "3px solid #4285f4" : "3px solid transparent",
                    transition: "border-color 0.15s",
                  }}>
                  {isActive && (
                    <div style={{ position: "absolute", inset: "4px 5px 4px 7px", background: "#f0f5ff", borderRadius: 8, pointerEvents: "none" }} />
                  )}
                  <span style={{ position: "relative", zIndex: 1, display: "flex" }}>
                    {item.renderIcon(isActive)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom utils */}
          <div style={{ paddingBottom: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            {[
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b0bec5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b0bec5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
            ].map((svg, i) => (
              <button key={i} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f5f6fa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                {svg}
              </button>
            ))}
          </div>
        </div>

        {/* Flyout panel */}
        {flyout && (() => {
          const item = NAV.find(n => n.id === flyout);
          return (
            <div style={{
              width: PANEL, background: "#fff",
              borderRight: "1px solid #eef0f4",
              boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
              display: "flex", flexDirection: "column",
              animation: "flyIn 0.18s ease-out",
              overflow: "hidden",
            }}>
              {/* Panel header */}
              <div style={{ height: 56, padding: "0 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #eef0f4", flexShrink: 0 }}>
                <span style={{ display: "flex", opacity: 0.9 }}>{item.renderIcon(true)}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#1e3050" }}>{item.label}</span>
              </div>
              {/* Section label */}
              <div style={{ padding: "14px 18px 4px", fontSize: 9.5, fontWeight: 800, color: "#b0bec5", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {item.section}
              </div>
              {/* Sub items */}
              <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
                {item.sub.map((s) => (
                  <button key={s.label}
                    style={{
                      width: "100%", padding: "9px 18px 9px 26px",
                      display: "flex", alignItems: "center", gap: 10,
                      background: "transparent", border: "none", cursor: "pointer",
                      fontFamily: "'Nunito',sans-serif", fontSize: 13,
                      fontWeight: s.active ? 700 : 500,
                      color: s.active ? "#4285f4" : "#5a6a8a",
                      textAlign: "left", transition: "all 0.12s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#f5f7ff"; if (!s.active) e.currentTarget.style.color = "#1e3050"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = s.active ? "#4285f4" : "#5a6a8a"; }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.active ? "#4285f4" : "#cfd8e3", flexShrink: 0, transition: "background 0.12s" }} />
                    {s.label}
                    {s.badge && (
                      <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 800, background: "#ff4757", color: "#fff", padding: "2px 7px", borderRadius: 20 }}>
                        {s.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ══════════════ TOP BAR ══════════════ */}
      <div style={{
        position: "fixed", top: 0, right: 0, height: 56,
        left: leftOffset, background: "#fff",
        borderBottom: "1px solid #eef0f4",
        display: "flex", alignItems: "center", padding: "0 16px", gap: 6,
        zIndex: 150, boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        transition: "left 0.2s ease",
      }}>
        {/* Hamburger */}
        <TopBtn onClick={() => setFlyout(flyout ? null : activeId)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </TopBtn>

        {/* 3 quick-action icons (matching screenshot) */}
        {[
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>,
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
        ].map((svg, i) => <TopBtn key={i}>{svg}</TopBtn>)}

        <div style={{ flex: 1 }} />

        {/* Fullscreen */}
        <TopBtn>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3"/>
          </svg>
        </TopBtn>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", background: "#f5f6fa", border: "1px solid #eef0f4", borderRadius: 8, padding: "0 12px", height: 34, gap: 8, width: 200 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b0bec5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input placeholder="Search" style={{ border: "none", background: "transparent", outline: "none", fontSize: 12, color: "#5a6a8a", width: "100%", fontFamily: "'Nunito',sans-serif" }} />
        </div>

        {/* Bell */}
        <div style={{ position: "relative" }}>
          <TopBtn badge onClick={() => { setNotif(!notif); setProf(false); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </TopBtn>
          {notif && (
            <div style={{ position: "absolute", right: 0, top: 42, width: 290, background: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: "1px solid #eef0f4", animation: "dropIn 0.15s ease-out", zIndex: 400 }}>
              <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eef0f4" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#1e3050" }}>Notifications</span>
                <Btn style={{ fontSize: 11, color: "#4285f4", fontWeight: 700 }}>Clear All</Btn>
              </div>
              {["Curabitur id eros quis nunc suscipit blandit.", "Duis malesuada justo eu sapien elementum.", "Donec at nisi sit amet tortor commodo.", "In gravida mauris et nisi", "Praesent eu lacus in libero dictum.", "Nunc fringilla lorem"].map((n, i) => (
                <div key={i} style={{ padding: "9px 16px", fontSize: 11.5, color: "#5a6a8a", lineHeight: 1.5, borderBottom: "1px solid #f8f9ff", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8f9ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>{n}</div>
              ))}
              <div style={{ padding: "10px 16px", textAlign: "center" }}>
                <Btn style={{ fontSize: 12, color: "#4285f4", fontWeight: 700 }}>View all</Btn>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <Btn onClick={() => { setProf(!prof); setNotif(false); }}
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 6px", borderRadius: 8 }}
            onMouseEnter={e => e.currentTarget.style.background = "#f5f6fa"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#4285f4,#9c27b0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>JD</span>
            </div>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#b0bec5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </Btn>
          {prof && (
            <div style={{ position: "absolute", right: 0, top: 44, width: 155, background: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: "1px solid #eef0f4", animation: "dropIn 0.15s ease-out", zIndex: 400, overflow: "hidden" }}>
              {[["👤","Profile"],["💼","My Wallet"],["⚙️","Settings"]].map(([em,lb]) => (
                <Btn key={lb} style={{ width: "100%", padding: "9px 14px", display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "#5a6a8a", fontWeight: 500 }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8f9ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <span>{em}</span>{lb}
                </Btn>
              ))}
              <div style={{ borderTop: "1px solid #eef0f4" }}>
                <Btn style={{ width: "100%", padding: "9px 14px", display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "#ff4757", fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <span>🚪</span>Logout
                </Btn>
              </div>
            </div>
          )}
        </div>

        {/* Right panel toggle */}
        <TopBtn>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </TopBtn>
      </div>

      {/* ══════════════ CONTENT ══════════════ */}
      <div style={{ marginLeft: leftOffset, paddingTop: 56, minHeight: "100vh", transition: "margin-left 0.2s ease" }}>
        <div style={{ padding: "22px 20px" }}>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
            {[
              { label: "Total Projects", val: "80", pct: "4.65%", accent: "#4285f4", bg: "#e8f0fe", bar: "30%",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-kanban-icon lucide-folder-kanban"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/></svg>},
              { label: "Total Tasks", val: "1042", pct: "2.65%", accent: "#34a853", bg: "#e6f4ea", bar: "55%",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34a853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M6 20V10M12 20V4M18 20v-6"/></svg> },
              { label: "Total Employees", val: "90", pct: "7.65%", accent: "#35eaa5", bg: "#fce8e6", bar: "70%",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>},
              { label: "Projects Completed", val: "62", pct: "6.65%", accent: "#00bcd4", bg: "#e0f7fa", bar: "85%",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg> },
            ].map((c, i) => (
              <div key={c.label} className="card-up" style={{ animationDelay: `${i * 70}ms`, background: "#fff", borderRadius: 12, padding: "18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0f2f8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 10.5, color: "#b0bec5", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>{c.label}</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: "#1e3050", lineHeight: 1 }}>{c.val}</div>
                  </div>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <span style={{ background: "#e6f4ea", color: "#34a853", fontSize: 10.5, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>▲ {c.pct}</span>
                  <span style={{ fontSize: 10.5, color: "#b0bec5" }}>last month</span>
                </div>
                <div style={{ height: 3, background: "#f0f2f8", borderRadius: 3 }}>
                  <div style={{ width: c.bar, height: "100%", background: c.accent, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Revenue + Radar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, marginBottom: 20 }}>
            {/* Revenue */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0f2f8" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#1e3050" }}>Revenue Overview</span>
                <div style={{ display: "flex", gap: 3 }}>
                  {["ALL","1M","6M","1Y"].map(t => (
                    <Btn key={t} onClick={() => setRevTab(t)} style={{
                      padding: "4px 11px", borderRadius: 6, fontSize: 11, fontWeight: 700,
                      background: revTab === t ? "#4285f4" : "transparent",
                      color: revTab === t ? "#fff" : "#b0bec5",
                      transition: "all 0.15s",
                    }}>{t}</Btn>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <LineChart data={revenueData} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#b0bec5" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#b0bec5" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #eef0f4", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
                  <Line type="monotone" dataKey="rev" stroke="#4285f4" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="exp" stroke="#cfd8e3" strokeWidth={2} dot={false} strokeDasharray="5 4" />
                  <Line type="monotone" dataKey="profit" stroke="#1a1a2e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              {/* Summary rows */}
              <div style={{ borderTop: "1px solid #f0f2f8", paddingTop: 13, display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  { dot: "#4285f4", label: "Projects", val: "68", pct: "5.29%", up: true },
                  { dot: "#cfd8e3", label: "Tasks", val: "37", pct: "4.52%", up: true },
                  { dot: "#1a1a2e", label: "Employees", val: "36", pct: "2.69%", up: true },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: r.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#5a6a8a", flex: 1 }}>{r.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1e3050", minWidth: 68 }}>{r.val}</span>
                    <span style={{ fontSize: 11, color: r.up ? "#34a853" : "#ea4335", fontWeight: 700 }}>
                      {r.up ? "▲" : "▼"} {r.pct} than last years
                    </span>
                    <Btn style={{ fontSize: 11, color: "#4285f4", fontWeight: 700 }}>View All →</Btn>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar */}
            <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0f2f8" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#1e3050" }}>Rate</span>
                <Btn style={{ fontSize: 19, color: "#b0bec5", lineHeight: 1 }}>···</Btn>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#eef0f4" />
                  <PolarAngleAxis dataKey="s" tick={{ fontSize: 11, fill: "#b0bec5" }} />
                  <PolarRadiusAxis tick={{ fontSize: 9, fill: "#b0bec5" }} />
                  <Radar name="In Progress" dataKey="R" stroke="#4285f4" fill="#4285f4" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Completed" dataKey="D" stroke="#1a1a2e" fill="#1a1a2e" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="To Do" dataKey="F" stroke="#eead20" fill="#ea4335" fillOpacity={0.13} strokeWidth={2} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 11, color: "#5a6a8a" }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #eef0f4" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Contacts + Mail + Activity */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 340px", gap: 16, marginBottom: 20 }}>
            {/* Contacts table */}
            <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0f2f8", overflow: "hidden" }}>
              <div style={{ padding: "13px 16px", borderBottom: "1px solid #f0f2f8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#1e3050" }}>Contacts</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {["↑↓","↓","🖨","⚙"].map((ic, i) => (
                    <button key={i} style={{ width: 25, height: 25, borderRadius: 5, border: "1px solid #eef0f4", background: "#fff", cursor: "pointer", fontSize: 11, color: "#b0bec5" }}>{ic}</button>
                  ))}
                </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#f8f9ff" }}>
                    {["Contact Name","Phone","Location","Score","Date"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#b0bec5", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #f0f2f8" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, i) => {
                    const p = avatarPalette[i % avatarPalette.length];
                    const initials = c.name.split(" ").map(w => w[0]).join("").slice(0, 2);
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #f8f9ff", cursor: "pointer" }}>
                        <td style={{ padding: "9px 12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: p.col, flexShrink: 0 }}>{initials}</div>
                            <span style={{ fontWeight: 700, color: "#1e3050" }}>{c.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "9px 12px", color: "#5a6a8a" }}>{c.phone}</td>
                        <td style={{ padding: "9px 12px", color: "#5a6a8a" }}>{c.loc}</td>
                        <td style={{ padding: "9px 12px" }}><ScoreBadge score={c.score} /></td>
                        <td style={{ padding: "9px 12px", color: "#b0bec5" }}>{c.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mail */}
            <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0f2f8", overflow: "hidden" }}>
              <div style={{ padding: "13px 16px", borderBottom: "1px solid #f0f2f8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#1e3050" }}>Mail</span>
                <Btn style={{ fontSize: 19, color: "#b0bec5", lineHeight: 1 }}>···</Btn>
              </div>
              {[
                { from: "Tyler Anderson", preview: "Praesent tristique diam nec libero sagittis...", time: "Just now", unread: true, col: "#4285f4" },
                { from: "Luke Harrison", preview: "Cras tempor diam at malesuada hendrerit...", time: "33 min ago", unread: true, col: "#9c27b0" },
                { from: "Evan Mitchell", preview: "In posuere tortor vel feugiat commodo...", time: "42 min ago", unread: false, col: "#34a853" },
                { from: "Sophia Chen", preview: "Vivamus vel felis at odio vehicula porta...", time: "1 hr ago", unread: false, col: "#f57c00" },
                { from: "Marcus Wright", preview: "Duis lacinia neque in nisl facilisis...", time: "3 hr ago", unread: false, col: "#ea4335" },
                { from: "Anna Lee", preview: "Sed elementum enim vitae sapien laoreet...", time: "5 hr ago", unread: false, col: "#00bcd4" },
                { from: "James Park", preview: "Nullam eu justo vitae sapien gravida...", time: "1 day ago", unread: false, col: "#ff9800" },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderBottom: "1px solid #f8f9ff", cursor: "pointer", background: m.unread ? "#fafbff" : "transparent" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5f7ff"}
                  onMouseLeave={e => e.currentTarget.style.background = m.unread ? "#fafbff" : "transparent"}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: m.col + "22", color: m.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>
                    {m.from.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, fontWeight: m.unread ? 800 : 600, color: "#1e3050" }}>{m.from}</span>
                      <span style={{ fontSize: 10, color: "#b0bec5" }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#b0bec5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.preview}</div>
                  </div>
                  {m.unread && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4285f4", flexShrink: 0 }} />}
                </div>
              ))}
            </div>

            {/* Activity + User Deals stacked */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Activity */}
              <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0f2f8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#1e3050" }}>Activity</span>
                </div>
                <div style={{ display: "flex", gap: 2, background: "#f5f6fa", borderRadius: 8, padding: 3, marginBottom: 12 }}>
                  {["Today","Yesterday","Last week","Last month"].map(t => (
                    <Btn key={t} onClick={() => setActTab(t)} style={{
                      flex: 1, padding: "5px 0", borderRadius: 6, fontSize: 9.5, fontWeight: 700,
                      background: actTab === t ? "#fff" : "transparent",
                      color: actTab === t ? "#4285f4" : "#b0bec5",
                      boxShadow: actTab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      transition: "all 0.15s",
                    }}>{t.split(" ")[0]}</Btn>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {[
                    { e:"💰", t:"Payment from Austin", s:"2 min ago", bg:"#e8f0fe" },
                    { e:"👥", t:"Thomas joined project", s:"15 min ago", bg:"#f3e8fd" },
                    { e:"📄", t:"Q4 report generated", s:"1 hr ago", bg:"#e6f4ea" },
                    { e:"🛒", t:"New order from Xavier", s:"2 hr ago", bg:"#fff3e0" },
                    { e:"✉️", t:"3 new messages", s:"3 hr ago", bg:"#fce8e6" },
                  ].map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{a.e}</div>
                      <div>
                        <div style={{ fontSize: 12, color: "#1e3050", fontWeight: 600 }}>{a.t}</div>
                        <div style={{ fontSize: 10, color: "#b0bec5" }}>{a.s}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Deals */}
              <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0f2f8" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#1e3050", display: "block", marginBottom: 10 }}>User Deals</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                  {userDeals.map(u => (
                    <div key={u.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "9px 4px", borderRadius: 10, cursor: "pointer" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8f9ff"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: u.bg, color: u.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, marginBottom: 5 }}>
                        {u.name.slice(0,2).toUpperCase()}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3050" }}>{u.name}</div>
                      <div style={{ fontSize: 10, color: "#b0bec5" }}>{u.role}</div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: u.col, marginTop: 3 }}>{u.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0f2f8", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#1e3050" }}>Tasks List</span>
              <div style={{ display: "flex", gap: 2, background: "#f5f6fa", borderRadius: 8, padding: 3 }}>
                {["Today","Yesterday","Last week","Last month"].map(t => (
                  <Btn key={t} onClick={() => setTaskTab(t)} style={{
                    padding: "5px 11px", borderRadius: 6, fontSize: 11, fontWeight: 700,
                    background: taskTab === t ? "#fff" : "transparent",
                    color: taskTab === t ? "#4285f4" : "#b0bec5",
                    boxShadow: taskTab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s",
                  }}>{t}</Btn>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tasks.map((task, i) => (
                <div key={i} onClick={() => { const c = [...done]; c[i] = !c[i]; setDone(c); }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", borderRadius: 10, border: `1px solid ${done[i] ? "#f0f2f8" : "#e8f0fe"}`, background: done[i] ? "#fafafa" : "#fafbff", cursor: "pointer", transition: "all 0.15s" }}>
                  <div style={{ width: 17, height: 17, borderRadius: 5, border: `2px solid ${done[i] ? "#34a853" : "#cfd8e3"}`, background: done[i] ? "#34a853" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, transition: "all 0.15s" }}>
                    {done[i] && <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: done[i] ? "#b0bec5" : "#1e3050", textDecoration: done[i] ? "line-through" : "none" }}>{task.title}</div>
                    <div style={{ fontSize: 11, color: "#b0bec5", marginTop: 3, lineHeight: 1.5 }}>{task.desc}</div>
                    <div style={{ fontSize: 10.5, color: "#cfd8e3", marginTop: 5 }}>📅 {task.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#b0bec5", paddingBottom: 10 }}>
            <span>© 2024 Multipurpose Themes. All Rights Reserved.</span>
            <div style={{ display: "flex", gap: 16 }}>
              <Btn style={{ fontSize: 11, color: "#b0bec5" }}>FAQ</Btn>
              <Btn style={{ fontSize: 11, color: "#4285f4", fontWeight: 700 }}>Purchase Now</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
