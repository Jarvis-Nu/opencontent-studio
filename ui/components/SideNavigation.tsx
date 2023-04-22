import { gql } from "@apollo/client";
import client from "../utils/apollo-client";
import { useSigner } from "wagmi";
import { useEffect, useState } from "react";
import PostList from "./PostList";
import Loading from "./Loading";
import Empty from "./Empty";

export default function SideNavigation() {
    const { data } = useSigner()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts]: any = useState([])
    const [empty, setEmpty] = useState(false)
    useEffect(() => {
        async function getPosts() {
            try {
                const address: any = await data?.getAddress()
                const { data: posts } = await client.query({
                    query: gql`
                    {
                        posts(where: {owner: "${address}"}) {
                            id
                            name
                        }
                    }
                    `
                })
                setPosts(posts.posts)
                if (posts.posts.length < 1) {
                    setEmpty(true)
                }
                else {
                    setEmpty(false)
                }
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [data])
    if (loading) {
        return <Loading />
    }
    else if (empty) {
        return <Empty />
    }
    else {
        return <div className="w-full min-h-full px-5 border-r border-gray-500"><PostList data={posts} /></div>
    }
}