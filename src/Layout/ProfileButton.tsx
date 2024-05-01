import { API_URL } from "../config";
import React from "react";
import { callAsync } from "../utils";
import { lang } from "../langs";
import { useRouter } from "next/router";
import zod from "zod";

const ProfileButton: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  const [user, setUser] =
    React.useState<zod.infer<typeof MeValidationSchema>>();

  React.useEffect(() => {
    callAsync(async () => {
      try {
        const response = await fetch(`${API_URL}auth/me`, {
          credentials: "include"
        });

        const json = (await response.json()) as unknown;

        if (json) setUser(MeValidationSchema.parse(json));
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
          else window.location.href = `${API_URL}auth/login`;
        }}
      >
        {user ? user.email : lang.LogIn}
      </button>
    </>
  );
};

export default ProfileButton;

const MeValidationSchema = zod.object({
  email: zod.string().email()
});
