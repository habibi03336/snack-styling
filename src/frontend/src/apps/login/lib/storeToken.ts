const storeToken = (accessToken: string, refreshToken: string) => {
  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);
  const token = accessToken.split(".");
  const { Key } = JSON.parse(atob(token[1]));
  window.localStorage.setItem("id", Key);

  return Key;
};

export default storeToken;
