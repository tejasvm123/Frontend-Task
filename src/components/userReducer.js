export const initialState = {
    editedUser: null,
  };
  
  export const userReducer = (state, action) => {
    switch (action.type) {
      case "SET_EDITED_USER":
        return { ...state, editedUser: action.payload };
      case "CLEAR_EDITED_USER":
        return { ...state, editedUser: null };
      default:
        return state;
    }
  };
  