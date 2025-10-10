import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import NewsCarousel from "@/components/blog/NewsCarousel";
import { FooterNav } from "@/components/footer-nav";
import auth from "@/middleware";
import Image from "next/image";
import CardScan from "./components/card-scan";
import Provider from "./components/provider";
import { getQueryClient } from "@/app/get-query-client";
import { getDashboard } from "@/lib/api/dashboard";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for waste classification project",
};

export default async function Page() {
  const session = await auth();
  const queryClient = getQueryClient();

  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  const latestPosts = posts.slice(0, 5);

  await queryClient.prefetchQuery({
    queryKey: ["dashboard", session?.tokenId],
    queryFn: async () => getDashboard(session?.tokenId ?? ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className="border-border bg-background/80 sticky top-0 z-10 flex items-center justify-between border-b p-4 backdrop-blur-lg">
        <div>
          <p className="text-muted-foreground">Selamat Datang,</p>
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
        </div>
        <div className="bg-muted h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={session?.user?.image ?? ""}
            className="h-full w-full rounded-full object-cover"
            alt="User"
            width={48}
            height={48}
          />
        </div>
      </header>

      <main className="mb-20 space-y-6 p-4">
        <CardScan />

        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Newspaper className="h-6 w-6" />
              Berita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NewsCarousel posts={latestPosts} />
          </CardContent>
        </Card>

        <Provider token={session?.tokenId ?? ""} />
      </main>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-10 bg-white">
        <FooterNav />
      </div>
    </HydrationBoundary>
  );
}
