const initialState = {
  List: [],
  CurrentContact: null,
  StatusUser: ["Friend", "Work", "Private", "Family", "None"],
  findContact: "",
  nameSearch: "Name",
  renderList: true,
};

const ContactListReducer = (state = initialState, action) => {
  console.log("action=>", action);
  switch (action.type) {
    // -----------------------
    case "LIST_LOADED":
      return {
        ...state,
        List: action.payload,
      };
    // -----------------------
    case "LIST_ADD":
      return {
        ...state,
        List: action.payload,
        renderList: false,
      };
    // -----------------------
    case "LIST_EDIT":
      return {
        ...state,
        CurrentContact: action.payload,
      };
    // -----------------------
    case "DELETE_CONTACT":
      return {
        ...state,
        List: action.payload,
      };
    // -----------------------
    case "SEARCH_VALUE":
      return {
        ...state,
        findContact: action.payload,
      };
    // -----------------------
    case "SEARCH_NAME":
      return {
        ...state,
        nameSearch: action.payload,
      };
    // -----------------------
    default:
      return state;
  }
};
export default ContactListReducer;
