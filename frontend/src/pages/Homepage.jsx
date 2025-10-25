// import axios from "axios";
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RatelimitUi from '../components/RatelimitUi';
import toast from 'react-hot-toast'
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from '../components/NotesNotFound';

function Homepage() {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // const res = await axios.get("http://localhost:5001/api/notes");
                const res = await api.get("/notes");
                setNotes(res.data);
                console.log(res.data);
                setIsRateLimited(false)
            } catch (error) {
                console.log("error fetching notes");
                if (error.response.status === 429) {
                    setIsRateLimited(true);
                }
                else {
                    toast.error("request can not be processed");
                }
            }
            finally {
                setLoading(false)
            }
        }
        fetchNotes();
    }, [])

    return (
        <div className='min-h-screen '>
            <Navbar />
            {
                isRateLimited && <RatelimitUi />
            }
            <div className="max-w-7xl mx-auto p-4 mt-6 ">
                {
                    loading && <div className="text-center text-primary py-10">Loading notes....</div>
                }
                {
                    notes.length === 0 && !isRateLimited && <NotesNotFound />
                }
                {
                    notes.length > 0 && !isRateLimited && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notes.map(note => <NoteCard key={note._id} note={note} setNotes={setNotes} />
                            )}

                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Homepage
