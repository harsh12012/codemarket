import {
  SET_CREATE_FORM,
  SET_UPDATE_FORM,
  SET_VIEW_FORM,
  SET_ALL_FORM_DATA,
  NEW_DATA,
  UPDATE_FORM_DATA,
  DELETE_FORM_DATA,
} from "../actions/formBuilder";

const formBuilder = (
  state = { type: "view", data: {}, allFormData: [] },
  action
) => {
  switch (action.type) {
    case SET_CREATE_FORM:
      return {
        ...state,
        type: "create",
        data: {},
      };
      break;

    case SET_UPDATE_FORM:
      return { ...state, type: "update", data: action.data };
      break;

    case SET_VIEW_FORM:
      return { ...state, type: "view", data: {} };
      break;

    case NEW_DATA:
      return { ...state, allFormData: [...state.allFormData, action.data] };
      break;
    case UPDATE_FORM_DATA:
      return {
        ...state,
        allFormData: state.allFormData.map((f) =>
          f._id === action.data._id ? action.data : f
        ),
      };

    case SET_ALL_FORM_DATA:
      return { ...state, allFormData: action.data };
      break;

    case DELETE_FORM_DATA:
      return {
        ...state,
        allFormData: state.allFormData.filter((f) => f._id !== action.id),
      };
      break;

    default:
      return state;
  }
};
export default formBuilder;
