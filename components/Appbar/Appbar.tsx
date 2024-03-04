import Link from "next/link";

import SignInBtn from "@/components/signin-btn/signin-btn";

const Appbar = () => {
  return (
    <header className='flex gap-4 p-4 bg-gradient-to-b from-card to-card/90 shadow text-white fixed w-full min-h-20'>
      <SignInBtn />
    </header>
  );
};

export default Appbar;
