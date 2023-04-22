import 'react-quill/dist/quill.snow.css'
import { useRef, useState } from "react"
import { PhotographIcon } from "@heroicons/react/outline"
import dynamic from 'next/dynamic'
import { formats, modules } from '../constants/constants'
import { Web3Storage } from "web3.storage"
import connectContract from '../utils/connectContract'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function Main() {
    const postFilePickerRef: any = useRef(null)
    const authorFilePickerRef: any = useRef(null)
    const [name, setName] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [description, setDescription] = useState("")
    const [postThumbnail, setPostThumbnail] = useState("")
    const [postThumbnailName, setPostThumbnailName] = useState("")
    const [postThumbnailType, setPostThumbnailType] = useState("")
    const [authorThumbnail, setAuthorThumbnail] = useState("")
    const [authorThumbnailName, setAuthorThumbnailName] = useState("")
    const [authorThumbnailType, setAuthorThumbnailType] = useState("")
    const [content, setContent] = useState("")
    const [publishing, setPublishing] = useState(false)
    const [published, setPublished] = useState(false)
    const [unsupportedImage, setUnsupportedImage] = useState(false)

    async function uploadPostThumbnail() {
        const blob = new Blob([postThumbnail], { type: postThumbnailType })
        const file = [new File([blob], postThumbnailName)]
        const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || "" })
        return await client.put(file)
    }

    async function uploadAuthorThumbnail() {
        const blob = new Blob([authorThumbnail], { type: authorThumbnailType })
        const file = [new File([blob], authorThumbnailName)]
        const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || "" })
        return await client.put(file)
    }
    
    function getPostThumbnail(e: any) {
        const reader = new FileReader()
        let file = e.target.files[0]
        let type = file.type
        let name = file.name
        if (file) {
            reader.readAsDataURL(file)
        }
        reader.onload = (readEvent: any) => {
            if (type == "image/jpeg" || type == "image/jpg" || type == "image/png" || type == "image/webp") {
                setPostThumbnail(readEvent.target.result)
                setPostThumbnailName(name)
                setPostThumbnailType(type)
            }
            else {
                setUnsupportedImage(true)
            }
        }
    }

    function getAuthorThumbnail(e: any) {
        const reader = new FileReader()
        let file = e.target.files[0]
        let type = file.type
        let name = file.name
        if (file) {
            reader.readAsDataURL(file)
        }
        reader.onload = (readEvent: any) => {
            if (type == "image/jpeg" || type == "image/jpg" || type == "image/png" || type == "image/webp") {
                setAuthorThumbnail(readEvent.target.result)
                setAuthorThumbnailName(name)
                setAuthorThumbnailType(type)
            }
            else {
                setUnsupportedImage(true)
            }
        }
    }

    async function publishContent() {
        setPublishing(true)
        const contract = connectContract()
        let postThumbnailCid = await uploadPostThumbnail()
        let authorThumbnailCid = await uploadAuthorThumbnail()
        let postThumbnailUrl = "https://"+postThumbnailCid+".ipfs.w3s.link/"+postThumbnailName
        let authorThumbnailUrl = "https://"+authorThumbnailCid+".ipfs.w3s.link/"+authorThumbnailName
        const date = new Date()
        try {
            if(contract) {
                setPublishing(true)
                const txn = await contract.createNewPost([name, description, postThumbnailUrl, authorName, authorThumbnailUrl, content, date.toLocaleDateString()])
                if (txn) {
                    let wait = txn.wait()
                    if (wait) {
                        setPublished(true)
                        setTimeout(() => {
                            setPublishing(false)
                            setPublished(false)
                        }, 5000);
                    }
                    else {
                        setPublished(false)
                    }
                }
                else {
                    setPublishing(false)
                }
            }
            else {
                setPublishing(false)
            }
        } catch (error) {
            setPublishing(false)
            setPublished(false)
        }
    }

    function disableButton() {
        if (published) {
            return false
        }
        else if (publishing) {
            return true
        }
        else if (unsupportedImage) {
            return true
        }
        else {
            return false
        }
    }

    function status() {
        if (published) {
            return "Published!"
        }
        else if (publishing) {
            return "Publishing..."
        }
        else if (unsupportedImage) {
            return "Error: Unsupported image"
        }
        else {
            return "Publish post"
        }
    }

    return(
        <div className="w-full max-w-2xl">
            <div className="w-full">
                <div className="space-y-5 h-full mb-24">
                    <div className="space-y-2.5">
                        <h4 className="text-lg font-semibold">Name of post</h4>
                        <input
                            type="text"
                            placeholder="Enter name of post"
                            className="w-full bg-black border border-gray-500 !outline-none p-2.5 mt-2"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-lg font-semibold">Description of post</h4>
                        <textarea
                            placeholder="Enter name of post"
                            className="w-full bg-black border border-gray-500 !outline-none p-2.5 mt- h-32"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-lg font-semibold">Name of Author</h4>
                        <input
                            type="text"
                            placeholder="Enter name of author"
                            className="w-full bg-black border border-gray-500 !outline-none p-2.5 mt-2"
                            onChange={e => setAuthorName(e.target.value)}
                        />
                    </div>
                    <div>
                        {
                            postThumbnail ? <img
                                src={postThumbnail}
                                className="w-full h-96 cursor-pointer"
                                onClick={() => setPostThumbnail("")}
                            /> : (
                                <div className="w-full h-40 bg-black border border-gray-500 flex flex-col items-center justify-center hover:cursor-pointer"
                                    onClick={() => postFilePickerRef?.current?.click()}>
                                    <PhotographIcon className="w-10 h-10 text-gray-500" />
                                    <h4 className="text-lg font-semibold text-gray-500">Post thumbnail</h4>
                                    <input type="file" ref={postFilePickerRef} onChange={e => getPostThumbnail(e)} hidden />
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            authorThumbnail ? <img
                                src={authorThumbnail}
                                className="w-full h-96 cursor-pointer"
                                onClick={() => setAuthorThumbnail("")}
                            /> : (
                                <div className="w-full h-40 bg-black border border-gray-500 flex flex-col items-center justify-center hover:cursor-pointer"
                                    onClick={() => authorFilePickerRef?.current?.click()}>
                                    <PhotographIcon className="w-10 h-10 text-gray-500" />
                                    <h4 className="text-lg font-semibold text-gray-500">Thumbnail of author</h4>
                                    <input type="file" ref={authorFilePickerRef} onChange={e => getAuthorThumbnail(e)} hidden />
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={data => setContent(data)}
                            placeholder={"Write something awesome..."}
                            className="h-64"
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div className='w-full'>
                        <button className='w-full bg-black mt-10 border-white border p-2.5' onClick={() => publishContent()}
                        disabled={disableButton()}>
                            {status()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
