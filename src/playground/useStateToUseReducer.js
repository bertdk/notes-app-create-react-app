import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

const notesReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_NOTES":
      return action.notes;
    case "ADD_NOTE":
      return [...state, { title: action.title, body: action.body }];
    case "REMOVE_NOTE":
      return state.filter((note) => note.title !== action.title);
    default:
      console.log(state);
      return state;
  }
};

const NoteApp = () => {
  //const [notes, setNotes] = useState([]);
  const [notes, dispach] = useReducer(notesReducer, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    dispach({ type: "ADD_NOTE", title, body });
    // setNotes([
    //   ...notes,
    //   {
    //     title,
    //     body,
    //   },
    // ]);
    setTitle("");
    setBody("");
  };

  const removeNote = (title) => {
    dispach({ type: "REMOVE_NOTE", title });
    // setNotes(notes.filter((note) => note.title !== title));
  };

  useEffect(() => {
    const notes = JSON.parse(window.localStorage.getItem("notes"));
    if (notes) {
      dispach({ type: "POPULATE_NOTES", notes });
      // setNotes(notesData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}
      <p>Add your notes</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button>Add note</button>
      </form>
    </div>
  );
};

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log("Setting up effect");
    return () => {
      console.log("Clean up effect");
    };
  }, []);

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};
