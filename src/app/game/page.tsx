"use client";
import { useState } from "react";
import { pageStyles, getContainerStyle, getCharStyle } from "./page.style";

export default function Home() {
  const questions = [
    { content: "React", image: "/img/monster1.jpg" },
    { content: "Next.js", image: "/img/monster2.jpg" },
    { content: "TypeScript", image: "/img/monster3.jpg" },
    { content: "JavaScript", image: "/img/monster4.jpg" },
    { content: "Tailwind", image: "/img/monster5.jpg" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の質問インデックス
  const [currentPosition, setCurrentPosition] = useState(0); // 打刻位置

  // TODO: 後に別ページへ記述を移す予定
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
