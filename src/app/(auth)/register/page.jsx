import { connectToDb } from "@/lib/connectToDb";
import styles from "./register.module.css";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

const Register = () => {
  const register = async (formData) => {
    "use server";
    const data = Object.fromEntries(formData);
    const { username, email, password, img, passwordRepeat } = data;

    if (password !== passwordRepeat) {
      throw new Error("Passwords do not match");
    }

    try {
      await connectToDb();
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      console.log("Kayıt sırasında oluşturulan hash:", hash); // Hash'i kontrol edelim

      const newUser = new User({
        username,
        email,
        password: hash,
        img,
      });
      await newUser.save();
      console.log("Kaydedilen kullanıcı:", {
        username,
        email,
        hashedPassword: hash,
        img,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} action={register}>
          <input type="text" placeholder="username" name="username" />
          <input type="text" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <input
            type="password"
            placeholder="confirm password"
            name="passwordRepeat"
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
