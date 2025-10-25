import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
// import axios from "axios";
import toast from "react-hot-toast";
import api from "../lib/axios.js"

function Createpage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    // console.log(title);
    // console.log(content);

    if (!(title.trim()) || !(content.trim())) {
      toast.error("All fields are required");
      setLoading(false)
      return;
    }

    try {
      await api.post("/notes", {
        title,
        content,
      }
      );
      navigate("/");
    }
    catch (err) {
      console.log(err, "this is the error")
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back To Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4 '>
                Create New Note
              </h2>
              <form onSubmit={(e) => { handleSubmit(e) }} >

                <div className='form-control mb-4 '>
                  <label className='label m-2'>
                    <span className='label-text'>
                      Title
                    </span>
                  </label>
                  <input type='text' placeholder='Note Title' className='input input-bordered w-full' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className='form-control mb-4 '>
                  <label className='label m-2'>
                    <span className='label-text'>
                      Content
                    </span>
                  </label>
                  <textarea placeholder='Write your note here...' className='textarea textarea-bordered h-32 w-full' value={content} onChange={(e) => { setContent(e.target.value) }} />
                </div>

                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={loading} >
                    {
                      loading ? "Creating Note..." : "Create Note"
                    }
                  </button>
                </div>

              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Createpage
