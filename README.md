# 🌦️ Interactive Weather Forecast App

A beautiful, modern weather application with stunning animations and interactive elements. Built with React, Tailwind CSS, and Framer Motion.

![Weather App](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Latest-FF0080)

## ✨ Features

### 🎨 Design
- **Unique Typography**: Fraunces (display) + Instrument Sans (body)
- **Weather-Themed Backgrounds**: Dynamic gradients that change based on weather conditions
  - ☀️ Sunny: Vibrant blue-purple gradient
  - 🌧️ Rainy: Dark storm gradient  
  - ☁️ Cloudy: Gray gradient
  - ❄️ Snow: Light blue gradient
- **Glassmorphism**: Advanced backdrop blur effects
- **Dark/Light Mode**: Seamless theme switching

### 🎭 Interactive Elements
- **3D Flippable Forecast Cards**: Click to reveal detailed weather info
- **Animated Stat Cards**: Interactive cards for wind, humidity, temperature, visibility
- **Floating Weather Icon**: Smooth animations with hover effects
- **Temperature Display**: Massive 240px display with glow effects
- **Animated Clouds**: Floating clouds across the interface

### 🌈 Weather Effects
- ☔ **Rain Animation**: Physics-based falling droplets
- ☀️ **Teletubbies Sun**: Rotating sun with smiling face
- 💨 **Air Bending Wind**: Flowing wind curves (Avatar-inspired)

### 📊 Weather Data
- Real-time weather information via OpenMeteo API
- 7-day forecast
- Current conditions (temperature, wind, humidity)
- City search with autocomplete

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/weather-app.git

# Navigate to project directory
cd weather-app

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

The app will be available at `http://localhost:5173`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

## 🛠️ Tech Stack

- **React 18.3** - UI framework
- **Vite** - Build tool
- **Tailwind CSS 3.4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **OpenMeteo API** - Weather data
- **date-fns** - Date formatting

## 📦 Packages Used

\`\`\`json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "latest",
    "lucide-react": "latest",
    "date-fns": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.17"
  }
}
\`\`\`

## 🎯 Key Features Breakdown

### Flippable Forecast Cards
Each forecast card uses CSS 3D transforms to create a flip animation:
- **Front**: Shows day, icon, and temperatures
- **Back**: Shows detailed weather information
- Click/tap to flip

### Dynamic Backgrounds
The background gradient changes based on actual weather conditions from the API, creating an immersive experience.

### Interactive Statistics
Hover over wind, humidity, temperature, or visibility cards to see:
- Scale transformation
- Gradient overlays
- Icon rotation
- Color transitions

## 📱 Responsive Design

Fully responsive across all devices:
- Mobile: 2-column forecast grid
- Tablet: 3-column forecast grid
- Desktop: 7-column forecast grid

## 🌐 API

Uses the free [OpenMeteo API](https://open-meteo.com/):
- No API key required
- Geocoding for city search
- 7-day weather forecast
- Current weather conditions

## 🎨 Color Palette

### Atmosphere (Blues)
- Light to dark indigo shades
- Used for backgrounds and accents

### Sunset (Oranges)
- Warm coral and peach tones
- Used for highlights and gradients

### Storm (Grays)
- Rich neutrals
- Used for text and secondary elements

## 📄 License

MIT License - feel free to use this project for learning or your own applications!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐ if you like this project!

---

**Built with ❤️ and lots of animations**
