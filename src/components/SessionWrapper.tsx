// src/components/SessionWrapper.tsx
"use client"; // Mark this component as client-side

import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
