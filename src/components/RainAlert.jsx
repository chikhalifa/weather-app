import { CloudRain, CloudSun } from 'lucide-react';
import { format } from 'date-fns';

const RainAlert = ({ data }) => {
    if (!data || !data.hourly) return null;

    const currentHourIndex = new Date().getHours();
    const hourly = data.hourly;
    const next12Hours = hourly.time.slice(currentHourIndex, currentHourIndex + 12);
    const codes = hourly.weather_code.slice(currentHourIndex, currentHourIndex + 12);

    // Rain codes: 51-67 (drizzle/rain), 80-82 (showers), 95-99 (thunderstorm)
    const isRaining = (code) =>
        (code >= 51 && code <= 67) ||
        (code >= 80 && code <= 82) ||
        (code >= 95 && code <= 99);

    const currentlyRaining = isRaining(codes[0]);
    let alertMessage = null;
    let AlertIcon = CloudRain;

    if (currentlyRaining) {
        // Find when it stops
        const stopIndex = codes.findIndex((code, index) => index > 0 && !isRaining(code));
        if (stopIndex !== -1) {
            const stopTime = new Date(next12Hours[stopIndex]);
            alertMessage = `Rain expected to stop around ${format(stopTime, 'h:mm a')}`;
            AlertIcon = CloudSun;
        } else {
            alertMessage = "Rain expected to continue for the next 12 hours";
        }
    } else {
        // Find when it starts
        const startIndex = codes.findIndex(code => isRaining(code));
        if (startIndex !== -1) {
            const startTime = new Date(next12Hours[startIndex]);
            alertMessage = `Rain starting around ${format(startTime, 'h:mm a')}`;
        }
    }

    if (!alertMessage) return null;

    return (
        <div className="max-w-md mx-auto mb-8 animate-fade-in-up">
            <div className="glass-panel p-4 rounded-2xl flex items-center justify-center gap-3 bg-blue-500/20 border-blue-400/30">
                <AlertIcon className="text-blue-200 animate-pulse" size={24} />
                <span className="text-white font-medium text-lg tracking-wide drop-shadow-sm">
                    {alertMessage}
                </span>
            </div>
        </div>
    );
};

export default RainAlert;
