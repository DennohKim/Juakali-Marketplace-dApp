import { FC, ReactNode } from "react";
import Header from "./Header";
import AddProductModal from "./AddProductModal";
import { Lexend as FontSans } from "next/font/google";
import CheckoutModal from "./CheckoutModal";
import ClientOnly from "./ClientOnly";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <ClientOnly>
      <style jsx global>
        {`
          :root {
            --font-sans: ${fontSans.variable};
          }
        `}
      </style>
      <div
        className={`min-h-screen bg-background font-sans antialiased overflow-hidden flex flex-col ${fontSans.variable}`}
      >
        <Header />
        <div className="py-10 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
          <div className="flex justify-between px-2 sm:px-0">
            <AddProductModal />
            <CheckoutModal/>
          </div>

          {children}
        </div>
      </div>
    </ClientOnly>
  );
};

export default Layout;
