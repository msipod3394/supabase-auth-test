"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "./loading";
import * as z from "zod";
import { Database } from "@/lib/database.types";
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(4, { message: "4文字以上入力する必要があります" }),
});

// ログインフォーム
export const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // フォームの状態管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: "", password: "" },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      // supabaseへログイン
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      // エラーチェック
      if (error) {
        setMessage("エラーが発生しました" + error.message);
        return;
      }

      // ログインが成功したら、トップページに遷移
      router.push("/");
    } catch (error) {
      setMessage("エラーが発生しました" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="text-center font-bold text-xl mb-10">ログイン</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレス */}
        <input
          type="email"
          className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
          placeholder="メールアドレス"
          id="email"
          {...register("email", { required: true })}
        />
        <div className="my-3 text-center text-sm text-red-500">
          {errors.email?.message}
        </div>
        {/* パスワード */}
        <input
          type="password"
          className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
          placeholder="パスワード"
          id="password"
          {...register("password", { required: true })}
        />
        <div className="my-3 text-center text-sm text-red-500">
          {errors.password?.message}
        </div>
        {/* ログインボタン */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
            >
              ログイン
            </button>
          )}
        </div>
      </form>

      {/* エラーメッセージ */}
      {message && (
        <p className="my-5 text-center text-sm text-red-500">{message}</p>
      )}

      {/* パスワードを忘れた方はこちら */}
      <div className="text-center text-sm mb-5">
        <Link href="/auth/reset-password" className="text-gray-500 font-bold">
          パスワードを忘れた方はこちら
        </Link>
      </div>

      {/* 新規アカウントを作成する */}
      <div className="text-center text-sm mb-5">
        <Link href="/auth/signup" className="text-gray-500 font-bold">
          新規アカウントを作成する
        </Link>
      </div>
    </div>
  );
};
