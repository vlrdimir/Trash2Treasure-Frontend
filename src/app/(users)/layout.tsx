import { FooterNav } from "@/components/footer-nav";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground min-h-screen pb-24">
      <div className="mx-auto max-w-md">
        {children}
        <FooterNav />
      </div>
    </div>
  );
}

export default Layout;
