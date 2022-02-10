import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  // const s1={
  //     "name": "Aayush",
  //     "class":"Computer"
  // }
  // const [state, setstate] = useState(s1)
  // const update = () => {
  //     setTimeout(() => {
  //         setstate({
  //             "name":"Aayush1",
  //             "class":"BE"
  //         })
  //     }, 1000);
  // }
  const host = "http://localhost:5000";
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);
  //get all Notes
  const getNotes = async () => {
    // make api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MmVkNTljYjNjYjExMDQ3NmQ1YjAzIn0sImlhdCI6MTYzMTg1NDM4NX0.kO_hVZnulYA1m8Wh9BBkLzfgYClgl6DE7OG4cfCHDFs",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json.notes);
  };

  //Add Notes
  const addNotes = async (title, description, tag) => {
    // make api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MmVkNTljYjNjYjExMDQ3NmQ1YjAzIn0sImlhdCI6MTYzMTg1NDM4NX0.kO_hVZnulYA1m8Wh9BBkLzfgYClgl6DE7OG4cfCHDFs"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    setNotes(notes.concat({title, description, tag}));
  };

  //Delete Notes
  const deleteNote = async (id) => {
    // make api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MmVkNTljYjNjYjExMDQ3NmQ1YjAzIn0sImlhdCI6MTYzMTg1NDM4NX0.kO_hVZnulYA1m8Wh9BBkLzfgYClgl6DE7OG4cfCHDFs",
      }
    });
    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id!==id;
    });
    setNotes(newNotes);
  };

  //Edit Notes
  const editNotes = async (id, title, description, tag) => {
    // make api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MmVkNTljYjNjYjExMDQ3NmQ1YjAzIn0sImlhdCI6MTYzMTg1NDM4NX0.kO_hVZnulYA1m8Wh9BBkLzfgYClgl6DE7OG4cfCHDFs",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    //logic to editNotes
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNotes, deleteNote, editNotes, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
