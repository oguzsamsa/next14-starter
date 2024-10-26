import { connectToDb } from "@/lib/connectToDb";
import { User } from "@/lib/models";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const login = async (credentials) => {
  try {
    await connectToDb();
    console.log("Gelen credentials:", credentials);
    
    const user = await User.findOne({username: credentials.username});
    console.log("Bulunan kullanıcı:", user);
    
    if(!user){
      throw new Error("Wrong credentials");
    }

    console.log("Karşılaştırılacak şifreler:");
    console.log("Gelen şifre:", credentials.password);
    console.log("DB'deki hash:", user.password);
    
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    console.log("Şifre karşılaştırma sonucu:", isPasswordCorrect);
    
    if(!isPasswordCorrect){
      throw new Error("Wrong credentials");
    }

    const returnUser = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      img: user.img,
      isAdmin: user.isAdmin
    };
    console.log("Döndürülen user objesi:", returnUser);

    return returnUser;
  } catch (error) {
    console.log("Login hatası:", error);
    throw new Error("Failed to login!");
  }
};

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("Authorize başlangıç:", credentials);
          const user = await login(credentials);
          console.log("Login sonrası user:", user);
          
          if (user) {
            return user;
          }
          
          return null;
        } catch (error) {
          console.log("Authorize hata:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  debug: true,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        console.log("Github signin profile:", profile);
        await connectToDb();
        console.log("DB connection established");
        
        try {
          const existingUser = await User.findOne({ email: profile.email });
          console.log("Existing user check:", existingUser);
          
          if (!existingUser) {
            console.log("Creating new user for Github login");
            const newUser = new User({
              email: profile.email,
              username: profile.login,
              img: profile.avatar_url,
            });
            console.log("New user model created");
            await newUser.save();
            console.log("User successfully saved");
          }
        } catch (error) {
          console.error("Database save error:", error);
          return false;
        }
        return true;
      }
      return true;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };