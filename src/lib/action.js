"use server"

import { revalidatePath } from "next/cache";
import { connectToDb } from "./connectToDb";
import { Post, User } from "./models";

export const addPost = async (prevState, formData) =>{
    const {title, desc, img, slug, userId} = Object.fromEntries(formData);

    try {
    
        await connectToDb();
        const newPost = new Post({
            title,
            desc,
            img,
            slug,
            userId

        })
        await newPost.save();
        console.log("saved to db");
        revalidatePath("blog");
        revalidatePath("admin");
        
    } catch (error) {
        console.log(error);
        return {error: "Something went wrong"}
    }
}

export const deletePost = async (formData) => {
    "use server"
    const {id} = Object.fromEntries(formData);

    try {

        await connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("blog");
        revalidatePath("admin");
        
    } catch (error) {
        console.log(error);
        return {error: "Something went wrong"}
    }
}

export const addUser = async (prevState, formData) =>{
    const {username, email, password, img} = Object.fromEntries(formData);

    try {
        await connectToDb();
        const newUser = new User({
            username,
            email,
            password,
            img
        });
        await newUser.save();
        console.log("saved to db");
        revalidatePath("admin")
    } catch (error) {
        console.log(error)
        return {error: "Something went wrong"}
    }
}

export const deleteUser = async (formData) => {
    const {id} = Object.fromEntries(formData);
    console.log("idmizzz", id)
    try {   
        await connectToDb();
        await Post.deleteMany({userId: id});
        await User.findByIdAndDelete(id);   
        console.log("deleted from db");
        revalidatePath("admin")
    } catch (error) {
        console.log(error);
        return {error: "Something went wrong"}
    }
}