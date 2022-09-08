const validEmail = (email: string) => {
  const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  return result;
};

const validPwd = (pwd: string) => {
  return pwd.length > 2;
};

export { validEmail, validPwd };
