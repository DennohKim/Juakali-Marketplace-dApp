import { FC, ReactNode } from "react";
import Header from "./Header";
import AddProductModal from "./AddProductModal";
import { Lexend as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface Props {
    children: ReactNode
}
const Layout: FC<Props> = ({children}) => {
    return (
      <>
        <div
          className={cn(
            "min-h-screen bg-background font-sans antialiased overflow-hidden flex flex-col",
            fontSans.variable
          )}
        >
          <Header />
          <div className="py-10 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
            <AddProductModal />

            {children}
          </div>
        </div>
      </>
    );
}

export default Layout;