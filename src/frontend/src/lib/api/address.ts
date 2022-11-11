export default process.env.NODE_ENV === "production"
  ? {
      mediaAPI: "https://d1564b71azzs0j.cloudfront.net",
      imgAPI: "https://img.snackstyling.com/api/v1",
      api: "https://api.snackstyling.com/api/v1",
    }
  : {
      mediaAPI: "http://localhost:8000",
      imgAPI: "http://localhost:8000/api/v1",
      api: "http://localhost:8080/api/v1",
    };
