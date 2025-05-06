import NextAuth from "next-auth"
import authOptions from "@/extra/auth/authOptions";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }