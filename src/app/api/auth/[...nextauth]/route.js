import { connectToDb } from "@/lib/connectToDb";
import { User } from "@/lib/models";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const login = async (credentials) => {
  try {
    await connectToDb();
    
    
    const user = await User.findOne({username: credentials.username});
    
    
    if(!user){
      throw new Error("Wrong credentials");
    }

    
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    
    
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
          const user = await login(credentials);
          return user;
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
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        // GitHub login için admin kontrolü
        if (account?.provider === "github") {
          const dbUser = await User.findOne({ email: profile.email });
          user.isAdmin = dbUser?.isAdmin || false;
        }
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
        await connectToDb();
        
        try {
          const existingUser = await User.findOne({ email: profile.email });
          
          if (!existingUser) {
            const newUser = new User({
              email: profile.email,
              username: profile.login,
              img: profile.avatar_url,
              isAdmin: false // Yeni GitHub kullanıcıları varsayılan olarak admin değil
            });
            await newUser.save();
          }
        } catch (error) {
          console.error("Database save error:", error);
          return false;
        }
      }
      return true;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };