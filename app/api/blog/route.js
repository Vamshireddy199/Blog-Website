import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import {writeFile} from 'fs/promises'
const fs = require('fs');

const LoadDB = async () => {
  await ConnectDB();
  console.log("DB Connected");
}

LoadDB();




export async function GET(request) {
  
  const blogId = request.nextUrl.searchParams.get('id');
  if(blogId){
    try {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
          return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(blog);
  } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Invalid ID or internal error' }, { status: 500 });
  }
  }
  else{
    const blogs = await BlogModel.find({});
    return NextResponse.json({blogs});
  }
 
  
}

export async function POST(request) {
  
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get('image');
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path,buffer);
  const imgUrl=`/${timestamp}_${image.name}`;

  const authorImg = formData.get('authorImg');
  const authorImgByteData = await authorImg.arrayBuffer();
  const abuffer = Buffer.from(authorImgByteData);
  const apath = `./public/${timestamp}_${authorImg.name}`;
  await writeFile(apath,abuffer);
  const authorImgUrl=`/${timestamp}_${authorImg.name}`;
  
  const blogData = {
    title:`${formData.get('title')}`,
    description:`${formData.get('description')}`,
    category:`${formData.get('category')}`,
    author:`${formData.get('author')}`,
    image:`${imgUrl}`,
    authorImg:`${authorImgUrl}`
  }

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({success:true,msg:"Blog Added"});
  
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`,()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted"});
  
}
