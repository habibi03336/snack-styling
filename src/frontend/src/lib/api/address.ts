export default process.env.NODE_ENV === "production"
  ? {
      imgAPI: "",
      api: "",
    }
  : {
      imgAPI: "http://localhost:4000",
      api: "",
    };
