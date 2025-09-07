"use client";

import { useEffect, useRef, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/authStore";
import { reissue, socialLogin } from "@/lib/auth";

interface Props {
  children: ReactNode;
}

export default function ProtectedPage({ children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isInitialized, setInitialized, token } = useAuthStore();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || isInitialized) return;
    initializedRef.current = true;
    const code = searchParams.get("code");
    const signUpRequired = searchParams.get("sign-up-required");
    
    
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

    const initializeAuth = async () => {
      if (code) {
        try {
          await socialLogin(code);
          router.replace("/dashboard", { scroll: false });
        } catch (error) {
          console.error("Social login failed:", error);
          window.location.replace("/login");
        } finally {
          setInitialized(true);
        }
        return;
      }

      if (signUpRequired === "true") {
        window.location.replace(
          `/set-nickname?email=${searchParams.get("email")}`
        );
        return;
      }

      if (token) {
        setInitialized(true);
        return;
      } else {
        checkAuth();
      }

     
    };

    initializeAuth();

  }, []);

  if (!isInitialized) return null;

  return <>{children}</>;
}
