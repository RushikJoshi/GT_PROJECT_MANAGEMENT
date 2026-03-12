import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, ChevronDown, ChevronRight, Bell, Settings, Search,
  Users, BarChart2, ShoppingBag, FileText, Mail, Calendar, CheckSquare,
  MessageSquare, Map, Grid, LogOut, User, Wallet, TrendingUp, TrendingDown,
  DollarSign, Briefcase, MoreHorizontal, Filter, Printer, Download, Upload,
  Star, Activity, Clock, X, Menu, ChevronLeft, ArrowUpRight, ArrowDownRight,
  Phone, MapPin, Zap, Package, PieChart, AlertCircle
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", income: 4200, expense: 2400 },
  { month: "Feb", income: 5800, expense: 3200 },
  { month: "Mar", income: 4100, expense: 2800 },
  { month: "Apr", income: 6700, expense: 3900 },
  { month: "May", income: 5200, expense: 2600 },
  { month: "Jun", income: 7800, expense: 4200 },
  { month: "Jul", income: 6100, expense: 3500 },
  { month: "Aug", income: 8400, expense: 4800 },
  { month: "Sep", income: 7200, expense: 3800 },
  { month: "Oct", income: 9100, expense: 5100 },
  { month: "Nov", income: 8300, expense: 4600 },
  { month: "Dec", income: 10200, expense: 5800 },
];

const contacts = [
  { name: "Doris Nixon", phone: "38855-02258", location: "Edinburgh", score: 61, date: "2023/04/25", avatar: "DN" },
  { name: "Garrett Ross", phone: "12546-78956", location: "Tokyo", score: 63, date: "2023/07/25", avatar: "GR" },
  { name: "Ashton Cox", phone: "15458-12546", location: "Francisco", score: 66, date: "2023/01/12", avatar: "AC" },
  { name: "Cedric Kelly", phone: "12456-75968", location: "Edinburgh", score: 22, date: "2023/03/29", avatar: "CK" },
  { name: "Airi Satou", phone: "45398-74398", location: "Tokyo", score: 33, date: "2023/11/28", avatar: "AS" },
  { name: "Brielle Williamson", phone: "12348-97436", location: "New York", score: 61, date: "2023/12/02", avatar: "BW" },
  { name: "Herrod Chandler", phone: "46985-41369", location: "Tokyo", score: 59, date: "2023/08/06", avatar: "HC" },
  { name: "Rhona Davidson", phone: "96348-63598", location: "Tokyo", score: 55, date: "2023/10/14", avatar: "RD" },
];

const userDeals = [
  { name: "Austin", role: "MD", amount: "$49.99", color: "bg-blue-500", initials: "AU" },
  { name: "Thomas", role: "CEO", amount: "$90.99", color: "bg-purple-500", initials: "TH" },
  { name: "Chase", role: "MD", amount: "$135.50", color: "bg-green-500", initials: "CH" },
  { name: "Xavier", role: "HR", amount: "$60.30", color: "bg-orange-500", initials: "XA" },
  { name: "Brody", role: "HR", amount: "$70.20", color: "bg-pink-500", initials: "BR" },
  { name: "Jaxon", role: "PMO", amount: "$67.50", color: "bg-cyan-500", initials: "JX" },
];

const tasks = [
  { title: "Slips through cracks", desc: "If someone cracks, they lose control of their emotions or actions because they are under a lot of pressure.", date: "10 Mar, 2023", done: false },
  { title: "Sales campaign", desc: "I will send you a meeting invite — invite is a verb and invitation is the noun.", date: "20 Sep, 2023", done: true },
  { title: "Creating an account profile", desc: "Like any other essay, a profile essay has three main parts — the introduction, body, and conclusion.", date: "05 Feb, 2023", done: false },
  { title: "Change email option", desc: "If people have you saved as something else in their contacts, that's the name they'll see.", date: "30 Jan, 2023", done: true },
  { title: "Additional Calendar", desc: "Employees can use shared calendars to manage their own assignments and appointments.", date: "09 Jan, 2023", done: false },
];

const navItems = [
  {
    section: "Dashboard & Apps",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", active: true, sub: ["Dashboard 1", "Dashboard 2", "Dashboard 3", "Dashboard 4", "Dashboard 5"] },
      { icon: Grid, label: "Apps", sub: ["Calendar", "Contact List", "Chat", "Todo", "Mailbox"] },
    ]
  },
  {
    section: "Components & UI",
    items: [
      { icon: Zap, label: "UI Elements", sub: ["Grid System", "Badges", "Buttons", "Progress Bars", "Typography"] },
      { icon: FileText, label: "Forms & Tables", sub: ["Form Elements", "Form Layout", "Simple Tables", "Data Tables"] },
      { icon: BarChart2, label: "Charts", sub: ["ChartJS", "Morris", "Peity", "Line Chart", "Bar Chart"] },
    ]
  },
  {
    section: "Collections",
    items: [
      { icon: Package, label: "Widgets", sub: ["Blog", "Chart", "List", "Social", "Weather"] },
      { icon: ShoppingBag, label: "Ecommerce", sub: ["Products", "Cart", "Orders", "Checkout"] },
      { icon: FileText, label: "Pages", sub: ["Invoice", "User Profile", "FAQs", "Gallery"] },
    ]
  },
  {
    section: "Login & Error",
    items: [
      { icon: User, label: "Authentication", sub: ["Login", "Register", "Lockscreen"] },
      { icon: AlertCircle, label: "Miscellaneous", sub: ["Error 404", "Error 500", "Maintenance"] },
    ]
  },
];

const notifications = [
  "Curabitur id eros quis nunc suscipit blandit.",
  "Duis malesuada justo eu sapien elementum.",
  "Donec at nisi sit amet tortor commodo porttitor.",
  "In gravida mauris et nisi",
  "Praesent eu lacus in libero dictum fermentum.",
  "Nunc fringilla lorem",
  "Nullam euismod dolor ut quam interdum.",
];

const avatarColors = [
  "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500",
  "bg-pink-500", "bg-cyan-500", "bg-red-500", "bg-indigo-500",
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, change, positive, color, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} flex-shrink-0`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-0.5">{value}</h3>
        <p className={`text-xs mt-1 flex items-center gap-1 font-medium ${positive ? "text-emerald-500" : "text-rose-500"}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {change}
        </p>
      </div>
    </div>
  );
}

function ScoreBadge({ score }) {
  const color = score >= 60 ? "bg-emerald-100 text-emerald-700" : score >= 40 ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{score}</span>;
}

function MiniSidebar({ expanded, setExpanded, activeNav, setActiveNav }) {
  const [openMenu, setOpenMenu] = useState("Dashboard");

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-30 flex transition-all duration-300 ease-in-out`}
      style={{ width: expanded ? "240px" : "64px" }}
    >
      {/* Icon strip */}
      <div className="w-16 flex-shrink-0 bg-[#1a2236] flex flex-col items-center py-0">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center w-full border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-black text-sm">N</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 py-3 w-full flex-1 overflow-y-auto overflow-x-hidden">
          {navItems.flatMap(s => s.items).map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.label); if (!expanded) setExpanded(true); setOpenMenu(item.label); }}
              title={item.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group relative
                ${activeNav === item.label ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40" : "text-gray-400 hover:bg-white/10 hover:text-white"}`}
            >
              <item.icon size={18} />
              {!expanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Bottom user */}
        <div className="pb-4 flex flex-col items-center gap-3">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all">
            <Settings size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">JD</span>
          </div>
        </div>
      </div>

      {/* Expanded panel */}
      <div className={`bg-[#202c44] flex flex-col overflow-hidden transition-all duration-300 ${expanded ? "w-44" : "w-0"}`}>
        <div className="h-16 flex items-center px-4 border-b border-white/10 flex-shrink-0">
          <span className="text-white font-bold text-lg tracking-tight">Novo</span>
          <span className="text-blue-400 font-bold text-lg">Admin</span>
          <button onClick={() => setExpanded(false)} className="ml-auto text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-thin">
          {navItems.map((section) => (
            <div key={section.section} className="mb-2">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold px-4 py-2">{section.section}</p>
              {section.items.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => { setActiveNav(item.label); setOpenMenu(openMenu === item.label ? "" : item.label); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-150 rounded-lg mx-1
                      ${activeNav === item.label ? "text-white bg-blue-600/20 font-semibold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                    style={{ width: "calc(100% - 8px)" }}
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon size={15} />
                      <span className="whitespace-nowrap text-xs">{item.label}</span>
                    </span>
                    {item.sub && (
                      <ChevronDown size={12} className={`transition-transform duration-200 flex-shrink-0 ${openMenu === item.label ? "rotate-180" : ""}`} />
                    )}
                  </button>
                  {item.sub && openMenu === item.label && (
                    <div className="ml-6 border-l border-white/10 pl-3 pb-1">
                      {item.sub.map((s) => (
                        <button key={s} className={`block w-full text-left text-xs py-1.5 px-2 rounded text-gray-500 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap ${s === "Dashboard 4" ? "text-blue-400" : ""}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function TopBar({ sidebarExpanded, setSidebarExpanded }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const left = sidebarExpanded ? "240px" : "64px";

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center px-5 z-20 shadow-sm transition-all duration-300"
      style={{ left }}
    >
      <button
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all mr-3"
      >
        <Menu size={18} />
      </button>

      {/* Search */}
      <div className={`relative hidden sm:flex items-center transition-all duration-300 ${searchFocus ? "w-72" : "w-52"}`}>
        <Search size={15} className="absolute left-3 text-gray-400" />
        <input
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          placeholder="Search..."
          className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h4 className="font-semibold text-gray-800 text-sm">Notifications</h4>
                <button className="text-xs text-blue-500 hover:text-blue-700 font-medium">Clear All</button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs ${avatarColors[i % avatarColors.length]}`}>
                        <Bell size={12} />
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{n}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 bg-gray-50 text-center">
                <button className="text-xs text-blue-500 font-semibold hover:text-blue-700">View all</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">JD</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-800 leading-none">John Doe</p>
              <p className="text-xs text-gray-400 mt-0.5">Admin</p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-fade-in">
              {[{ icon: User, label: "Profile" }, { icon: Wallet, label: "My Wallet" }, { icon: Settings, label: "Settings" }].map(({ icon: Icon, label }) => (
                <button key={label} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
                  <Icon size={15} />
                  {label}
                </button>
              ))}
              <div className="border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition-colors">
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function NovoDashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [revenueTab, setRevenueTab] = useState("ALL");
  const [activityTab, setActivityTab] = useState("Today");
  const [taskTab, setTaskTab] = useState("Today");
  const [taskDone, setTaskDone] = useState([false, true, false, true, false]);

  const contentLeft = sidebarExpanded ? "240px" : "64px";

  return (
    <div className="min-h-screen bg-[#f4f6fb] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Nunito', sans-serif; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.18s ease-out; }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .slide-up { animation: slideUp 0.5s ease-out forwards; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
      `}</style>

      <MiniSidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} activeNav={activeNav} setActiveNav={setActiveNav} />
      <TopBar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />

      {/* Main Content */}
      <main
        className="transition-all duration-300 pt-16 min-h-screen"
        style={{ marginLeft: contentLeft }}
      >
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 slide-up">
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome back, John! Here's what's happening.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <StatCard icon={DollarSign} label="Total Profit" value="$8,215" change="4.65% last month" positive color="bg-blue-500" delay={0} />
            <StatCard icon={TrendingUp} label="Average Income" value="$10,215" change="2.65% last month" positive color="bg-emerald-500" delay={100} />
            <StatCard icon={PieChart} label="Total Revenue" value="38.90%" change="7.65% last month" positive color="bg-purple-500" delay={200} />
            <StatCard icon={Briefcase} label="Total Deals" value="6,215" change="6.65% last month" positive color="bg-orange-500" delay={300} />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
            {/* Revenue Overview */}
            <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 text-sm">Revenue Overview</h3>
                <div className="flex gap-1">
                  {["ALL", "1M", "6M", "1Y"].map(t => (
                    <button
                      key={t}
                      onClick={() => setRevenueTab(t)}
                      className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all duration-200 ${revenueTab === t ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                  <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2.5} fill="url(#incomeGrad)" dot={false} />
                  <Area type="monotone" dataKey="expense" stroke="#a855f7" strokeWidth={2.5} fill="url(#expenseGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                {[
                  { label: "All Revenue", val: "$795.69k", change: "5.29% than last years", up: true },
                  { label: "All Expenses", val: "$415.37k", change: "4.52% than last years", up: false },
                  { label: "Profit", val: "3.6%", change: "2.69% than last years", up: true },
                ].map(r => (
                  <div key={r.label} className="text-center">
                    <p className="text-xs text-gray-500">{r.label}</p>
                    <p className="font-bold text-gray-800 text-sm mt-0.5">{r.val}</p>
                    <p className={`text-xs mt-0.5 font-medium ${r.up ? "text-emerald-500" : "text-rose-500"}`}>{r.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* User Deals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 text-sm">User Deals</h3>
                <button className="text-gray-400 hover:text-gray-600 transition-colors"><MoreHorizontal size={16} /></button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {userDeals.map((u, i) => (
                  <div
                    key={u.name}
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className={`w-10 h-10 rounded-xl ${u.color} flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-200`}>
                      {u.initials}
                    </div>
                    <p className="text-xs font-semibold text-gray-800 mt-2">{u.name}</p>
                    <p className="text-xs text-gray-400">{u.role}</p>
                    <p className="text-xs font-bold text-blue-600 mt-1">{u.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Contacts Table + Activity + Tasks */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
            {/* Contacts Table */}
            <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-sm">Contacts</h3>
                <div className="flex items-center gap-1">
                  {[{ icon: Upload, label: "Import" }, { icon: Download, label: "Export" }, { icon: Printer, label: "Print" }, { icon: Settings, label: "Settings" }].map(({ icon: Icon, label }) => (
                    <button key={label} title={label} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all">
                      <Icon size={13} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {["Contact Name", "Phone Number", "Location", "Score", "Date"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/40 cursor-pointer transition-colors duration-150">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                              {c.avatar}
                            </div>
                            <span className="font-semibold text-gray-800">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-gray-500">{c.phone}</td>
                        <td className="px-4 py-2.5">
                          <span className="flex items-center gap-1 text-gray-600">
                            <MapPin size={10} className="text-gray-400" />
                            {c.location}
                          </span>
                        </td>
                        <td className="px-4 py-2.5"><ScoreBadge score={c.score} /></td>
                        <td className="px-4 py-2.5 text-gray-500">{c.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 text-sm">Activity</h3>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
              </div>
              <div className="flex gap-1 mb-4 p-1 bg-gray-100 rounded-lg">
                {["Today", "Yesterday", "Last week", "Last month"].map(t => (
                  <button
                    key={t}
                    onClick={() => setActivityTab(t)}
                    className={`flex-1 text-xs py-1 rounded-md font-semibold transition-all duration-200 ${activityTab === t ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {t.split(" ")[0]}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { icon: DollarSign, color: "bg-blue-100 text-blue-600", text: "New payment received from Austin", time: "2 min ago" },
                  { icon: Users, color: "bg-purple-100 text-purple-600", text: "Thomas added to team project", time: "15 min ago" },
                  { icon: FileText, color: "bg-emerald-100 text-emerald-600", text: "Report generated for Q4 2023", time: "1 hr ago" },
                  { icon: ShoppingBag, color: "bg-orange-100 text-orange-600", text: "New order placed by Xavier", time: "2 hr ago" },
                  { icon: Mail, color: "bg-rose-100 text-rose-600", text: "3 new messages in inbox", time: "3 hr ago" },
                  { icon: Activity, color: "bg-cyan-100 text-cyan-600", text: "Server performance update", time: "5 hr ago" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.color}`}>
                      <a.icon size={13} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <Clock size={10} />{a.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Mail + Tasks */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
            {/* Mail Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                  <Mail size={15} className="text-blue-500" />
                  Mail
                  <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">7</span>
                </h3>
                <div className="flex items-center gap-1">
                  {[Upload, Download, Printer, Settings].map((Icon, i) => (
                    <button key={i} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-all">
                      <Icon size={13} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                {[
                  { from: "Tyler Anderson", subj: "Project update for Q4", preview: "Praesent tristique diam nec libero sagittis...", time: "Just now", unread: true, color: "bg-blue-500" },
                  { from: "Luke Harrison", subj: "Meeting rescheduled", preview: "Cras tempor diam at malesuada hendrerit...", time: "33 min ago", unread: true, color: "bg-purple-500" },
                  { from: "Evan Mitchell", subj: "Invoice attached", preview: "In posuere tortor vel feugiat commodo...", time: "42 min ago", unread: false, color: "bg-emerald-500" },
                  { from: "Sophia Chen", subj: "Design feedback needed", preview: "Vivamus vel felis at odio vehicula porta...", time: "1 hr ago", unread: false, color: "bg-orange-500" },
                  { from: "Marcus Wright", subj: "New feature request", preview: "Duis lacinia neque in nisl facilisis...", time: "3 hr ago", unread: false, color: "bg-rose-500" },
                ].map((m, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 border-b border-gray-50 hover:bg-blue-50/40 cursor-pointer transition-colors ${m.unread ? "bg-blue-50/20" : ""}`}>
                    <div className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {m.from.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs ${m.unread ? "font-bold text-gray-800" : "font-semibold text-gray-700"} truncate`}>{m.from}</p>
                        <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{m.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">{m.subj}</p>
                      <p className="text-xs text-gray-400 truncate">{m.preview}</p>
                    </div>
                    {m.unread && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                  <CheckSquare size={15} className="text-emerald-500" />
                  Tasks List
                </h3>
                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                  {["Today", "Yesterday", "Last week", "Last month"].map(t => (
                    <button
                      key={t}
                      onClick={() => setTaskTab(t)}
                      className={`text-xs px-2 py-1 rounded-md font-semibold transition-all duration-200 ${taskTab === t ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500"}`}
                    >
                      {t.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {tasks.map((task, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-sm ${taskDone[i] ? "border-gray-100 bg-gray-50/50" : "border-blue-100 bg-blue-50/30"}`}
                    onClick={() => { const copy = [...taskDone]; copy[i] = !copy[i]; setTaskDone(copy); }}>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${taskDone[i] ? "bg-emerald-500 border-emerald-500" : "border-gray-300 bg-white"}`}>
                      {taskDone[i] && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${taskDone[i] ? "line-through text-gray-400" : "text-gray-800"}`}>{task.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{task.desc}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock size={10} />{task.date}</p>
                    </div>
                    {!taskDone[i] && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2"></span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 pb-4">
            <span>© 2024 Novo Admin. All Rights Reserved.</span>
            <div className="flex gap-4">
              <button className="hover:text-gray-600 transition-colors">FAQ</button>
              <button className="hover:text-gray-600 transition-colors">Purchase Now</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}