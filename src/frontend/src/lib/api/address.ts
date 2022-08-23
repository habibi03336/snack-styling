export default process.env.NODE_ENV === "production"
  ? {
      imgAPI: "",
      api: "",
    }
  : {
      imgAPI: "http://localhost:8000",
      api: "http://localhost:8080",
    };
