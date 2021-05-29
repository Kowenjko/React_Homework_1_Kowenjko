// -----------Загрузка контактів-----------------------
export const getContacts = (list) => {
  return {
    type: "LIST_LOADED",
    payload: list,
  };
};

// -----------Додавання контакту----------------------------
export const onAddContact = (newContact) => {
  return {
    type: "LIST_ADD",
    payload: newContact,
  };
};

// -----------Редагування контакту-----------------------
export const onEditContact = (newContact) => {
  return {
    type: "LIST_EDIT",
    payload: newContact,
  };
};
// -----------Видалення контакту-----------------------
export const onDeleteContact = (delContact) => {
  return {
    type: "DELETE_CONTACT",
    payload: delContact,
  };
};
// -----------Запис Value із search----------------------
export const onSearchValue = (value) => {
  return {
    type: "SEARCH_VALUE",
    payload: value,
  };
};
// -----------Пибираємо де шукаємо-----------------------
export const onSearchName = (value) => {
  return {
    type: "SEARCH_NAME",
    payload: value,
  };
};
