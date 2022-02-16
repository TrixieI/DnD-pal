let initState = {
  isLoggedin: false,
  counter: 5,
  level: 1,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedin: action.payload };
    case "INCREASE_COUNT":
      return { ...state, counter: (action.payload += 1) };
    case "DECREASE_COUNT":
      return { ...state, counter: (action.payload -= 1) };
    default:
      return { ...state };
  }
};
