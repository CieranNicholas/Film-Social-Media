'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { updatePassword } from '@/lib/server-actions';
import { UserDataType } from '@/lib/types';
import { useState } from 'react';

interface UpdatePasswordFormProps {
	user: UserDataType;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ user }) => {
	const { toast } = useToast();

	const [isPasswordUpdating, setIsPasswordUpdating] = useState<boolean>(false);
	const [currentPassword, setCurrentPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');

	const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newPassword.length < 8) {
			toast({
				variant: 'destructive',
				description: 'Password must be at least 8 characters long',
			});
			return;
		}
		if (!user) return;
		setIsPasswordUpdating(true);
		const res = await updatePassword(user.id, currentPassword, newPassword);
		if (res?.success) {
			toast({
				description: res.message,
			});
			setCurrentPassword('');
			setNewPassword('');
		}
		setIsPasswordUpdating(false);
	};

	return (
		<form className='text-slate-100 p-2 rounded shadow flex flex-col gap-2 justify-center items-start' onSubmit={handleUpdatePassword}>
			{user.password !== null && (
				<>
					<Label htmlFor='currentPassword'>Current Password</Label>
					<Input
						type='password'
						id='currentPassword'
						className='bg-accent'
						onChange={(e) => setCurrentPassword(e.target.value)}
						value={currentPassword}
						disabled={isPasswordUpdating}
					/>
				</>
			)}
			<Label htmlFor='newPassword'>New Password</Label>
			<Input
				className='bg-accent'
				type='password'
				id='newPassword'
				onChange={(e) => setNewPassword(e.target.value)}
				value={newPassword}
				disabled={isPasswordUpdating}
			/>
			<Button type='submit' disabled={isPasswordUpdating}>
				Update Password
			</Button>
		</form>
	);
};

export default UpdatePasswordForm;
