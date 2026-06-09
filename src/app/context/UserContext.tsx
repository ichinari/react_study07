"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type UserContextValue = {
  userName: string;
  setUserName: (name: string) => void;
  startTime: number;
  setStartTime: (time: number) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState("");
  const [startTime, setStartTime] = useState<number>(0); // ゲーム開始時間

  return (
    <UserContext.Provider
      value={{ userName, setUserName, startTime, setStartTime }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
