export const SET_CREATE_FORM = "SET_CREATE_FORM";
export const SET_UPDATE_FORM = "SET_UPDATE_FORM";
export const SET_VIEW_FORM = "SET_VIEW_FORM";
export const SET_ALL_FORM_DATA = "SET_ALL_FORM_DATA";
export const NEW_DATA = "NEW_DATA";
export const DELETE_FORM_DATA = "DELETE_FORM_DATA";
export const UPDATE_FORM_DATA = "UPDATE_FORM_DATA";

export function setCreateForm() {
  return {
    type: SET_CREATE_FORM,
  };
}

export function setUpdateForm(data) {
  return {
    type: SET_UPDATE_FORM,
    data,
  };
}

export function setViewForm() {
  return {
    type: SET_VIEW_FORM,
  };
}
export function setAllFormData(data) {
  return {
    type: SET_ALL_FORM_DATA,
    data,
  };
}
export function newData(data) {
  return {
    type: NEW_DATA,
    data,
  };
}
export function updateFormData(data) {
  return {
    type: UPDATE_FORM_DATA,
    data,
  };
}
export function deleteFormData(id) {
  return {
    type: DELETE_FORM_DATA,
    id,
  };
}
