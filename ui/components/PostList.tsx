import Link from "next/link";
import { PostListType } from "../types";

export default function PostList({ data }: PostListType) {
    return(
        <div className="w-full py-2.5">
            {
                data.map(item => <Link key={item.id} href={`/preview/${item.id}`}>
                <p className="w-full hover:bg-gray-500 p-2.5 rounded-md hover:cursor-pointer">{item.name}</p>
                </Link>)
            }
        </div>
    )
}