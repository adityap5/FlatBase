import React from 'react';

const ListShimmer = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => {
        return (
          <div key={i} className="motionsite-card rounded-3xl overflow-hidden border border-glass-border flex flex-col h-full">
            <div className="h-56 w-full bg-surface-container/80 animate-pulse"></div>
            <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-3 bg-surface-container/60 animate-pulse rounded-full w-1/4"></div>
                <div className="h-5 bg-surface-container/80 animate-pulse rounded-full w-3/4"></div>
              </div>
              <div className="h-10 bg-surface-container/80 animate-pulse rounded-2xl w-full mt-6"></div>
            </div>
          </div>
        )
      })}
    </>
  );
};

export default ListShimmer;
