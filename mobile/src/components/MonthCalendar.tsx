import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MonthCalendarProps {
  blockedMonths: string[];
  onDateSelect: (dates: { start: string; end: string }) => void;
}

export default function MonthCalendar({ blockedMonths = [], onDateSelect }: MonthCalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const handleMonthClick = (monthIndex: number) => {
    const monthStr = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}`;
    const isPast = currentYear < today.getFullYear() || (currentYear === today.getFullYear() && monthIndex < today.getMonth());
    if (isPast || blockedMonths.includes(monthStr)) return;

    if (!startMonth || (startMonth && endMonth)) {
      setStartMonth(monthStr);
      setEndMonth('');
      onDateSelect({ start: monthStr, end: '' });
    } else if (startMonth && !endMonth) {
      const startD = new Date(startMonth);
      const endD = new Date(monthStr);

      if (endD < startD) {
        setStartMonth(monthStr);
        setEndMonth('');
        onDateSelect({ start: monthStr, end: '' });
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
          setEndMonth('');
          onDateSelect({ start: monthStr, end: '' });
        } else {
          setEndMonth(monthStr);
          onDateSelect({ start: startMonth, end: monthStr });
        }
      }
    }
  };

  const isSelected = (mStr: string) => mStr === startMonth || mStr === endMonth;

  const isInRange = (mStr: string) => {
    if (startMonth && endMonth) {
      const d = new Date(mStr);
      return d > new Date(startMonth) && d < new Date(endMonth);
    }
    return false;
  };

  return (
    <View className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm w-full">
      {/* Header Year Selection */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => setCurrentYear(y => y - 1)}
          disabled={currentYear <= today.getFullYear()}
          className={`p-2 rounded-xl border ${currentYear <= today.getFullYear() ? 'border-gray-100' : 'border-gray-200'}`}
        >
          <Ionicons
            name="chevron-back"
            size={18}
            color={currentYear <= today.getFullYear() ? '#d1d5db' : '#4b5563'}
          />
        </TouchableOpacity>

        <Text className="font-extrabold text-lg text-gray-900">{currentYear}</Text>

        <TouchableOpacity
          onPress={() => setCurrentYear(y => y + 1)}
          className="p-2 rounded-xl border border-gray-200"
        >
          <Ionicons name="chevron-forward" size={18} color="#4b5563" />
        </TouchableOpacity>
      </View>

      {/* Grid of Months */}
      <View className="flex-row flex-wrap gap-2 justify-between">
        {months.map((month, idx) => {
          const mStr = `${currentYear}-${String(idx + 1).padStart(2, '0')}`;
          const isPast = currentYear < today.getFullYear() || (currentYear === today.getFullYear() && idx < today.getMonth());
          const isBlocked = blockedMonths.includes(mStr);
          const disabled = isPast || isBlocked;
          const selected = isSelected(mStr);
          const inRange = isInRange(mStr);

          let btnClass = "w-[30%] py-3.5 rounded-2xl items-center border ";
          let textClass = "font-semibold text-sm ";

          if (disabled) {
            btnClass += "bg-gray-50 border-gray-100";
            textClass += "text-gray-300 line-through";
          } else if (selected) {
            btnClass += "bg-blue-600 border-blue-600 shadow-sm shadow-blue-600/30";
            textClass += "text-white";
          } else if (inRange) {
            btnClass += "bg-blue-50 border-blue-100";
            textClass += "text-blue-600";
          } else {
            btnClass += "bg-white border-gray-200";
            textClass += "text-gray-700";
          }

          return (
            <TouchableOpacity
              key={month}
              onPress={() => handleMonthClick(idx)}
              disabled={disabled}
              className={btnClass}
            >
              <Text className={textClass}>{month}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {(startMonth || endMonth) && (
        <View className="mt-5 p-3.5 bg-gray-50 border border-gray-100 rounded-2xl flex-row justify-center items-center gap-3">
          <Text className="font-bold text-gray-700 text-sm">{startMonth || 'Start'}</Text>
          <Ionicons name="arrow-forward" size={16} color="#9ca3af" />
          <Text className="font-bold text-gray-700 text-sm">{endMonth || 'End'}</Text>
        </View>
      )}
    </View>
  );
}
