"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth/authStore";
import { reissue } from "@/lib/auth";

interface Props {
  children: ReactNode;
}

export default function ProtectedPage({ children }: Props) {
  const searchParams = useSearchParams();
  const { isInitialized, setInitialized } = useAuthStore();
  const initializedRef = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;

      const checkAuth = async () => {
        try {
          await reissue();
        } catch {
          window.location.href = "/login";
          return;
        } finally {
          setInitialized(true);
        }

        const signUpRequired = searchParams.get("sign-up-required");
        if (signUpRequired === "true") {
          window.location.href = `/set-nickname?email=${searchParams.get("email")}`;
          return;
        }

        setLoading(false);
      };

      checkAuth();
    }
  }, [searchParams, setInitialized]);

  if (loading || !isInitialized) return null;

  return <>{children}</>;
}
