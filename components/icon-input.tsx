'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function IconInput() {
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const onIconClick = () => {
		inputRef.current?.focus();
	};
	return (
		<div className='relative w-32 transition-all duration-300 ease-in-out' style={{ width: isFocused ? '280px' : '220px' }}>
			<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-text' onClick={onIconClick} />
			<Input
				ref={inputRef}
				className='pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out'
				placeholder='Search...'
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
		</div>
	);
}
