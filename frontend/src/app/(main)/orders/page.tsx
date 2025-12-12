"use client";

import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderStatusPage() {
  const steps = [
    "Sipariş Alındı",
    "Hazırlanıyor",
    "Servise Hazırlanıyor",
    "Servise Çıktı",
    "Teslim Edildi",
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const percentage = ((progress + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-4 bg-[#fff6cc]">
      <h1 className="text-3xl font-bold text-[#483C32]">Pizza Takip</h1>

      <div className="w-60 h-60">
        <CircularProgressbar
          value={percentage}
          text={steps[progress]}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: "#facc15", // Sarı
            trailColor: "#d9d9d9", // Arka plan
            textColor: "#483C32",
            textSize: "16px",
          })}
        />
      </div>

      <Link href="/">
        <Button className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-2 px-4 rounded-2xl">
          Ana Sayfaya Dön
        </Button>
      </Link>
    </div>
  );
}
