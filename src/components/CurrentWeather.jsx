import { MapPin, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { format } from 'date-fns';

const CurrentWeather = ({ data, weatherInfo }) => {
    const { current, daily } = data;
    const today = daily;

    return (
        <div className="glass-card p-8 h-full flex flex-col justify-between relative overflow-hidden group">
            {/* Decorative background blur */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-white/80 mb-2">
                            <MapPin size={20} className="text-white" />
                            <span className="text-lg font-medium tracking-wide">Selected Location</span>
                        </div>
                        <h2 className="text-4xl font-display font-bold text-white tracking-tight">
                            {data.timezone.split('/')[1].replace('_', ' ')}
                        </h2>
                        <p className="text-white/60 mt-1 font-light">
                            {format(new Date(), 'EEEE, d MMMM')}
                        </p>
                    </div>
                    {weatherInfo && (
                        <div className="p-4 glass-panel rounded-2xl animate-float-slow">
                            <weatherInfo.icon size={48} className="text-white drop-shadow-lg" />
                        </div>
                    )}
                </div>

                <div className="flex items-end gap-6">
                    <div className="space-y-2">
                        <h1 className="text-8xl md:text-9xl font-display font-black text-white leading-none tracking-tighter drop-shadow-xl">
                            {Math.round(current.temperature_2m)}°
                        </h1>
                        <div className="flex items-center gap-4 text-white/90 font-medium">
                            <span className="px-3 py-1 glass-panel rounded-full text-sm">
                                H: {Math.round(today.temperature_2m_max[0])}°
                            </span>
                            <span className="px-3 py-1 glass-panel rounded-full text-sm">
                                L: {Math.round(today.temperature_2m_min[0])}°
                            </span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-2xl font-light text-white/90">
                            {weatherInfo?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
