// Global accesstoken
let accessToken = '';
export const setAccessToken = (s: string) => {
  accessToken = s;
};
export const getAccessToken = () => accessToken;
