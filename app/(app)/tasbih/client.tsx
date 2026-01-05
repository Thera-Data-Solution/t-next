"use client";

import React, { useState, useMemo } from 'react';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { TASBIH_READINGS } from '@/app/service/constants';

const TasbihSection: React.FC = () => {
    const [count, setCount] = useState(0);
    const [readingIndex, setReadingIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [targetCount, setTargetCount] = useState(33);

    const handleIncrement = () => {
        setIsAnimating(true);
        setCount(prev => prev + 1);

        // Auto reset animation state for the "tap" feel
        setTimeout(() => setIsAnimating(false), 150);

        // Haptic feedback simulation if available
        if ('vibrate' in navigator) {
            navigator.vibrate(24);
        }
    };

    const resetCount = () => {
        setCount(0);
    };

    const nextReading = () => {
        setReadingIndex(prev => (prev + 1) % TASBIH_READINGS.length);
        setCount(0);
    };

    const prevReading = () => {
        setReadingIndex(prev => (prev - 1 + TASBIH_READINGS.length) % TASBIH_READINGS.length);
        setCount(0);
    };

    const activeReading = TASBIH_READINGS[readingIndex];

    // We limit the visual beads to targetCount, but cap at 33 for aesthetic reasons if it's 99/100
    // Or show all if requested. Let's show up to 33 beads for a clear circular "kalung" look.
    const visualBeadCount = Math.min(targetCount, 33);
    const beads = useMemo(() => Array.from({ length: visualBeadCount }), [visualBeadCount]);

    // Current active bead index in the visual circle
    const activeVisualIndex = count % visualBeadCount;

    return (
        <div className="flex flex-col items-center animate-in fade-in duration-700">
            {/* Target Selector */}
            <div className="flex gap-2 mb-6">
                {[33, 99, 100].map(val => (
                    <button
                        key={val}
                        onClick={() => {
                            setTargetCount(val);
                            setCount(0);
                        }}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${targetCount === val ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-100'}`}
                    >
                        {val}
                    </button>
                ))}
            </div>

            {/* Reading Guide */}
            <div className="w-full rounded-3xl p-6 border border-slate-100 shadow-sm mb-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/10">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${((count % targetCount) / targetCount) * 100}%` }}
                    />
                </div>

                <div className="flex justify-between items-center mb-4">
                    <button onClick={prevReading} className="p-2 text-slate-300 hover:text-emerald-600 transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Panduan Bacaan</span>
                    <button onClick={nextReading} className="p-2 text-slate-300 hover:text-emerald-600 transition-colors">
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="arabic text-2xl text-slate-800 mb-2 leading-relaxed">{activeReading.arabic}</div>
                <div className="font-bold text-slate-800 mb-1">{activeReading.text}</div>
                <div className="text-xs text-slate-400 italic">{activeReading.meaning}</div>
            </div>

            {/* Tasbih Circular Necklace Area */}
            <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center mb-4">

                {/* The Beads (Circle arrangement) */}
                <div
                    className="absolute inset-0 transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${- (count * (360 / visualBeadCount))}deg)` }}
                >
                    {beads.map((_, i) => {
                        const angle = (i * (360 / visualBeadCount)) - 90; // Start from top
                        const radius = 135; // Radius of the necklace
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;

                        const isActive = i === activeVisualIndex;
                        const isPassed = i < activeVisualIndex;

                        return (
                            <div
                                key={i}
                                className={`absolute left-1/2 top-1/2 w-4 h-4 rounded-full transition-all duration-300 ${isActive
                                        ? 'bg-emerald-600 scale-100 shadow-[0_0_15px_rgba(5,150,105,0.5)] z-20'
                                        : isPassed
                                            ? 'bg-emerald-200 z-10'
                                            : 'bg-slate-100 z-10'
                                    }`}
                                style={{
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle + 90}deg)`,
                                    border: '1px solid rgba(0,0,0,0.05)'
                                }}
                            />
                        );
                    })}

                    {/* Subtle string line connecting beads */}
                    <div className="absolute inset-0 border border-slate-100 rounded-full scale-[0.84] -z-10"></div>
                </div>

                {/* Counter Center Display */}
                <div
                    onClick={handleIncrement}
                    className="relative group cursor-pointer select-none z-30"
                >
                    <div className={`absolute inset-0 bg-emerald-100 rounded-full scale-0 opacity-0 ${isAnimating ? 'animate-[ping_0.5s_ease-out]' : ''}`}></div>

                    <div className={`w-30 h-30 rounded-full bg-white shadow-[0_15px_35px_rgba(0,0,0,0.08)] border-4 border-slate-50 flex flex-col items-center justify-center transition-transform duration-100 ${isAnimating ? 'scale-90' : 'scale-100'}`}>
                        <span className="text-[8px] text-slate-300 font-bold uppercase tracking-widest mb-1">Total</span>
                        <span className="text-5xl font-bold text-emerald-600 tabular-nums">{count}</span>
                        <div className="h-0.5 w-8 bg-emerald-100 my-2 rounded-full"></div>
                        <span className="text-[8px] text-slate-400 font-medium">/{targetCount}</span>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); resetCount(); }}
                        className="absolute -bottom-1 -right-1 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tap Lingkaran Tengah Untuk Menghitung</p>
            </div>
        </div>
    );
};

export default TasbihSection;
