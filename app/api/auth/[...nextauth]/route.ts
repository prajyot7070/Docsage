import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: "Ov23liaWfiONWQ48PGhG",
      clientSecret:  "0936c7d4029e04dd464459cee5964f1cfed78e9c",
    }),
  ],
  secret: "LONG_SECRET", // Add a secret for session encryption
});

export { handler as GET, handler as POST };
