import React, { useReducer, createContext } from "react";

const NoteContext = createContext();

const noteReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { ...state, notes: state.notes.concat(action.payload) };
    case "remove":
      return { ...state, notes: state.notes.filter(note => note.key !== action.payload.key)};
    case "edit":
      return {
        ...state,
        notes: state.notes.map(note => 
          note.key === action.payload.key ? { ...note, title: action.payload.title, description: action.payload.description } : note
        ) 
      };
    default:
      return { ...state };
  }
};
const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, { notes: [] });

  const add = (data) => {
    dispatch({ type: "add", payload: data });
  };

  const remove = (key) => {
    dispatch({ type: "remove", payload: key });
  };

  const edit = (data) => {
    dispatch({ type: "edit", payload: data });
  };

  return (
    <NoteContext.Provider value={{state, add, remove, edit}}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
