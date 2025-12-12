import { CartProvider } from "@/components/CardContext";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartProvider>
        <Navbar />
        {children}
      </CartProvider>
    </>
  );
}
