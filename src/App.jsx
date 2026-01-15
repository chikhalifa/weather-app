import { useState } from 'react';
import { CloudRain, Loader2, Cloud, Sun, CloudSnow } from 'lucide-react';
import Navbar from './components/Navbar';
import SearchInput from './components/SearchInput';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import { useWeather } from './hooks/useWeather';
import { getWeatherCodeInfo } from './services/api';
import WeatherEffects from './components/WeatherEffects';

function App() {
  const [location, setLocation] = useState(null);
  const { weatherData, loading, error } = useWeather(location);
  const [isDark, setIsDark] = useState(true);

  const weatherInfo = (weatherData && weatherData.current)
    ? getWeatherCodeInfo(weatherData.current.weather_code)
    : null;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  if (isDark && !document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.add('dark');
  }

  // Dynamic background based on weather
  const getWeatherBackground = () => {
    if (!weatherInfo) return '';
    const code = weatherData?.current?.weather_code;

    // Rainy
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
      return 'from-slate-800 via-slate-900 to-gray-950';
    }
    // Sunny
    if ([0, 1].includes(code)) {
      return isDark
        ? 'from-slate-800 via-slate-850 to-slate-900'
        : 'from-gray-50 via-slate-50 to-gray-100';
    }
    // Cloudy
    if ([2, 3].includes(code)) {
      return 'from-gray-700 via-gray-800 to-gray-900';
    }
    // Snow
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return 'from-slate-100 via-gray-200 to-slate-300';
    }

    return isDark
      ? 'from-storm-900 via-atmosphere-900 to-storm-800'
      : 'from-gray-50 via-slate-50 to-gray-100';
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 bg-gradient-to-br ${getWeatherBackground()}`}>
      {/* Animated floating clouds */}
      <div className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-3">
        <Cloud className="absolute top-20 left-[10%] text-white animate-drift" size={100} />
        <Cloud className="absolute top-40 right-[15%] text-white animate-float-slow" size={80} />
        <Cloud className="absolute bottom-40 left-[20%] text-white animate-drift" size={120} style={{ animationDelay: '2s' }} />
        <CloudSnow className="absolute top-60 right-[30%] text-white animate-float" size={60} style={{ animationDelay: '1s' }} />
      </div>

      {/* Atmospheric gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-atmosphere-300/10 dark:bg-atmosphere-700/5 rounded-full blur-3xl animate-drift"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-atmosphere-400/8 dark:bg-storm-800/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-atmosphere-200/6 dark:bg-atmosphere-800/8 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <WeatherEffects weatherCode={weatherData?.current?.weather_code} />

      <div className="container mx-auto px-4 md:px-8 pb-20 pt-32 relative z-10">
        {/* Hero Section */}
        <header className="max-w-5xl mx-auto mb-16 text-center">

          {/* Animated weather icon */}
          <div className="relative inline-block mb-8 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-radial from-atmosphere-400/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow"></div>
            <div className="glass-effect-light p-8 rounded-[2rem] relative transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-lg">
              <div className="relative">
                <Sun className="absolute inset-0 text-yellow-600/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" size={64} />
                <CloudRain size={64} className="text-atmosphere-600 dark:text-atmosphere-400 drop-shadow-lg relative group-hover:opacity-0 transition-opacity duration-500" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Animated title */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tight transform hover:scale-105 transition-transform duration-500 cursor-pointer">
            <span className="inline-block bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 dark:from-gray-200 dark:via-gray-300 dark:to-gray-400 bg-clip-text text-transparent drop-shadow-md">
              Weather
            </span>
            <br />
            <span className="inline-block text-gray-600 dark:text-gray-400 opacity-70 font-sans font-light text-5xl md:text-7xl lg:text-8xl mt-2 hover:opacity-90 transition-opacity">
              Forecast
            </span>
          </h1>

          <div className="max-w-2xl mx-auto mt-12">
            <SearchInput onLocationSelect={setLocation} />
          </div>
        </header>

        <main className="max-w-7xl mx-auto">
          {/* Initial State with animated illustration */}
          {!location && !loading && (
            <div className="glass-effect-light p-16 rounded-[3rem] text-center max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-500 group relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-atmosphere-300/5 via-atmosphere-400/5 to-atmosphere-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative">
                <div className="relative inline-block mb-8">
                  <CloudRain size={96} className="text-atmosphere-600 dark:text-atmosphere-500 opacity-50 group-hover:opacity-70 transition-all duration-500 animate-float" strokeWidth={1.5} />
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-600/60 rounded-full animate-pulse-slow"></div>
                </div>

                <p className="text-3xl md:text-4xl font-display font-bold text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Discover the atmosphere<br />of any city
                </p>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
                  Start by searching above
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-96 gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-atmosphere-400/15 to-transparent blur-3xl animate-pulse"></div>
                <Loader2 className="animate-spin text-gray-600 dark:text-gray-400 relative" size={80} strokeWidth={1.5} />
              </div>
              <p className="text-xl font-display font-semibold text-gray-600 dark:text-gray-300 animate-pulse">
                Fetching weather data...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="glass-effect-light border-red-500/30 p-12 rounded-3xl text-center max-w-lg mx-auto transform hover:scale-102 transition-transform duration-300">
              <p className="text-2xl font-display font-bold text-red-600 dark:text-red-400 mb-2">
                Unable to retrieve weather data
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Please try another location
              </p>
            </div>
          )}

          {/* Data State */}
          {weatherData && !loading && (
            <div className="space-y-12 animate-fadeInUp">
              <CurrentWeather data={weatherData} city={location} weatherInfo={weatherInfo} />
              <ForecastList data={weatherData} />
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
