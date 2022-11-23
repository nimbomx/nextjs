import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
        name: "Credentials",

      async authorize(credentials) {
        console.log('start:Auth')
        const client = await connectToDatabase();
        console.log('connected')
        const usersCollection = client.db().collection('users');
        console.log('serCollection')
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        console.log('findUser')
        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }
        console.log('passwordValidated')

        client.close();
        console.log('end:Auth')
        return { email: user.email };
        
      },
    }),
  ],
});
