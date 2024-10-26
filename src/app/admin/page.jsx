import React, { Suspense } from "react";
import styles from "./adminPage.module.css";
import AdminPosts from "@/components/admin/adminPosts/page";
import AdminPostForm from "@/components/admin/adminPostForm/page";
import AdminUsers from "@/components/admin/adminUsers/page";
import AdminUserForm from "@/components/admin/adminUserForm/page";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminPostForm />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
