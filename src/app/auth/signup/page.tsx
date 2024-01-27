import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Signup } from "@/app/components/signup";
import type { Database } from "@/lib/database.types";

const SignupPage = async () => {
    // クッキーを使用して Supabaseクライアントを作成
    const supabase = createServerComponentClient<Database>({
      cookies,
    });
  
    // セッション情報を取得
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    // ログイン中であれば、Homeへリダイレクト
    if (session) {
      redirect("/");
    }

    return <Signup />;
};
export default SignupPage;
