"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth/authStore";
import { reissue } from "@/lib/auth";

interface Props {
  children: ReactNode;
}

export default function ProtectedPage({ children }: Props) {
  const searchParams = useSearchParams();
  const { isInitialized, setInitialized, token } = useAuthStore();
  const initializedRef = useRef(false);
  const [loading, setLoading] = useState(true);

  const checkSocialLogin = () => {
    const signUpRequired = searchParams.get("sign-up-required");

    if (signUpRequired === "true") {
      window.location.replace(
        `/set-nickname?email=${searchParams.get("email")}`
      );
      return;
    }
  };

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;

      const checkAuth = async () => {
        if (!token) {
          await reissue()
            .then(() => {})
            .catch(() => {
              window.location.replace("/login");
            });

          setInitialized(true);
          setLoading(false);
        }
      };

      checkSocialLogin();
      checkAuth();
    }
  }, []);

  if (loading || !isInitialized) return null;

  return <>{children}</>;
}
