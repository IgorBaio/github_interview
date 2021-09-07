import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";

export default combineReducers({
  alert: alertReducer,
  form: formReducer,
  user: userReducer,
});
