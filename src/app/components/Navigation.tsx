"use client";
import React from "react";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";

export const Navigation = ({ session }: { session: Session | null }) => {
  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
        <Link href="/" className="font-medium text-xl cusor-pointer">
          Supabase Auth Test
        </Link>
        {/* session の状態で出し分け */}
        <div className="text-sm">
          {session ? (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login">プロフィール</Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login">ログイン</Link>
              <Link href="/auth/signup">サインアップ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
