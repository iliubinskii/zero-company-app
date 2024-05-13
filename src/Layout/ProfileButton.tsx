import { CLIENT_API_URL } from "../config";
import React from "react";
import { callAsync } from "../utils";
import { lang } from "../langs";
import { useJwtUser } from "../contexts";
import { useRouter } from "next/router";

const ProfileButton: React.FC = () => {
  const router = useRouter();

  const { jwtUser } = useJwtUser();

  return (
    <div className="w-30 flex justify-end">
      <button
        className="px-2 py-3 transition-colors duration-150 hover:text-green-800"
        onClick={() => {
          if (jwtUser) callAsync(() => router.push("/profile"));
          else window.location.href = `${CLIENT_API_URL}auth/login`;
        }}
      >
        {jwtUser ? lang.Profile : lang.LogIn}
      </button>
    </div>
  );
};

export default ProfileButton;
