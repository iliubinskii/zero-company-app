/* eslint-disable no-process-env -- Necessary to access environment variables */
/* eslint-disable spellcheck/spell-checker -- Necessary to allow custom words like Docuseal */
import { DocusealBuilder } from "@docuseal/react";
import type { JSX } from "react";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const Signature: React.FC = (): JSX.Element => {
  // Импортирование переменных окружения
  const userEmail = process.env["NEXT_PUBLIC_DOCUSEAL_USER_EMAIL"];
  const tokenSecret = process.env["NEXT_PUBLIC_DOCUSEAL_TOKEN"];

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!userEmail || !tokenSecret) {
      // Логирование ошибки, если переменные окружения отсутствуют
      console.error("Missing environment variables for Docuseal");
      return;
    }

    try {
      const generatedToken = jwt.sign(
        {
          document_urls: ["https://www.irs.gov/pub/irs-pdf/fw9.pdf"],
          integration_email: "daniil.berenhstein@gmail.com",
          name: "Integration W-9 Test Form",
          user_email: userEmail
        },
        tokenSecret,
        { algorithm: "HS256" }
      );

      setToken(generatedToken);
    } catch (err) {
      console.error("Error generating token:", err);
    }
  }, [userEmail, tokenSecret]);

  if (!token) return <div>Loading...</div>;

  return (
    <div>
      <h1>Zero Company</h1>
      <DocusealBuilder token={token} />
    </div>
  );
};

export default Signature;
