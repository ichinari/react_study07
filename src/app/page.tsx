"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { pageStyles } from "./page.styles";
import { useUser } from "./context/UserContext";

export default function Home() {
  const [shouldNavigate, setShouldNavigate] = useState(false); // 画面へ遷移するかどうか

  const router = useRouter();
  const { userName, setUserName, setStartTime } = useUser();

  const handleStart = () => {
    if (!userName.trim()) return;

    // ゲーム開始処理追加
    setStartTime(Date.now());

    // ゲーム画面へ遷移
    setShouldNavigate(true);
  };

  useEffect(() => {
    if (shouldNavigate) {
      router.push("/game");
    }
  }, [shouldNavigate, router]); // shouldNavigateが変更されたときに実行

  return (
    <main className={pageStyles.start.main}>
      <div className={pageStyles.start.container}>
        <h1>タイピングゲームへようこそ！</h1>
        <label htmlFor="userName" className={pageStyles.start.label}>
          名前
        </label>
        <input
          id="userName"
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
