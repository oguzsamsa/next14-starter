import React, { Suspense } from "react";
import styles from "./singlePost.module.css";
import Image from "next/image";
import PostUser from "@/components/postUser/postUser";
import { getPost } from "@/lib/data";

// const fetchData = async (slug) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const data = await res.json();
//   return data;
// };

export async function generateMetadata({ params }) {
  const { slug } = params;
  try {
    const post = await getPost(slug);
    return {
      title: post?.title || "Default Title",
      description: post?.desc || "Default Description",
    };
  } catch (error) {
    console.error("Error fetching post for metadata", error);
    return {
      title: "Error fetching post",
      description: "Failed to load post description",
    };
  }
}

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  let post = await getPost(slug);

  // const post = await fetchData(slug);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={post?.img ? post.img : "/about.png"}
          alt=""
          fill
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>{post?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
