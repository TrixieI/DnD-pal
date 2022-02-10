let initState = {
  isLoggedin: false,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedin: action.payload };
    default:
      return { ...state };
  }
};
