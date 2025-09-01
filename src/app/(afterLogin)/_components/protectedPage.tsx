"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth/authStore";
import { reissue } from "@/lib/auth";

export default function AuthInitializer() {
  const { setInitialized } = useAuthStore();
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const initializeAuth = async () => {
        try {
          await reissue().catch(() => {
            window.location.replace("/login");
          });
        } catch (error) {
          throw error;
        } finally {
          setInitialized(true);
        }
      };

      initializeAuth();
    }
  }, [setInitialized]);

  return null;
}
