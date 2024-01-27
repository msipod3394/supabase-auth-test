"use server";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import { Navigation } from "./Navigation";

// ログイン状態の監視用コンポーネント
export const SupabaseListener = async () => {
  // クッキーを使用して Supabaseクライアントを作成
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッション情報を取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <Navigation session={session} />;
};
