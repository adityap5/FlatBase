import React from 'react';

const HomeCardShimmer = () => {
  return (
    <>
     {Array.from({ length: 20 }).map((el, i) => {
        return <div key={i} className="animate-pulse bg-zinc-500  rounded-xl">
        
        <div className="h-56 w-full bg-zinc-400"></div>
        <div className="px-4 py-4 md:px-6 md:py-6">
          <div className="h-6 bg-gray-300 rounded-lg w-2/4 mb-2"></div>
        </div>
      </div>
      })}
    </>
   
    
  );
};

export default HomeCardShimmer;
