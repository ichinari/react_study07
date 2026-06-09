"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { pageStyles, getContainerStyle, getCharStyle } from "./page.style";

export default function Home() {
  const questions = [
    { content: "React", image: "/img/monster1.jpg" },
    { content: "Next.js", image: "/img/monster2.jpg" },
    { content: "TypeScript", image: "/img/monster3.jpg" },
    { content: "JavaScript", image: "/img/monster4.jpg" },
    { content: "Tailwind", image: "/img/monster5.jpg" },
  ];

  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の質問インデックス
  const [currentPosition, setCurrentPosition] = useState(0); // 打刻位置

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 現在の質問と打刻位置を取得
      const currentQuestion = questions[currentQuestionIndex];

      // 押されたキーが現在の質問の打刻位置に対応する文字と一致するかを確認 (大文字小文字を区別しない)
      if (
        event.key.toLocaleLowerCase() ===
        currentQuestion.content[currentPosition].toLocaleLowerCase()
      ) {
        // 正しいキーが押された場合、打刻位置を進める
        setCurrentPosition((prevPosition) => prevPosition + 1);
      }

      // 打刻位置が現在の質問の文字数に達した場合、次の質問に進む
      if (currentPosition === currentQuestion.content.length - 1) {
        // 全ての質問が完了したかどうかを確認
        if (currentQuestionIndex === questions.length - 1) {
          // TODO: shot soundを再生
          // TODO: 結果をローカルストレージに保存する関数を呼び出す
          router.push("/result");
        } else {
          // 次の質問に進む
          // TODO: shot soundを再生

          setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // 質問インデックスを進める
          setCurrentPosition(0); // 打刻位置をリセット
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className={pageStyles.game.main}>
      <div
        className={pageStyles.game.container}
        style={getContainerStyle(questions[currentQuestionIndex].image)}
      >
        <div>
          {questions[currentQuestionIndex].content
            .split("")
            .map((char, index) => (
              <span key={index} style={getCharStyle(index < currentPosition)}>
                {char}
              </span>
            ))}
        </div>
      </div>
    </main>
  );
}
