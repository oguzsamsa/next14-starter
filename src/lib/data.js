// const users = [
//     {
//         id: 1,  
//         name: "John",},

import { connectToDb } from "./connectToDb";
import { Post, User } from "./models";

//     {    
//         id: 2,  
//         name: "Jane",},
// ]

// const posts = [
//     {
//         id: 1,
//         title: "Post 1",
//         body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus, laudantium officiis dolore minima reiciendis quis cum enim odio assumenda eligendi harum provident illo quidem expedita aut quibusdam accusantium tenetur.",
//         userId: 1
//     },

//     {    
//         id: 2,
//         title: "Post 2",
//         body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed veritatis repudiandae vero non tempore consectetur facilis odit, impedit laborum dolorem tempora optio, aperiam blanditiis repellat praesentium! Reprehenderit minus quaerat architecto!",
//         userId: 2,

//     },
//     {
//         id: 3,
//         title: "Post 3",
//         body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus, laudantium officiis dolore minima reiciendis quis cum enim odio assumenda eligendi harum provident illo quidem expedita aut quibusdam accusantium tenetur.",
//         userId: 1
//     },
//     {
//         id: 4,
//         title: "Post 4",
//         body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus, laudantium officiis dolore minima reiciendis quis cum enim odio assumenda eligendi harum provident illo quidem expedita aut quibusdam accusantium tenetur.",
//         userId: 2
//     }
// ]

export const getPosts = async () => {
    try {
        connectToDb();
        const posts = await Post.find();
        return posts;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getPost = async (slug) => {
    try {
        connectToDb();
        const post = await Post.findOne({slug});
        return post;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getUser = async (id) => {
    try {
        connectToDb();
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getUsers = async () => {
    try {
        connectToDb();
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}