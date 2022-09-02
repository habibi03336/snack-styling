import Rain from "../../../assets/weather/rain.png";
import RainSun from "../../../assets/weather/rain_sun.png";
import Snow from "../../../assets/weather/snow.png";
import Cloud from "../../../assets/weather/cloud.png";
import CloudSun from "../../../assets/weather/cloud_sun.png";
import Sun from "../../../assets/weather/sun.png";

const weaterImgMapper = {
  rain: Rain,
  sun: Sun,
  rainSun: RainSun,
  cloud: Cloud,
  cloudSun: CloudSun,
  snow: Snow,
};

const WeatherIcon = ({
  weather,
}: {
  weather: "rain" | "sun" | "rainSun" | "cloud" | "cloudSun" | "snow";
}) => {
  return (
    <div style={{ height: "66px", width: "66px" }}>
      <img
        style={{ height: "63px", width: "63px" }}
        src={weaterImgMapper[weather]}
      />
    </div>
  );
};
export default WeatherIcon;
