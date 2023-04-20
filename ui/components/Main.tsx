import 'react-quill/dist/quill.snow.css'
import { useRef, useState } from "react"
import { PhotographIcon } from "@heroicons/react/outline"
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function Main() {
    const filePickerRef: any = useRef(null)
    const [thumbnail, setThumbnail] = useState(null)
    function getThumbnail(e: any) {
        const reader = new FileReader()
        let file = e.target.files[0]
        let type = file.type
        let name = file.name
        if (file) {
            reader.readAsDataURL(file)
        }
        reader.onload = (readEvent: any) => {
            if (type == "image/jpeg" || type == "image/jpg" || type == "image/png" || type == "image/webp") {
                setThumbnail(readEvent.target.result)
            }
        }
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const [content, setContent] = useState("")
    return(
        <div className="w-full max-w-2xl">
            <div className="w-full">
                <div className="space-y-5 h-full mb-40">
                    <div className="space-y-2.5">
                        <h4 className="text-lg font-semibold">Name of post</h4>
                        <input
                            type="text"
                            placeholder="Enter name of post"
                            className="w-full bg-black border border-gray-500 !outline-none p-2.5 mt-2"
                        />
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-lg font-semibold">Description of post</h4>
                        <textarea
                            placeholder="Enter name of post"
                            className="w-full bg-black border border-gray-500 !outline-none p-2.5 mt- h-32"
                        />
                    </div>
                    <div>
                        {
                            thumbnail ? <img
                                src={thumbnail}
                                className="w-full h-96 cursor-pointer"
                                onClick={() => setThumbnail(null)}
                            /> : (
                                <div className="w-full h-40 bg-black border border-gray-500 flex flex-col items-center justify-center hover:cursor-pointer"
                                    onClick={() => filePickerRef?.current?.click()}>
                                    <PhotographIcon className="w-10 h-10 text-gray-500" />
                                    <h4 className="text-lg font-semibold text-gray-500">Enter post thumbnail</h4>
                                    <input type="file" ref={filePickerRef} onChange={e => getThumbnail(e)} hidden />
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
                </div>
            </div>
        </div>
    )
}