import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// メインページ
const Home = async () => {
  // クッキーを使用して Supabaseクライアントを作成
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッション情報を取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="text-center text-xl">
      {session ? <div>ログイン中</div> : <div>未ログイン</div>}
    </div>
  );
};

export default Home;
