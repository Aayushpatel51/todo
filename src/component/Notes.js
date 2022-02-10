import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";
import Addnotes from "./Addnotes";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null)
  
  const [note, setNote] = useState({etitle:"", edescription:"", etag:""});
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };
  const handleClick = (e) =>{
    e.preventDefault();
  }
  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <Addnotes />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" onChange={onChange}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <input type="text" name="edescription" className="form-control" value={note.edescription} id="edescription" onChange={onChange}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Tags</label>
                  <input type="text" name="etag" className="form-control" id="etag" value={note.etag} onChange={onChange}/>
              </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary"  onClick={handleClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitems key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
