import Link from "next/link";

import SignInBtn from "@/components/signin-btn/signin-btn";

const Appbar = () => {
  return (
    <header className='flex gap-4 p-4 bg-gradient-to-b from-card to-card/90 shadow text-white fixed w-full'>
      <SignInBtn />
    </header>
  );
};

export default Appbar;
