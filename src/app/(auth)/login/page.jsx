"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("github", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Github login error:", error);
      setError("Github login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      console.log("SignIn Result:", result);

      if (result?.error) {
        setError("Username or password is incorrect");
        return;
      }

      if (result?.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          className={styles.github}
          onClick={handleGithubLogin}
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : "Continue with GitHub"}
        </button>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            required
            className=""
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            className=""
            placeholder="Password"
          />
          <button type="submit" disabled={isLoading} className="">
            {isLoading ? "Signing in..." : "Sign in with credentials"}
          </button>
          {error && <p className="">{error}</p>}
          <Link href="/register">
            {" "}
            Don't have an account ? <b>Register</b>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
