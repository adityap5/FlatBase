import React from 'react'
import DotLoader from "react-spinners/DotLoader";
function Loader({loading}) {
  return (
    <div className="flex justify-center items-center py-4">
        <DotLoader
          loading={loading}
          color="#76ABAE"
          size={60}
          speedMultiplier={3}
        />
      </div>
  )
}

export default Loader
