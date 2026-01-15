import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';

const WeatherEffects = ({ weatherCode }) => {
    // Determine weather type
    // Codes: https://open-meteo.com/en/docs
    const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);
    const isSunny = [0, 1].includes(weatherCode);
    const isWindy = [61, 80, 81, 82, 95, 96, 99].includes(weatherCode); // Simplified logic, adding wind to storms/rain for drama

    const [drops, setDrops] = useState([]);

    // Rain Logic
    useEffect(() => {
        if (isRainy) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDrops(current => {
                if (current.length > 0) return current;
                return Array.from({ length: 50 }).map((_, i) => ({
                    id: i,
                    x: Math.random() * 100,
                    delay: Math.random() * 2,
                    duration: 0.5 + Math.random() * 0.5
                }));
            });
        } else {
            setDrops([]);
        }
    }, [isRainy]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <AnimatePresence>
                {/* ---------------- RAIN ---------------- */}
                {isRainy && (
                    <div className="absolute inset-0">
                        {drops.map((drop) => (
                            <motion.div
                                key={drop.id}
                                initial={{ y: -20, x: `${drop.x}%`, opacity: 0 }}
                                animate={{ y: '120vh', opacity: [0, 0.5, 0] }}
                                transition={{
                                    duration: drop.duration,
                                    repeat: Infinity,
                                    delay: drop.delay,
                                    ease: "linear"
                                }}
                                className="absolute w-[2px] h-6 bg-blue-400/50 rounded-full"
                            />
                        ))}
                    </div>
                )}

                {/* ---------------- SUN (Teletubbies Style) ---------------- */}
                {isSunny && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -90 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0, rotate: 90 }}
                        transition={{ type: "spring", duration: 2 }}
                        className="absolute top-10 right-10 w-48 h-48 md:w-64 md:h-64"
                    >
                        {/* Sun Rays */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full blur-[60px] opacity-60"
                        />

                        {/* The Sun Face (SVG) */}
                        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                            {/* Rays */}
                            <motion.g
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                originX="100"
                                originY="100"
                            >
                                {[...Array(12)].map((_, i) => (
                                    <path
                                        key={i}
                                        d="M100 0 L115 40 L100 50 L85 40 Z"
                                        fill="#FDB813"
                                        transform={`rotate(${i * 30} 100 100)`}
                                    />
                                ))}
                            </motion.g>

                            <circle cx="100" cy="100" r="50" fill="#FDB813" />

                            {/* Face */}
                            <g fill="#5d4037">
                                {/* Eyes */}
                                <motion.ellipse
                                    cx="85" cy="90" rx="4" ry="6"
                                    animate={{ scaleY: [1, 0.1, 1] }}
                                    transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.2 }}
                                />
                                <motion.ellipse
                                    cx="115" cy="90" rx="4" ry="6"
                                    animate={{ scaleY: [1, 0.1, 1] }}
                                    transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 0.2 }}
                                />
                                {/* Smile */}
                                <path d="M 80 110 Q 100 125 120 110" stroke="#5d4037" strokeWidth="3" fill="none" strokeLinecap="round" />
                                {/* Cheeks */}
                                <circle cx="75" cy="105" r="4" fill="#fca5a5" opacity="0.6" />
                                <circle cx="125" cy="105" r="4" fill="#fca5a5" opacity="0.6" />
                            </g>
                        </svg>
                    </motion.div>
                )}

                {/* ---------------- WIND (Avatar Air Bending) ---------------- */}
                {/* Always show distinct wind paths if windy or cloud moving if just generic */}
                {(isWindy || isRainy) && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                            <motion.svg
                                key={i}
                                viewBox="0 0 1000 500"
                                className="absolute w-full h-full opacity-30"
                                style={{ top: `${i * 20}%` }}
                            >
                                <motion.path
                                    d="M -100 250 C 200 100, 400 400, 600 250 S 900 100, 1200 250"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="20"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0, x: -100 }}
                                    animate={{
                                        pathLength: [0, 1, 1, 0],
                                        opacity: [0, 0.5, 0.5, 0],
                                        x: [0, 0, 100, 100] // Move slightly
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        delay: i * 1.5,
                                        ease: "easeInOut"
                                    }}
                                    filter="blur(8px)"
                                />
                            </motion.svg>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WeatherEffects;
