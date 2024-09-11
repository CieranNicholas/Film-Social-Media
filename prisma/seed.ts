import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
	const password = await hash('test', 12);
	await prisma.user.create({
		data: {
			email: 'test@test.com',
			name: 'Test User',
			username: 'test_user',
			password,
		},
	});
}

seed()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
