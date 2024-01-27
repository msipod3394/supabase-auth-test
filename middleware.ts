import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // クッキーを使用するように構成された Supabase クライアントの作成
  const supabase = createMiddlewareClient<Database>({ req, res });

  // セッションが期限切れの場合は更新（Server Components に必要）
  await supabase.auth.getSession();

  return res;
}

// ミドルウェアが対象のパスに対してのみ呼び出されるように
export const config = {
  matcher: [
    /*
     * 以下で始まるパス以外のすべてのリクエストパスに一致させる
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化ファイル)
     * - favicon.ico (ファビコンファイル)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
