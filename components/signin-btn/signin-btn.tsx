'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { UserDataType } from '@/lib/types';
import { getUserDataFromId } from '@/lib/server-actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, User } from 'lucide-react';

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
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={(user?.image as string) || (session?.user.image as string)} />
					<AvatarFallback className='border-2 text-xs bg-red-500 uppercase'>{user?.username ? user.username[0] : '?'}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<Link href={`/${user?.username}`}>
					<DropdownMenuItem>
						<User className='mr-2 h-4 w-4' />
						<span>Profile</span>
					</DropdownMenuItem>
				</Link>
				<Link href='/profile/settings'>
					<DropdownMenuItem>
						<Settings className='mr-2 h-4 w-4' />
						<span>Settings</span>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem onClick={() => signOut()}>
					<LogOut className='mr-2 h-4 w-4' />
					<span>Sign Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SignInBtn;
