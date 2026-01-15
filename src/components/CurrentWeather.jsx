import { useState } from 'react';
import { Wind, Droplets, Thermometer, Eye } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const StatCard = ({ icon: Icon, label, value, unit, gradient }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`glass-effect-light rounded-2xl p-6 transform transition-all duration-500 ${isHovered ? 'scale-110 shadow-2xl' : 'scale-100 shadow-lg'
                }`}>
                {/* Animated gradient background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                <div className="relative flex items-center gap-4">
                    <div className={`p-4 bg-white/10 rounded-xl transform transition-all duration-500 ${isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
                        }`}>
                        <Icon size={32} className="text-white" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-sm uppercase tracking-wider text-white/60 font-semibold mb-1">
                            {label}
                        </p>
                        <p className="text-3xl font-bold text-white">
                            {value}
                            <span className="text-lg font-normal text-white/70 ml-1">{unit}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CurrentWeather = ({ data, city, weatherInfo }) => {
    const { current, daily } = data;

    return (
        <div className="relative">
            <div className="glass-effect-light p-8 md:p-12 lg:p-16 rounded-[3rem] overflow-hidden group transform hover:scale-[1.01] transition-all duration-700 shadow-2xl">
                {/* Decorative animated gradient */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-yellow-400/30 via-orange-400/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none animate-pulse-slow"></div>

                <div className="relative z-10">
                    {/* Location header */}
                    <div className="mb-12 transform hover:translate-x-2 transition-transform duration-300">
                        <h2 className="text-5xl md:text-7xl font-display font-black mb-3 text-white tracking-tight drop-shadow-2xl">
                            {city.name}
                        </h2>
                        <p className="text-xl md:text-2xl text-white/70 font-medium">
                            {city.admin1 && `${city.admin1}, `}{city.country}
                        </p>
                    </div>

                    {/* Main temperature display */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 mb-16">
                        {/* Massive temperature */}
                        <div className="flex-shrink-0 text-center lg:text-left">
                            <div className="relative inline-block group/temp cursor-pointer">
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-radial from-yellow-300/40 to-transparent blur-3xl opacity-0 group-hover/temp:opacity-100 transition-opacity duration-700"></div>

                                <div className="text-[160px] md:text-[200px] lg:text-[240px] font-display font-black leading-none tracking-tighter relative transform group-hover/temp:scale-110 transition-transform duration-500">
                                    <span className="bg-gradient-to-br from-yellow-200 via-orange-300 to-red-400 dark:from-yellow-100 dark:via-orange-200 dark:to-red-300 bg-clip-text text-transparent drop-shadow-2xl">
                                        {Math.round(current.temperature_2m)}°
                                    </span>
                                </div>
                            </div>

                            <p className="text-3xl md:text-4xl font-display font-bold text-white/95 mt-6 drop-shadow-lg">
                                {weatherInfo?.label || 'Clear'}
                            </p>

                            {/* High/Low */}
                            <div className="flex gap-8 mt-8 justify-center lg:justify-start">
                                <div className="flex flex-col items-center">
                                    <span className="text-xs uppercase tracking-widest text-white/50 font-bold mb-2">High</span>
                                    <span className="text-4xl font-display font-black text-white drop-shadow-lg">
                                        {Math.round(daily.temperature_2m_max[0])}°
                                    </span>
                                </div>
                                <div className="h-16 w-px bg-white/30"></div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Low</span>
                                    <span className="text-4xl font-display font-black text-white/70 drop-shadow-lg">
                                        {Math.round(daily.temperature_2m_min[0])}°
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Animated weather icon */}
                        <div className="flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent blur-3xl animate-pulse-slow"></div>
                            <div className="relative transform animate-float-slow hover:scale-125 hover:rotate-12 transition-all duration-700 cursor-pointer">
                                <WeatherIcon
                                    iconName={weatherInfo?.icon || 'Cloud'}
                                    size={180}
                                    className="text-white relative drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]"
                                    strokeWidth={1.2}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Weather stats - interactive cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <StatCard
                            icon={Wind}
                            label="Wind Speed"
                            value={current.wind_speed_10m}
                            unit="km/h"
                            gradient="from-cyan-400 to-blue-500"
                        />
                        <StatCard
                            icon={Droplets}
                            label="Humidity"
                            value={current.relative_humidity_2m}
                            unit="%"
                            gradient="from-blue-400 to-indigo-500"
                        />
                        <StatCard
                            icon={Thermometer}
                            label="Feels Like"
                            value={Math.round(current.temperature_2m)}
                            unit="°C"
                            gradient="from-orange-400 to-red-500"
                        />
                        <StatCard
                            icon={Eye}
                            label="Visibility"
                            value="10"
                            unit="km"
                            gradient="from-purple-400 to-pink-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
