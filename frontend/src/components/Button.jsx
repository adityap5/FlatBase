import React from 'react'

function Button({name,css}) {
  return (
    <button className={`${css} bg-[#76ABAE] py-2 px-4 rounded`}>
          {name}
    </button>
  )
}

export default Button
