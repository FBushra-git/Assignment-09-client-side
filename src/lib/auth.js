import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("petAdoptionDB");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },
  
   socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
   },
   session : {
     cookieCache:{
      enabled:true,
      strategy: "jwt",
      maxAge: 15 * 24 * 60 * 60
      }
   },
   plugins: [
    jwt()
   ]
});