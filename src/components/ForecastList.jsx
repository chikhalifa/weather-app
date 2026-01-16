import { useState } from 'react';
import { format } from 'date-fns';
import { getWeatherCodeInfo } from '../services/api';
import WeatherIcon from './WeatherIcon';
import { CloudRain } from 'lucide-react';

const ForecastCard = ({ time, weatherInfo, tempMax, tempMin, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="forecast-card-container cursor-pointer h-[240px]"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
                animationDelay: `${index * 100}ms`,
                perspective: '1000px',
            }}
        >
            <div className={`forecast-card w-full h-full relative preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden glass-card p-4 flex flex-col items-center justify-between hover:bg-white/30 transition-colors group">
                    <span className="text-xs uppercase tracking-widest font-bold text-white/70">
                        {format(new Date(time), 'EEE')}
                    </span>

                    <div className="group-hover:scale-110 transition-transform duration-500">
                        <WeatherIcon
                            iconName={weatherInfo.icon}
                            size={42}
                            className="text-white drop-shadow-lg"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-display font-bold text-white">
                            {Math.round(tempMax)}°
                        </span>
                        <span className="text-sm text-white/50">
                            {Math.round(tempMin)}°
                        </span>
                    </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel p-4 rounded-3xl flex flex-col justify-center gap-2 bg-white/20">
                    <div className="text-center mb-2">
                        <span className="text-xs font-bold text-white/90 uppercase">{format(new Date(time), 'EEEE')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                        <CloudRain size={14} />
                        <span>{weatherInfo.label}</span>
                    </div>
                    <div className="h-px bg-white/10 w-full my-1"></div>
                    <div className="flex justify-between text-xs text-white">
                        <span>High</span>
                        <span className="font-bold">{Math.round(tempMax)}°</span>
                    </div>
                    <div className="flex justify-between text-xs text-white/70">
                        <span>Low</span>
                        <span>{Math.round(tempMin)}°</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                .forecast-card-container {
                    opacity: 0;
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

const ForecastList = ({ data }) => {
    const { daily } = data;

    return (
        <div className="w-full">
            <h3 className="text-xl font-display font-medium mb-4 text-white/80 px-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
                7-Day Forecast
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
