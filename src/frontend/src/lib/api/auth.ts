import client from "./client";
import address from "./address";

const baseURL = address["api"] + "/accounts";

export interface ILoginInfo {
  email: string;
  pwd: string;
}

export const AUTH_LOGIN = (loginInfo: ILoginInfo) =>
  client.post(baseURL, loginInfo);

export const AUTH_SOCIAL_LOGIN = (authCode: string) =>
  client.post(address["api"] + "/oauth2/google", { code: authCode });
export interface ISigninInfo {
  email: string;
  pwd: string;
}

export const AUTH_SIGNIN = (signinInfo: ISigninInfo) =>
  client.post(baseURL + `/register`, signinInfo);

export const EMAIL_CONFIRM = (email: string, number: number) =>
  client.post(baseURL + "/mail/confirm", { email, number });

export const EMAIL_SEND = (email: string) =>
  client.post(baseURL + "/mail/send", { email });
