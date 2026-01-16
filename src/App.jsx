import { useState, useEffect } from 'react';
import { CloudRain, Loader2, Cloud, Sun, CloudSnow, Wind, Droplets, Thermometer, Search } from 'lucide-react';
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

  useEffect(() => {
    if (isDark && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
  }, [isDark]);

  // Dynamic background based on weather
  const getWeatherBackground = () => {
    if (!weatherInfo) return 'from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800';
    const code = weatherData?.current?.weather_code;

    // Rainy
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
      return 'from-slate-700 via-slate-800 to-slate-900';
    }
    // Sunny
    if ([0, 1].includes(code)) {
      return isDark
        ? 'from-blue-900 via-indigo-900 to-purple-900'
        : 'from-sky-200 via-blue-300 to-indigo-400';
    }
    // Cloudy
    if ([2, 3].includes(code)) {
      return 'from-gray-600 via-gray-700 to-gray-800';
    }
    // Snow
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return 'from-blue-100 via-slate-200 to-gray-300';
    }

    return isDark
      ? 'from-indigo-950 via-blue-950 to-slate-950'
      : 'from-blue-50 via-indigo-50 to-purple-50';
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-all duration-1000 bg-gradient-to-br ${getWeatherBackground()} text-gray-800 dark:text-gray-100 font-sans selection:bg-pink-500/30`}>
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/20 via-cyan-500/10 to-transparent rounded-full blur-[80px] animate-float-slow"></div>
      </div>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <WeatherEffects weatherCode={weatherData?.current?.weather_code} />

      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center">

        {!location && !loading ? (
          /* Initial Landing State */
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-500/30 blur-[60px] rounded-full animate-pulse-slow"></div>
              <h1 className="relative text-7xl md:text-9xl font-display font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent drop-shadow-sm">
                Weather
              </h1>
              <div className="absolute -right-12 top-0 text-yellow-400 animate-spin-slow opacity-80">
                <Sun size={80} />
              </div>
            </div>

            <p className="text-2xl md:text-3xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
              Experience the atmosphere of any city with our crystal-clear forecast engine.
            </p>

            <div className="max-w-xl mx-auto transform hover:scale-105 transition-transform duration-500">
              <div className="glass-panel p-2 rounded-2xl">
                <SearchInput onLocationSelect={setLocation} />
              </div>
            </div>
          </div>
        ) : (
          /* Bento Grid Layout */
          <div className="w-full max-w-7xl animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">

              {/* Search Bar - Spans full width on mobile, 4 cols on desktop */}
              <div className="md:col-span-12 lg:col-span-4 lg:row-span-1">
                <div className="glass-card p-2 h-full flex items-center">
                  <SearchInput onLocationSelect={setLocation} />
                </div>
              </div>

              {/* Status/Time or Spacer - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block lg:col-span-8 glass-card p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-display font-bold text-white/90">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
                <p className="text-white/60">Real-time atmospheric conditions</p>
              </div>

              {loading ? (
                <div className="md:col-span-12 h-96 flex items-center justify-center">
                  <Loader2 className="animate-spin text-white" size={48} />
                </div>
              ) : error ? (
                <div className="md:col-span-12 glass-panel p-8 text-center rounded-3xl text-red-400">
                  <p className="text-xl">Unable to load weather data. Please try again.</p>
                </div>
              ) : weatherData && (
                <>
                  {/* Main Current Weather Card - Hero */}
                  <div className="md:col-span-8 lg:col-span-8 row-span-2">
                    <CurrentWeather data={weatherData} weatherInfo={weatherInfo} />
                  </div>

                  {/* Detail Cards - Stacked on side */}
                  <div className="md:col-span-4 lg:col-span-4 grid grid-cols-1 gap-6">
                    <div className="glass-card p-6 flex items-center gap-4">
                      <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-300">
                        <Wind size={32} />
                      </div>
                      <div>
                        <p className="text-sm text-white/60 font-medium uppercase tracking-wider">Wind Speed</p>
                        <p className="text-2xl font-bold font-display">{weatherData.current.wind_speed_10m} <span className="text-sm font-sans font-normal opacity-60">km/h</span></p>
                      </div>
                    </div>

                    <div className="glass-card p-6 flex items-center gap-4">
                      <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-300">
                        <Droplets size={32} />
                      </div>
                      <div>
                        <p className="text-sm text-white/60 font-medium uppercase tracking-wider">Humidity</p>
                        <p className="text-2xl font-bold font-display">{weatherData.current.relative_humidity_2m}%</p>
                      </div>
                    </div>

                    <div className="glass-card p-6 flex items-center gap-4">
                      <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-300">
                        <Thermometer size={32} />
                      </div>
                      <div>
                        <p className="text-sm text-white/60 font-medium uppercase tracking-wider">Real Feel</p>
                        <p className="text-2xl font-bold font-display">{Math.round(weatherData.current.apparent_temperature)}°</p>
                      </div>
                    </div>
                  </div>

                  {/* Forecast Section - Full width bottom */}
                  <div className="md:col-span-12 mt-4">
                    <ForecastList data={weatherData} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
