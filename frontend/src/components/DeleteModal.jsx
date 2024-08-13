import React from 'react'

function DeleteModal({closeModal}) {
  return (
    <div className="w-full bg-red-300">
 <div className="fixed p-10 rounded-lg bg-slate-600 -translate-x-1/2 -translate-y-1/2 top-2/4 left-2/4">
        <div className="w-80 h-auto" >
          <h2 className='text-center text-xl'>Are you sure?😮</h2>
          <div className="flex justify-between my-4">
            <button className='bg-zinc-800 p-2 rounded-lg px-8 py-2 '>Yes</button>
            <button className='bg-zinc-800 px-8 py-2 rounded-lg' onClick={closeModal}>No</button>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default DeleteModal
