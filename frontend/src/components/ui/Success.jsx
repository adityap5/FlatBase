import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const Success = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
            <div className="motionsite-card p-8 md:p-10 rounded-3xl border border-glass-border max-w-md w-full text-center shadow-2xl">
                <div className="mb-6 flex justify-center">
                    <div className="bg-primary/10 p-5 rounded-full border border-primary/20 shadow-lg shadow-primary/5">
                        <CheckCircle2 size={42} className="text-primary text-glow animate-bounce" />
                    </div>
                </div>

                <h1 className="font-display text-2xl md:text-3xl font-bold text-on-background mb-4">
                    Payment Successful
                </h1>
                
                <p className="text-on-surface-variant font-body text-sm opacity-85 leading-relaxed mb-8">
                    Your luxury stay is confirmed. We have successfully registered your booking and updated our records.
                </p>
                
                <Link to="/bookings" className="inline-block w-full sm:w-auto">
                    <button className="w-full bg-primary text-on-primary px-8 py-3.5 rounded-2xl font-body font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/15 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                        <span>Go to My Bookings</span>
                        <ArrowRight size={14} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Success;
