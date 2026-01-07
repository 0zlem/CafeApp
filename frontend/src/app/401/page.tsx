"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[450px] bg-background rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">401</CardTitle>
        </CardHeader>

        <CardContent className="text-center text-lg">
          <p>Bu sayfayı görüntülemek için giriş yapmalısınız!</p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={() => router.push("/login")}
            className="cursor-pointer px-6 py-3 bg-[#483C32] text-white rounded-xl shadow hover:scale-105 transition"
          >
            Giriş Yap
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
