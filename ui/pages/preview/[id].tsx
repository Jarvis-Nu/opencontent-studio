import { gql } from "@apollo/client";
import Head from "next/head";
import client from "../../utils/apollo-client"
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(import('react-quill'), { ssr: false })

export default function Preview({ post }: any) {
    return (
        <div className="flex justify-center bg-black !text-white">
            <Head>
                <title>{post[0]?.name}</title>
                <meta name="description" content={post[0]?.description} />
                <link rel="icon" href={post[0]?.postThumbnailUrl} />
            </Head>
            <div className="flex flex-col items-center max-w-2xl p-5 space-y-5">
                {
                    post[0]?.postThumbnailUrl && <img src={post[0]?.postThumbnailUrl} className="w-full h-64" />
                }
                <h1 className="text-2xl font-bold">{post[0]?.name}</h1>
                <div className="flex items-center w-full space-x-1.5">
                    <div>
                        <img src={post[0]?.authorThumbnailUrl} className="w-12 h-12 rounded-full" />
                    </div>
                    <div>
                        <p className="font-semibold">Posted by {post[0]?.authorName}</p>
                        <p className="font-semibold">Posted on {post[0]?.date}</p>
                    </div>
                </div>
                <div>
                    <ReactQuill
                        value={post[0]?.content}
                        readOnly={true}
                        theme="bubble"
                    />
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const result = await client.query({
        query: gql`
          {
            posts {
              id
            }
          }
        `
    }).catch((e: any) => console.log(e))
    const lists = result?.data.posts
    const paths: string[] = []
    lists?.map((list: { id: any; }) => paths.push(`/preview/${list.id}`))
    console.log(paths)
    return {
        paths,
        fallback: "blocking"
    }
}

export async function getStaticProps({ params }: any) {
    const id = params?.id
    const result = await client.query({
        query: gql`
          {
            posts(where: { id: "${id}"}) {
              id
              name
              description
              postThumbnailUrl
              authorThumbnailUrl
              content
              date
              authorName
            }
          }
        `
    }).catch((e: any) => console.log(e))
    const post = result?.data.posts
    
    if (post?.length == 0) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post
        },
        revalidate: false
    }
}