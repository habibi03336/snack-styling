import axios from "axios";
import address from "./address";
// axios 요청 클라이언트 생성
const client = axios.create();
// accessToken 헤더에 기본적으로 넣어주기
if (localStorage.getItem("accessToken")) {
  client.defaults.headers.common["Authorization"] = `${localStorage.getItem(
    "accessToken"
  )}`;
} else {
  client.defaults.headers.common["Authorization"] = ``;
}

client.interceptors.request.use((config) => {
  const token =
    config.url?.split("/").pop() === "token"
      ? localStorage.getItem("refreshToken")
      : localStorage.getItem("accessToken");
  if (config.headers) config.headers.Authorization = token ? `${token}` : "";
  return config;
});

// accessToken expire시에 리프레시 토큰으로 새로운 엑세스 토큰 받기
client.interceptors.response.use(
  (response) => {
    // 요청 성공 시 특정 작업 수행
    return response;
  },
  async (error) => {
    // 요청 실패 시 특정 작업 수행
    if (error.response.status === 426) {
      client.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "refreshToken"
      )}`;
      const res = await client.post(address.api + `/accounts/token`);
      localStorage.setItem("accessToken", res.data.accessToken);
    }

    return Promise.reject(error);
  }
);

export default client;
