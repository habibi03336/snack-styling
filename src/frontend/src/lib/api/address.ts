export default process.env.NODE_ENV === "production"
  ? {
      mediaAPI: "",
      imgAPI: "",
      api: "",
    }
  : {
      mediaAPI: "http://localhost:8000",
      imgAPI: "http://localhost:8000/api/v1",
      api: "http://localhost:8080/api/v1",
    };
