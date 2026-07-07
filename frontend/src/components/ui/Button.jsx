import React from 'react'

function Button({ name, css = '', variant = 'primary', fullWidth = false, onClick, type = 'button' }) {
  const baseClasses = "px-6 py-2.5 rounded-full font-body font-bold text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.98] select-none"
  
  const variantClasses = variant === 'primary'
    ? "bg-primary text-on-primary hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]"
    : "motionsite-card border-glass-border text-on-surface hover:text-on-primary hover:bg-primary hover:border-primary"

  const widthClass = fullWidth ? "w-full" : ""

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseClasses} ${variantClasses} ${widthClass} ${css}`}
    >
      {name}
    </button>
  )
}

export default Button
