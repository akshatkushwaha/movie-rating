const setLoginStatus = (state, action) => {
  return { ...state, ...action.payload };
};

const setLogoutStatus = (state) => {
  return { ...state, active: false };
};

module.exports = { setLoginStatus, setLogoutStatus };
