import {
    Sun, CloudSun, Cloud, CloudFog, CloudDrizzle,
    CloudRain, CloudLightning, Snowflake, HelpCircle
} from 'lucide-react';

const iconMap = {
    Sun,
    CloudSun,
    Cloud,
    CloudFog,
    CloudDrizzle,
    CloudRain,
    CloudLightning,
    Snowflake,
    HelpCircle
};

const WeatherIcon = ({ iconName, size = 24, color = 'currentColor', style = {} }) => {
    const Icon = iconMap[iconName] || HelpCircle;
    return <Icon size={size} color={color} style={style} />;
};

export default WeatherIcon;
