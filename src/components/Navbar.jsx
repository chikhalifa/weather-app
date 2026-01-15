// eslint-disable-next-line
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const Navbar = ({ isDark, toggleTheme }) => {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl">
            <div className="glass-effect-light px-8 py-4 rounded-full flex justify-between items-center shadow-2xl backdrop-blur-3xl">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <span className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-atmosphere-600 via-sunset-500 to-atmosphere-700 dark:from-atmosphere-300 dark:via-sunset-300 dark:to-atmosphere-400 bg-clip-text text-transparent">
                        Atmosphere
                    </span>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-3 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110 group relative overflow-hidden"
                    aria-label="Toggle theme"
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sunset-400 to-atmosphere-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity"></div>

                    {/* Icon */}
                    <div className="relative transform group-hover:rotate-180 transition-transform duration-500">
                        {isDark ? (
                            <Moon size={24} className="text-atmosphere-300" strokeWidth={2} />
                        ) : (
                            <Sun size={24} className="text-sunset-600" strokeWidth={2} />
                        )}
                    </div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
