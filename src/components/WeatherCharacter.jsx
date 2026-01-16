import { useEffect, useState } from 'react';
import elfRain from '../assets/elf_rain_v2.png';
import elfSun from '../assets/elf_sun_v2.png';

const WeatherCharacter = ({ weatherCode }) => {
    const [characterState, setCharacterState] = useState(null);

    useEffect(() => {
        if (!weatherCode && weatherCode !== 0) return;

        // Rain codes: 51-67, 80-82, 95-99
        if (
            (weatherCode >= 51 && weatherCode <= 67) ||
            (weatherCode >= 80 && weatherCode <= 82) ||
            (weatherCode >= 95 && weatherCode <= 99)
        ) {
            setCharacterState('rain');
        }
        // Sunny/Clear codes: 0, 1
        else if (weatherCode === 0 || weatherCode === 1) {
            setCharacterState('sun');
        } else {
            setCharacterState(null);
        }
    }, [weatherCode]);

    if (!characterState) return null;

    return (
        <div className="absolute right-0 bottom-16 md:right-10 md:bottom-10 z-20 pointer-events-none overflow-hidden md:overflow-visible max-w-[120px] md:max-w-none">
            {characterState === 'rain' && (
                <div className="relative animate-struggle">
                    <img
                        src={elfRain}
                        alt="Elf struggling with umbrella"
                        className="w-full md:w-48 drop-shadow-xl mix-blend-multiply"
                    />
                    {/* Wind lines effect */}
                    <div className="absolute top-0 right-10 w-20 h-1 bg-white/40 rounded-full animate-wind-fast"></div>
                    <div className="absolute top-10 right-0 w-16 h-1 bg-white/30 rounded-full animate-wind-slow"></div>
                </div>
            )}

            {characterState === 'sun' && (
                <div className="relative animate-cower">
                    <img
                        src={elfSun}
                        alt="Elf hiding from sun"
                        className="w-full md:w-40 drop-shadow-xl mix-blend-multiply"
                    />
                    <div className="absolute -top-10 -right-10 text-yellow-400 animate-spin-slow opacity-60">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes struggle {
                    0%, 100% { transform: rotate(-2deg) translateX(0); }
                    25% { transform: rotate(2deg) translateX(2px); }
                    50% { transform: rotate(-1deg) translateX(-1px); }
                    75% { transform: rotate(3deg) translateX(1px); }
                }
                .animate-struggle {
                    animation: struggle 2s ease-in-out infinite;
                }
                @keyframes cower {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(0.95) translateY(2px); }
                }
                .animate-cower {
                    animation: cower 4s ease-in-out infinite;
                }
                @keyframes wind {
                    from { transform: translateX(20px); opacity: 0; }
                    50% { opacity: 1; }
                    to { transform: translateX(-20px); opacity: 0; }
                }
                .animate-wind-fast {
                    animation: wind 1s linear infinite;
                }
                .animate-wind-slow {
                    animation: wind 1.5s linear infinite;
                    animation-delay: 0.5s;
                }
            `}</style>
        </div>
    );
};

export default WeatherCharacter;
