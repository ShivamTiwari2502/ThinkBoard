import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

function Notedetail() {
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  async function handleDelete() {
    if (window.confirm("Do you want to delete this note ?")) {
      try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted successfully");
        navigate("/");
      } catch (err) {
        console.log(err)
        toast.error("Failed to delete the note");
      }
    }
  }

  async function handleSave() {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and Content should not be empty");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      console.log("try block is working")
      setSaving(false);
      toast.success("note updated")
      navigate("/");
    } catch (err) {
      console.log(err, "error saving note");
      toast.error("Failed to save changes")
    }
    finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch the note");
      }
      finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [id])

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full m-2"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32 w-full m-2"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Notedetail
