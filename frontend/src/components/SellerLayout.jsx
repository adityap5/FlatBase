import { Outlet, NavLink } from "react-router-dom"

export default function SellerLayout() {
  const navClass = ({isActive}) => 
    isActive 
      ? "px-5 py-2.5 rounded-xl font-semibold bg-[#76ABAE] text-white shadow-md transition-colors whitespace-nowrap" 
      : "px-5 py-2.5 rounded-xl font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-[#76ABAE] transition-all shadow-sm whitespace-nowrap"

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex flex-wrap gap-3 pb-4 border-b border-gray-100">
          <NavLink end to="/seller/dashboard" className={navClass}>Overview</NavLink>
          <NavLink to="/mylistings" className={navClass}>My Listings</NavLink>
          <NavLink to="/add-flat" className={navClass}>Add Property</NavLink>
          <NavLink to="/seller/analytics" className={navClass}>Analytics</NavLink>
          <NavLink to="/seller/profile" className={navClass}>Profile</NavLink>
        </div>
      </div>
      <div className="animate-in fade-in duration-500">
        <Outlet />
      </div>
    </div>
  )
}
