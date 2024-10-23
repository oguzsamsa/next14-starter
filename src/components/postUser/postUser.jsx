import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

// const fetchData = async (userId) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${userId}`,
//     { cache: "no-store" }
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const data = await res.json();
//   return data;
// };

const PostUser = async ({ userId }) => {
  // const user = await fetchData(userId);
  const user = await getUser(userId);
  return (
    <div className={styles.container}>
      <Image
        src={user?.img ? user.img : "/noavatar.png"}
        className={styles.avatar}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user?.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
