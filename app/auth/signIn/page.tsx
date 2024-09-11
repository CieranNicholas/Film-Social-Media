'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signIn, useSession } from 'next-auth/react';
import { createUser, getUserDataFromId } from '@/lib/server-actions';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
	const { data: session } = useSession();
	const { toast } = useToast();
	const router = useRouter();
	type ActiveTabType = 'login' | 'signup';
	const [activeTab, setActiveTab] = useState<ActiveTabType>('login');

	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	});

	const [signupForm, setSignupForm] = useState({
		name: '',
		email: '',
		password: '',
		username: '',
		confirmPassword: '',
	});

	useEffect(() => {
		const fetchUserData = async () => {
			if (!session) return;
			const user = await getUserDataFromId(session.user.id);
			return user;
		};
		fetchUserData()
			.then((res: any) => {
				const data = res.data;
				if (data.username) {
					router.push(`/${data.username}`);
				}
			})
			.catch((err) => console.error(err));
	}, [session]);

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const res: any = await signIn('credentials', {
			email: loginForm.email,
			password: loginForm.password,
			redirect: false,
		});
	};

	const handleGoogleLogin = async () => {
		const res: any = await signIn('google');
	};

	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { name, email, username, password, confirmPassword } = signupForm;
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		const res: any = await createUser(name, username, email, password);
		if (res.success) {
			toast({
				description: 'Account created successfully',
			});
			await signIn('credentials', {
				email,
				password,
			});
		} else {
			toast({
				variant: 'destructive',
				description: res.error,
			});
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-background'>
			<div className='w-[300px]'>
				<Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as ActiveTabType)}>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='login'>Login</TabsTrigger>
						<TabsTrigger value='signup'>Sign Up</TabsTrigger>
					</TabsList>
					<TabsContent value='login'>
						<form onSubmit={handleLogin}>
							<div className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										id='email'
										type='email'
										required
										onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
										value={loginForm.email}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='password'>Password</Label>
									<Input
										id='password'
										type='password'
										required
										value={loginForm.password}
										onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
									/>
								</div>
							</div>
							<Button type='submit' className='w-full mt-4'>
								Login
							</Button>
						</form>
						<Button variant='secondary' className='w-full mt-4 flex items-center justify-center gap-4' onClick={handleGoogleLogin}>
							<FcGoogle className='text-lg' />
							<p>Sign In With Google</p>
						</Button>
					</TabsContent>
					<TabsContent value='signup'>
						<form onSubmit={handleSignUp}>
							<div className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='name'>Name</Label>
									<Input
										id='name'
										type='text'
										required
										value={signupForm.name}
										onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='name'>Username</Label>
									<Input
										id='name'
										type='text'
										required
										value={signupForm.username}
										onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										id='email'
										type='email'
										required
										value={signupForm.email}
										onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='password'>Password</Label>
									<Input
										id='password'
										type='password'
										required
										value={signupForm.password}
										onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='confirmPassword'>Confirm Password</Label>
									<Input
										id='confirmPassword'
										type='password'
										required
										value={signupForm.confirmPassword}
										onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
									/>
								</div>
							</div>
							<Button type='submit' className='w-full mt-4'>
								Sign Up
							</Button>
						</form>
						<Button variant='secondary' className='w-full mt-4 flex items-center justify-center gap-4' onClick={handleGoogleLogin}>
							<FcGoogle className='text-lg' />
							<p>Sign Up With Google</p>
						</Button>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default LoginPage;
