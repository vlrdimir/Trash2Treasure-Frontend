import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Settings, HelpCircle } from "lucide-react";
import Link from "next/link";
import { FooterNav } from "@/components/footer-nav";
import auth from "@/middleware";

const menuItems = [
  { href: "/settings", icon: Settings, label: "Pengaturan Akun" },
  { href: "/about", icon: HelpCircle, label: "Tentang Aplikasi" },
];

export default async function Page() {
  const session = await auth();

  return (
    <>
      <main className="space-y-6 p-4">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="h-24 w-24">
            <AvatarImage src={session?.user?.image ?? ""} alt="User" />
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
          <p className="text-muted-foreground">{session?.user?.email}</p>
        </div>

        <Card className="bg-card border-border py-0 shadow-lg">
          <CardContent className="p-2">
            <ul className="divide-border divide-y">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:bg-muted/50 flex items-center justify-between rounded-md p-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="text-muted-foreground h-5 w-5" />
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    <ChevronRight className="text-muted-foreground h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Button
          variant="default"
          className="w-full bg-black text-white hover:bg-black/90"
        >
          Keluar
        </Button>
      </main>
      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-10 bg-white">
        <FooterNav />
      </div>
    </>
  );
}
