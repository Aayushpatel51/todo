import React,{useState, useContext} from 'react'
import noteContext from "../context/notes/noteContext";

const Addnotes = () => {
    const context = useContext(noteContext);
    const { addNotes } = context;

    const [note, setNote] = useState({ title:"",description:"",tag:""});
    const handleClick = (e) =>{
        e.preventDefault();
        addNotes(note.title,note.description,note.tag);
    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h1> Addnotes </h1>
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <input type="text" name="description" className="form-control" id="description" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Tags</label>
                <input type="text" name="tag" className="form-control" id="tag" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default Addnotes
