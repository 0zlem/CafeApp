"use client";

import { OrderStatus } from "@/enums/OrderStatus";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const steps = [
  { label: "Sipariş Oluşturuldu", status: OrderStatus.Created },
  { label: "Sipariş Hazırlanıyor", status: OrderStatus.Preparing },
  { label: "Sipariş Hazır", status: OrderStatus.Ready },
  { label: "Sipariş Servis Edildi", status: OrderStatus.Served },
];

export default function OrderStatusTimeline({
  status,
}: {
  status: OrderStatus;
}) {
  const currentIndex = steps.findIndex((s) => s.status === status);

  const percentage =
    currentIndex === -1 ? 0 : ((currentIndex + 1) / steps.length) * 100;

  const currentLabel = steps[currentIndex]?.label ?? "Durum Bilinmiyor";

  return (
    <div className="w-50 h-50 mx-auto">
      <CircularProgressbar
        value={percentage}
        text={currentLabel}
        strokeWidth={11}
        styles={buildStyles({
          pathColor: "#facc15",
          trailColor: "#e5e7eb",
          textColor: "#483C32",
          textSize: "9px",
          pathTransitionDuration: 0.6,
        })}
      />
    </div>
  );
}
