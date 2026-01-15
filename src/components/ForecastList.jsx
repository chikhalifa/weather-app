import { useState } from 'react';
import { format } from 'date-fns';
import { getWeatherCodeInfo } from '../services/api';
import WeatherIcon from './WeatherIcon';
import { Wind, Droplets, CloudRain } from 'lucide-react';

const ForecastCard = ({ time, weatherInfo, tempMax, tempMin, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="forecast-card-container cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
                animationDelay: `${index * 100}ms`,
                perspective: '1000px',
            }}
        >
            <div className={`forecast-card ${isFlipped ? 'flipped' : ''}`}>
                {/* Front of card */}
                <div className="forecast-card-front glass-effect-light p-6 rounded-3xl flex flex-col items-center gap-4 hover:scale-105 transform transition-all duration-500 group shadow-xl">
                    <span className="text-sm uppercase tracking-widest font-bold text-white/80 group-hover:text-white transition-colors">
                        {format(new Date(time), 'EEE')}
                    </span>

                    <div className="relative my-2">
                        <div className="absolute inset-0 bg-gradient-radial from-sunset-400/30 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative">
                            <WeatherIcon
                                iconName={weatherInfo.icon}
                                size={56}
                                className="text-white drop-shadow-2xl"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 mt-2">
                        <span className="text-3xl font-display font-black text-white drop-shadow-lg">
                            {Math.round(tempMax)}°
                        </span>
                        <span className="text-xl font-display font-semibold text-white/60">
                            {Math.round(tempMin)}°
                        </span>
                    </div>

                    <div className="text-xs text-white/50 mt-2 group-hover:text-white/70 transition-colors">
                        Tap for details
                    </div>
                </div>

                {/* Back of card */}
                <div className="forecast-card-back glass-effect p-6 rounded-3xl flex flex-col items-center gap-3 shadow-2xl bg-gradient-to-br from-atmosphere-600/40 to-storm-700/40">
                    <span className="text-sm uppercase tracking-widest font-bold text-white/90">
                        {format(new Date(time), 'EEEE')}
                    </span>

                    <div className="w-full space-y-3 mt-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <CloudRain size={18} className="text-white" />
                                </div>
                                <span className="text-sm text-white/80">Condition</span>
                            </div>
                            <span className="text-sm font-semibold text-white">{weatherInfo.label}</span>
                        </div>

                        <div className="h-px bg-white/20"></div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-white/60">High</span>
                            <span className="text-lg font-bold text-white">{Math.round(tempMax)}°</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-white/60">Low</span>
                            <span className="text-lg font-bold text-white/80">{Math.round(tempMin)}°</span>
                        </div>
                    </div>

                    <div className="text-xs text-white/50 mt-2">
                        Tap to flip back
                    </div>
                </div>
            </div>

            <style jsx>{`
                .forecast-card-container {
                    opacity: 0;
                    animation: fadeInUp 0.6s ease-out forwards;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .forecast-card {
                    position: relative;
                    width: 100%;
                    height: 280px;
                    transform-style: preserve-3d;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .forecast-card.flipped {
                    transform: rotateY(180deg);
                }

                .forecast-card-front,
                .forecast-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }

                .forecast-card-back {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
};

const ForecastList = ({ data }) => {
    const { daily } = data;

    return (
        <div className="w-full">
            <h3 className="text-3xl md:text-4xl font-display font-black mb-8 text-white flex items-center gap-4">
                <span className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse-slow shadow-lg"></span>
                7-Day Forecast
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6 auto-rows-fr">
                {daily.time.slice(1).map((time, index) => {
                    const i = index + 1;
                    const weatherInfo = getWeatherCodeInfo(daily.weather_code[i]);

                    return (
                        <ForecastCard
                            key={time}
                            time={time}
                            weatherInfo={weatherInfo}
                            tempMax={daily.temperature_2m_max[i]}
                            tempMin={daily.temperature_2m_min[i]}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ForecastList;
