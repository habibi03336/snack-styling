export default process.env.NODE_ENV === "production"
  ? {
      mediaAPI: "https://d1564b71azzs0j.cloudfront.net",
      imgAPI: "http://img.snackstyling.com",
      api: "http://api.snackstyling.com",
    }
  : {
      mediaAPI: "http://localhost:8000",
      imgAPI: "http://localhost:8000/api/v1",
      api: "http://localhost:8080/api/v1",
    };
