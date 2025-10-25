import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/Utils'
import api from '../lib/axios'
import toast from "react-hot-toast";

function NoteCard({ note, setNotes }) {
    async function handleDelete(e, noteId) {
        e.preventDefault();
        if (window.confirm("Do you want to delete this note ?")) {
            console.log(noteId)
            try {
                await api.delete(`/notes/${noteId}`);
                toast.success("Note deleted successfully");
                setNotes((prev) => prev.filter(note => note._id !== noteId));
            } catch (error) {
                toast.error("failed to delete")
                console.log(error, "failed to delete")
            }
        }
        else {
            console.log("Note deletion cancelled");
        }
    }
    return (
        <Link to={`/note/${note._id}`}
            className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4  border-solid border-[#00ff9D]'>
            <div className='card-body'>
                <h3 className='card-title text-base-content'>
                    {note.title}
                </h3>
                <p className='text-base-content/70 line-clamp-3'> {note.content} </p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60 '>
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className='size-4' />
                        <button onClick={(e) => { handleDelete(e, note._id) }} className='btn btn-ghost btn-xs text-error'>
                            <Trash2Icon className='size-4 ' />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard
