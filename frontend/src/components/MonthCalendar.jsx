import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MonthCalendar = ({ blockedMonths = [], onDateSelect }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const handleMonthClick = (monthIndex) => {
    const monthStr = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}`;
    
    const today = new Date();
    const isPast = currentYear < today.getFullYear() || (currentYear === today.getFullYear() && monthIndex < today.getMonth());
    if (isPast || blockedMonths.includes(monthStr)) return;

    if (!startMonth || (startMonth && endMonth)) {
      setStartMonth(monthStr);
      setEndMonth("");
      onDateSelect({ start: monthStr, end: "" });
    } else if (startMonth && !endMonth) {
      const startD = new Date(startMonth);
      const endD = new Date(monthStr);
      
      if (endD < startD) {
        setStartMonth(monthStr);
        setEndMonth("");
        onDateSelect({ start: monthStr, end: "" });
      } else {
        let hasBlocked = false;
        let p = new Date(startD);
        while (p <= endD) {
          const mStr = `${p.getFullYear()}-${String(p.getMonth() + 1).padStart(2, '0')}`;
          if (blockedMonths.includes(mStr)) {
            hasBlocked = true;
            break;
          }
          p.setMonth(p.getMonth() + 1);
        }

        if (hasBlocked) {
          setStartMonth(monthStr);
          setEndMonth("");
          onDateSelect({ start: monthStr, end: "" });
        } else {
          setEndMonth(monthStr);
          onDateSelect({ start: startMonth, end: monthStr });
        }
      }
    }
  };

  const isSelected = (mStr) => mStr === startMonth || mStr === endMonth;

  const isInRange = (mStr) => {
    if (startMonth && endMonth) {
      return new Date(mStr) > new Date(startMonth) && new Date(mStr) < new Date(endMonth);
    }
    return false;
  };

  const today = new Date();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setCurrentYear(y => y - 1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={currentYear <= today.getFullYear()}
        >
          <ChevronLeft size={20} className={currentYear <= today.getFullYear() ? "text-gray-300" : "text-gray-600"}/>
        </button>
        <span className="font-bold text-lg text-gray-800">{currentYear}</span>
        <button 
          onClick={() => setCurrentYear(y => y + 1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight size={20} className="text-gray-600"/>
        </button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {months.map((month, idx) => {
          const mStr = `${currentYear}-${String(idx + 1).padStart(2, '0')}`;
          const isPast = currentYear < today.getFullYear() || (currentYear === today.getFullYear() && idx < today.getMonth());
          const isBlocked = blockedMonths.includes(mStr);
          const disabled = isPast || isBlocked;
          const selected = isSelected(mStr);
          const inRange = isInRange(mStr);

          let btnClass = "py-3 rounded-lg text-sm font-medium transition-all duration-200 border ";
          if (disabled) {
            btnClass += "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through";
          } else if (selected) {
            btnClass += "bg-[#76ABAE] text-white border-[#76ABAE] shadow-md transform scale-105";
          } else if (inRange) {
            btnClass += "bg-teal-50 text-[#76ABAE] border-teal-100";
          } else {
            btnClass += "bg-white text-gray-700 border-gray-200 hover:border-[#76ABAE] hover:text-[#76ABAE] hover:shadow-sm";
          }

          return (
            <button
              key={month}
              onClick={() => handleMonthClick(idx)}
              disabled={disabled}
              className={btnClass}
            >
              {month}
            </button>
          );
        })}
      </div>
      {(startMonth || endMonth) && (
        <div className="mt-6 p-3 bg-gray-50 rounded-lg text-sm text-center text-gray-700 flex justify-center items-center gap-3 border border-gray-100">
          <span className="font-medium">{startMonth || "Select start"}</span>
          <span className="text-gray-400">→</span>
          <span className="font-medium">{endMonth || "Select end"}</span>
        </div>
      )}
    </div>
  );
};

export default MonthCalendar;
