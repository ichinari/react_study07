"use client";
import { useRouter } from "next/navigation";
import { pageStyles } from "./page.styles";
import { useUser } from "./context/UserContext";

export default function Home() {
  const router = useRouter();

  const { userName, setUserName, setStartTime } = useUser();

  const handleStart = () => {
    if (!userName.trim()) return;

    // ゲーム開始処理追加
    setStartTime(Date.now());

    // ゲーム画面へ遷移
    router.push("/game");
  };

  return (
    <main className={pageStyles.start.main}>
      <div className={pageStyles.start.container}>
        <h1>タイピングゲームへようこそ！</h1>
        <input
          type="text"
          placeholder="ここに名前を入力"
          className={pageStyles.start.input}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <button
        className={pageStyles.start.button}
        onClick={handleStart}
        disabled={!userName.trim()}
      >
        ゲームスタート
      </button>
    </main>
  );
}
