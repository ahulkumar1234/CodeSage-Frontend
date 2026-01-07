import axios from 'axios';
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs';
import "prismjs/components/prism-javascript";
import toast from 'react-hot-toast';
import Editor from "@monaco-editor/react";
import MoonLoader from "react-spinners/MoonLoader";
import { NavLink } from 'react-router-dom';


const CodeReviewPage = () => {


    const [input, setinput] = useState(`function add(a, b) {
  return a + b;
}
`)
    const [codeData, setCodeData] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            const res = await axios.post('http://localhost:3000/api/v1/generate', { code: input }, { withCredentials: true })
            setCodeData(res.data.data.result)
            console.log(res.data.data.result)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            toast.error("Request limit reached server is busy!");
            setLoading(false)
        }
    }

    useEffect(() => {
        Prism.highlightAll();
    }, [codeData])


    return (
        <>
            <div className="flex flex-col p-5 md:p-10 gap-6 bg-gradient-to-tl from-green-500/55 to-black min-h-screen">

                {/* 🔥 TITLE & DESCRIPTION (FULL WIDTH ALWAYS) */}
                <div className="w-full">
                    <h1 className="text-white text-center text-2xl md:text-3xl font-bold tracking-widest">
                        CodeSage – AI Code Reviewer
                    </h1>
                    <p className="text-gray-300 mt-2 text-xs md:text-sm text-center flex max-w-2xl mx-auto justify-center items-center tracking-widest">
                        Built an AI-powered code review platform using React, Node.js, MongoDB, and Google Gemini API that allows users to submit code and receive instant reviews with syntax highlighting.
                    </p>
                    <div className='auth-btn-container w-full flex justify-center items-center mt-4'>
                    <NavLink to='/auth' className='auth-btn bg-gradient-to-tl from-green-500/55 to-black  text-white cursor-pointer px-10 py-2 rounded-4xl'>Get Started</NavLink>
                    </div>
                </div>

                {/* 🔥 EDITOR + OUTPUT */}
                <div className="flex flex-col md:flex-row gap-4">

                    {/* LEFT: EDITOR */}
                    <div className="border rounded-xl pb-2 p-5 bg-zinc-900 border-gray-600 w-full md:w-[40%] flex flex-col">
                        <Editor
                            height="70vh"
                            theme="vs-dark"
                            language="javascript"
                            value={input}
                            onChange={(value) => setinput(value || "")}
                        />

                        <form onSubmit={handleSubmit} className="flex justify-end mt-2">
                            <button
                                disabled={loading}
                                className={`${loading
                                    ? "cursor-not-allowed opacity-55"
                                    : "cursor-pointer active:scale-95 transition-all duration-300"
                                    } px-6 py-2 rounded-lg text-sm bg-gradient-to-tr from-green-500/55 to-transparent text-white`}
                            >
                                {loading ? "Reviewing..." : "Review"}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: OUTPUT */}
                    <div className="border rounded-xl overflow-y-auto bg-zinc-800 border-gray-500 w-full md:w-[60%] min-h-[60vh]">
                        {loading ? (
                            <div className="flex flex-col justify-center items-center h-full text-gray-300 min-h-[60vh]">
                                <MoonLoader color="white" size={35} />
                                <p className="text-sm text-gray-500 mt-2">
                                    This may take a moment...
                                </p>
                            </div>
                        ) : (
                            <div className="p-5 text-gray-300 text-md">
                                <ReactMarkdown>{codeData}</ReactMarkdown>
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </>
    )
}

export default CodeReviewPage