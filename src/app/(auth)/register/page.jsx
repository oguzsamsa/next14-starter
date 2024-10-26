import { connectToDb } from "@/lib/connectToDb";
import styles from "./register.module.css";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
import RegisterForm from "@/components/registerForm/registerForm";

const Register = () => {
  const register = async (previousState, formData) => {
    "use server";
    const data = Object.fromEntries(formData);
    const { username, email, password, img, passwordRepeat } = data;

    if (password !== passwordRepeat) {
      return {
        error: "Passwords do not match",
      };
    }

    try {
      await connectToDb();
      const user = await User.findOne({ username });
      if (user) {
        return {
          error: "Username already exists",
        };
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
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterForm register={register} />
      </div>
    </div>
  );
};

export default Register;
