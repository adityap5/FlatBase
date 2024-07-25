import React from 'react'
import RingLoader from "react-spinners/RingLoader";
function Loader({loading}) {
  return (
    <div className="flex justify-center items-center">
        <RingLoader
          loading={loading}
          color="#76ABAE"
          size={90}
          speedMultiplier={3}
        />
      </div>
  )
}

export default Loader
