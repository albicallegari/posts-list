import { FormState } from "../common/common.models";

const formReducer = (state: FormState, action: any) => {
    switch (action.type) {
      case "HANDLE_INPUT_TEXT":
        return {
          ...state,
          [action.field]: action.payload,
        };
      case "RESET_FORM":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default formReducer;
  