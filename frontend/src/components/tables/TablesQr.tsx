"use client";

import { getTables } from "@/services/TableService";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "../ui/button";
import jsPDF from "jspdf";

type Table = {
  id: string;
  name: string;
  codeQR: string;
  isActive: boolean;
};

export default function TableQr() {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    getTables().then((data) => setTables(data));
  }, []);

  const handlePdf = async () => {
    const pdf = new jsPDF();

    const qrSize = 55;
    const cols = 3;
    const startX = 15;
    const startY = 50;
    const gapX = 10;
    const gapY = 15;

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      const col = i % cols;
      const row = Math.floor(i / cols);

      if (i > 0 && i % 9 === 0) {
        pdf.addPage();
      }

      const x = startX + col * (qrSize + gapX);
      const y = startY + (row % 3) * (qrSize + gapY + 10);

      pdf.setFontSize(20);
      pdf.text(`Masa ${table.name}`, x + qrSize / 2, y - 6, {
        align: "center",
      });

      const svg = document.getElementById(`qr-${table.id}`) as HTMLElement;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const svgData = new XMLSerializer().serializeToString(
        svg.querySelector("svg")!
      );

      const img = new Image();
      img.src = "data:image/svg+xml;base64," + btoa(svgData);

      await new Promise((resolve) => {
        img.onload = () => {
          canvas.width = 160;
          canvas.height = 160;
          ctx?.drawImage(img, 0, 0);
          const imgData = canvas.toDataURL("image/png");
          pdf.addImage(imgData, "PNG", x, y, qrSize, qrSize);
          resolve(null);
        };
      });
    }

    pdf.save("masalarQR.pdf");
  };

  return (
    <div className="bg-[#fff6cc] p-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center w-full">
        {tables.map((table) => (
          <div
            key={table.id}
            className="rounded-xl p-4 flex flex-col items-center gap-4 bg-[#483C32] text-white w-full max-w-[260px]"
          >
            <h3 className="text-lg font-bold">Masa {table.name}</h3>
            <div id={`qr-${table.id}`} className="bg-white p-2 rounded-lg">
              <QRCode value={table.codeQR} size={140} />
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handlePdf}
        className="w-full bg-[#483C32] mt-5 cursor-pointer"
      >
        Tümünü Pdf'e Dönüştür
      </Button>
    </div>
  );
}
