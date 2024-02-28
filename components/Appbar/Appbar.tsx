import Link from "next/link";

import SignInBtn from "@/components/signin-btn/signin-btn";

const Appbar = () => {
  return (
    <header className='flex gap-4 p-4 bg-gradient-to-b from-neutral-800 to-neutral-800 shadow text-white'>
      <SignInBtn />
    </header>
  );
};

export default Appbar;
