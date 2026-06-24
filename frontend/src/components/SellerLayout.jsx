import { Outlet, NavLink, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Building, 
  PlusCircle, 
  TrendingUp, 
  User, 
  LogOut, 
  Search, 
  Bell, 
  Mail, 
  Plus
} from "lucide-react"

export default function SellerLayout() {
  const location = useLocation()
  const userName = localStorage.getItem("userName") || "Totok Michael"
  const userEmail = localStorage.getItem("userEmail") || "tmichael20@mail.com"

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId")
    window.location.href = "/logout"
  }

  const getHeaderInfo = () => {
    switch (location.pathname) {
      case "/seller/dashboard":
        return {
          title: "Dashboard",
          subtitle: "Plan, prioritize, and accomplish your tasks with ease.",
          showActions: true
        }
      case "/mylistings":
        return {
          title: "My Properties",
          subtitle: "Manage and update your luxury stays portfolio.",
          showActions: true
        }
      case "/add-flat":
        return {
          title: "Add Property",
          subtitle: "List a new sanctuary to the premium collection.",
          showActions: false
        }
      case "/seller/analytics":
        return {
          title: "Performance Analytics",
          subtitle: "Track your revenue growth and booking volume stats.",
          showActions: false
        }
      case "/seller/profile":
        return {
          title: "Seller Profile",
          subtitle: "Manage your contact credentials and details info.",
          showActions: false
        }
      default:
        if (location.pathname.startsWith("/updatePage")) {
          return {
            title: "Update Property",
            subtitle: "Update listing configurations and description.",
            showActions: false
          }
        }
        return {
          title: "Overview",
          subtitle: "Welcome back!",
          showActions: false
        }
    }
  }

  const headerInfo = getHeaderInfo()

  const navClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 text-[#0B5A42] bg-[#EAF4F0] rounded-xl transition-all text-sm font-bold relative group"
      : "flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all text-sm font-semibold group"

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] text-gray-800 font-body">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6 sticky top-0 h-screen shrink-0 z-50">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded-full bg-[#0B5A42] flex items-center justify-center text-white font-bold text-sm">
              F
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-gray-900">
              FlatBase
            </span>
          </div>

          {/* Menu Section */}
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-4 mb-3">
                MENU
              </p>
              <nav className="space-y-1">
                <NavLink end to="/seller/dashboard" className={navClass}>
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#0B5A42] rounded-full" />}
                      <LayoutDashboard size={18} className={isActive ? "text-[#0B5A42]" : "text-gray-400 group-hover:text-gray-700"} />
                      <span>Dashboard</span>
                    </>
                  )}
                </NavLink>

                <NavLink to="/mylistings" className={navClass}>
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#0B5A42] rounded-full" />}
                      <Building size={18} className={isActive ? "text-[#0B5A42]" : "text-gray-400 group-hover:text-gray-700"} />
                      <span className="flex-1">My Listings</span>
                    </>
                  )}
                </NavLink>

                <NavLink to="/add-flat" className={navClass}>
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#0B5A42] rounded-full" />}
                      <PlusCircle size={18} className={isActive ? "text-[#0B5A42]" : "text-gray-400 group-hover:text-gray-700"} />
                      <span>Add Property</span>
                    </>
                  )}
                </NavLink>

                <NavLink to="/seller/analytics" className={navClass}>
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#0B5A42] rounded-full" />}
                      <TrendingUp size={18} className={isActive ? "text-[#0B5A42]" : "text-gray-400 group-hover:text-gray-700"} />
                      <span>Analytics</span>
                    </>
                  )}
                </NavLink>
              </nav>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-4 mb-3">
                GENERAL
              </p>
              <nav className="space-y-1">
                <NavLink to="/seller/profile" className={navClass}>
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#0B5A42] rounded-full" />}
                      <User size={18} className={isActive ? "text-[#0B5A42]" : "text-gray-400 group-hover:text-gray-700"} />
                      <span>Profile</span>
                    </>
                  )}
                </NavLink>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all text-sm font-semibold text-left group"
                >
                  <LogOut size={18} className="text-gray-400 group-hover:text-red-500" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar host card */}
        <div className="bg-[#0B5A42] text-white p-4 rounded-2xl relative overflow-hidden mt-6 shadow-md shadow-[#0B5A42]/10">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5" />
          <div className="absolute right-2 top-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <p className="text-xs font-bold mb-1">Host Premium Stays</p>
          <p className="text-[10px] text-white/70 mb-3">FlatBase</p>
          <NavLink 
            to="/"
            className="block text-center w-full bg-[#186a54] hover:bg-[#1d7d63] text-white py-2 rounded-xl text-[10px] font-bold transition-all"
          >
            Go to User Site
          </NavLink>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Row */}
        <header className="bg-white border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 z-40 gap-4">
          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <Search size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search property or booking..."
              className="w-full bg-[#F3F4F6] border border-transparent rounded-full py-2.5 pl-10 pr-12 text-sm focus:outline-none focus:border-gray-200 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 font-medium"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm">
              ⌘F
            </span>
          </div>

          {/* User info & Icon Actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-gray-400 hover:text-gray-700 cursor-pointer transition-colors" />
              <Bell size={18} className="text-gray-400 hover:text-gray-700 cursor-pointer transition-colors" />
            </div>

            {/* Profile widget */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAF4F0] text-[#0B5A42] flex items-center justify-center font-bold text-sm border border-emerald-100 shadow-sm overflow-hidden">
                {userName.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-gray-900 leading-none">{userName}</p>
                <p className="text-[10px] font-medium text-gray-500 mt-1 leading-none">{userEmail}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard inner content area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Dashboard Welcome Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{headerInfo.title}</h1>
              <p className="text-sm text-gray-500 mt-1.5 font-medium">{headerInfo.subtitle}</p>
            </div>
            
            {headerInfo.showActions && (
              <div className="flex gap-3">
                <button 
                  onClick={() => window.print()} 
                  className="px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Import Data
                </button>
                <NavLink to="/add-flat">
                  <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0B5A42] text-white rounded-xl hover:bg-[#186a54] transition-all text-xs font-bold uppercase tracking-wider shadow-md shadow-[#0B5A42]/10">
                    <Plus size={14} />
                    Add Property
                  </button>
                </NavLink>
              </div>
            )}
          </div>

          <div className="animate-in fade-in duration-300">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
