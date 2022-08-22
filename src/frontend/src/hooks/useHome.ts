import { useEffect, useState } from "react";

const useHome = () => {
  const today = new Date();
  const todayISO = today.toISOString();
  const [codiOfTheDay, setCodiOfTheDay] = useState({});
  const [weatherOfTheDay, setWeatherOfTheDay] = useState({});
  const [date, setDate] = useState(todayISO);
  //   useEffect(() => {
  //     (async () => {
  //       const res = await new Promise.all([axios({}), axios({})]);

  //       setCodiOfTheDay(res.data.codi);
  //       setWeatherOfTheDay(res.data.weather);
  //     })();
  //   }, [date]);

  return { codiOfTheDay, weatherOfTheDay, date, setDate };
};

export default useHome;
