const redirect_uri_production = "https://www.snackstyling.com/home";
const productionLinks = {
  google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=763717891922-6uvpu5p3fn4u6mv45o3uf86nov8ia1cd.apps.googleusercontent.com&redirect_uri=${redirect_uri_production}&response_type=code&scope=email%20profile%20openid&access_type=offline`,
};

const redirect_uri_local = "http://localhost:3000/home";
const localLinks = {
  google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=763717891922-6uvpu5p3fn4u6mv45o3uf86nov8ia1cd.apps.googleusercontent.com&redirect_uri=${redirect_uri_local}&response_type=code&scope=email%20profile%20openid&access_type=offline`,
};

export default process.env.NODE_ENV === "production"
  ? productionLinks
  : localLinks;
