"use client";

import React, { useEffect } from "react";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = ({ register }) => {
  const [state, formAction] = useFormState(register, 0);
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="confirm password"
        name="passwordRepeat"
      />
      <button>Register</button>
      {state?.error && <p>{state.error}</p>}
      <Link href="/login">
        {" "}
        Have an account ? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
