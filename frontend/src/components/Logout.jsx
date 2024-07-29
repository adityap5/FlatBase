import {useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('token'); 
      localStorage.removeItem('role');
      navigate("/logout");
    };
  return (
    <button onClick={handleLogout} className="text-lg font-semibold leading-6 hover:text-red-500 md:hover:text-red-500">
      Logout
    </button>
  );
}