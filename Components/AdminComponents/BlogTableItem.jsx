import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({authorImg,title,author,date,deleteBlog,mongoId}) => {
    const BlogDate = new Date(date);
    return(
        <tr className="bg-white border-b">
            <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Image  width={40} height={40} src={authorImg?authorImg:assets.profile_icon} />
                <p>{author?author:"No author"}</p>
            </th>
            <td className="px-6 py-4">
                {title?title:"no title"}
            </td>
            <td className="px-6 py-4">
                {BlogDate.toDateString()}
            </td>
            <td onClick = {()=>deleteBlog(mongoId)} className="px-6 py-4 cursor-pointer">
                x
            </td>
            
        </tr>
    )
}

export default BlogTableItem;
