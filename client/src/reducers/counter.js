const counterReducer = (state = {items:['']}, action) => {
  switch (action.type) {
    default:
      return state;
    case "INCREMENT":
      return state = {
          ...state,
          items: [...state.items,action.payload],
      }
     case "DECREMENT":
      return state.pop;
  }
};
export default counterReducer;
