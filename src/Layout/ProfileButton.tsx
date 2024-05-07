import { CLIENT_API_URL } from "../config";
import { JwtUser } from "../schema";
import React from "react";
import { callAsync } from "../utils";
import { clientAPI } from "../api";
import { lang } from "../langs";
import { useRouter } from "next/router";

const ProfileButton: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  const [user, setUser] = React.useState<JwtUser>();

  React.useEffect(() => {
    callAsync(async () => {
      try {
        const jwtUser = await clientAPI.getAuthMe();

        setUser(jwtUser);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <button
        className="px-2 py-3 transition-colors duration-150 hover:text-green-800"
        disabled={loading}
        onClick={() => {
          if (user) callAsync(() => router.push("/profile"));
          else window.location.href = `${CLIENT_API_URL}auth/login`;
        }}
      >
        {user ? user.email : lang.LogIn}
      </button>
    </>
  );
};

export default ProfileButton;
