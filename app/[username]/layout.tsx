"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: { username: string };
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { username } = useParams();
  const pathname = usePathname();

  const [showFollowNav, setShowFollowNav] = useState(false);

  useEffect(() => {
    setShowFollowNav(
      pathname.includes("followers") || pathname.includes("following")
    );
  }, []);

  return <>{children}</>;
};

export default ProfileLayout;
