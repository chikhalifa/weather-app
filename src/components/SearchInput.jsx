import { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchCity } from '../services/api';

const SearchInput = ({ onLocationSelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length > 2) {
                try {
                    const cities = await searchCity(query);
                    setResults(cities);
                    setIsOpen(true);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (city) => {
        onLocationSelect(city);
        setQuery(`${city.name}, ${city.country}`);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full z-50">
            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-sunset-400 via-atmosphere-500 to-sunset-400 rounded-full blur-lg opacity-0 group-focus-within:opacity-30 transition-opacity duration-500"></div>

                {/* Input */}
                <input
                    type="text"
                    className="relative w-full glass-effect-light rounded-full py-5 md:py-6 pl-16 md:pl-20 pr-6 text-lg md:text-xl placeholder-storm-500/70 dark:placeholder-white/60 text-storm-900 dark:text-white font-medium focus:outline-none focus:ring-4 focus:ring-sunset-400/30 dark:focus:ring-atmosphere-400/30 transition-all duration-300 shadow-xl bg-white/40 dark:bg-black/20 backdrop-blur-md"
                    placeholder="Search for a city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Search icon */}
                <Search
                    size={28}
                    className="absolute left-6 md:left-7 top-1/2 -translate-y-1/2 text-storm-500 dark:text-white/50 group-focus-within:text-sunset-500 dark:group-focus-within:text-atmosphere-400 transition-colors"
                    strokeWidth={2}
                />
            </div>

            {/* Autocomplete dropdown */}
            {isOpen && results.length > 0 && (
                <ul className="absolute top-[calc(100%+1rem)] left-0 right-0 glass-effect-light rounded-3xl p-3 shadow-2xl overflow-hidden max-h-96 overflow-y-auto scrollbar-hide z-50 animate-fadeIn">
                    {results.map((city) => (
                        <li
                            key={city.id}
                            className="p-4 cursor-pointer rounded-2xl flex items-center gap-4 text-storm-800 dark:text-white/90 hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-200 group/item"
                            onClick={() => handleSelect(city)}
                        >
                            <div className="p-3 bg-atmosphere-500/10 dark:bg-atmosphere-400/10 rounded-xl group-hover/item:bg-sunset-500/20 dark:group-hover/item:bg-atmosphere-400/20 transition-colors">
                                <MapPin size={20} className="text-atmosphere-600 dark:text-atmosphere-400" strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="font-semibold text-base md:text-lg block truncate">
                                    {city.name}
                                </span>
                                <span className="text-sm text-storm-600 dark:text-white/50 uppercase tracking-wide">
                                    {city.admin1 && `${city.admin1}, `}{city.country_code}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default SearchInput;
