'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { UserDataType } from '@/lib/types';
import { getUserDataFromId } from '@/lib/server-actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const SignInBtn = () => {
	const { data: session } = useSession();

	const [user, setUser] = useState<UserDataType | undefined>(undefined);

	useEffect(() => {
		(async () => {
			if (session) {
				const res = await getUserDataFromId(session.user.id);
				if (!res.success) return;
				setUser(res.data);
			}
		})();
	}, [session]);

	if (!session && !user) {
		return (
			<div className='flex gap-4 items-center'>
				<Button onClick={() => signIn()} variant='default'>
					Sign In
				</Button>
			</div>
		);
	}

	return (
		<div className='flex gap-4 items-center'>
			<Link href={`/${user?.username}`} className='w-[32px] h-[32px] rounded-full overflow-hidden'>
				<img
					className='w-full h-full object-cover object-center'
					src={(user?.image as string) || (session?.user.image as string)}
					alt='?'
				/>
			</Link>
			<Button onClick={() => signOut()} variant='destructive'>
				Sign Out
			</Button>
		</div>
	);
};

export default SignInBtn;
