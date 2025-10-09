import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-md">{children}</div>
    </div>
  );
}

export default Layout;
