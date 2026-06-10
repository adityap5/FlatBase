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
    <div className="motionsite-card rounded-3xl p-6 w-full border border-glass-border">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setCurrentYear(y => y - 1)}
          className="p-2 hover:bg-glass-white border border-transparent hover:border-glass-border rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={currentYear <= today.getFullYear()}
        >
          <ChevronLeft size={18} className={currentYear <= today.getFullYear() ? "text-on-surface-variant/40" : "text-primary"}/>
        </button>
        <span className="font-display font-semibold text-lg text-on-background">{currentYear}</span>
        <button 
          onClick={() => setCurrentYear(y => y + 1)}
          className="p-2 hover:bg-glass-white border border-transparent hover:border-glass-border rounded-xl transition-all duration-300"
        >
          <ChevronRight size={18} className="text-primary"/>
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

          let btnClass = "py-3.5 rounded-2xl text-xs font-body font-semibold tracking-wider uppercase transition-all duration-300 border ";
          if (disabled) {
            btnClass += "bg-surface-container-low/30 text-on-surface-variant/30 border-glass-border/40 cursor-not-allowed line-through";
          } else if (selected) {
            btnClass += "bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(0,245,255,0.4)] transform scale-105";
          } else if (inRange) {
            btnClass += "bg-primary/10 text-primary border-primary/20";
          } else {
            btnClass += "bg-surface-container text-on-surface-variant border-glass-border hover:border-primary hover:text-primary hover:bg-primary/5 hover:scale-[1.02]";
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
        <div className="mt-6 p-4 bg-surface-container-low rounded-2xl text-xs font-body tracking-wider uppercase flex justify-center items-center gap-3 border border-glass-border">
          <span className="font-bold text-primary">{startMonth || "Start Month"}</span>
          <span className="text-on-surface-variant/40">&rarr;</span>
          <span className="font-bold text-primary">{endMonth || "End Month"}</span>
        </div>
      )}
    </div>
  );
};

export default MonthCalendar;
