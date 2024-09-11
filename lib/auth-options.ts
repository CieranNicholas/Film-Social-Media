import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Adapter } from 'next-auth/adapters';
import { compare } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import cuid from 'cuid';

import prisma from '@/lib/prisma';

function CustomPrismaAdapter(_prisma: typeof prisma) {
	return {
		...PrismaAdapter(_prisma),
		createUser: (data: User) => {
			const username = `user-${cuid()}`;
			return _prisma.user.create({
				data: {
					...data,
					username,
				},
			});
		},
	};
}

const authOptions: NextAuthOptions = {
	// @ts-ignore
	adapter: CustomPrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) return null;
				if (!user.password) return null;

				const isPasswordValid = await compare(credentials.password, user.password);

				if (!isPasswordValid) return null;

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
				};
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				const _user = user as unknown as User;
				return { ...token, id: _user.id };
			}
			return token;
		},
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
	},
	pages: {
		signIn: '/auth/signIn',
	},
};

export default authOptions;
