"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  return (
    <main className="p-4">
      <div className="mb-4 flex items-center gap-4">
        <Link href="/profile">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Pengaturan Akun</h1>
      </div>
      <Card className="bg-card border-border gap-2 py-6 shadow-lg">
        <CardHeader>
          {/* CardTitle can be removed if the title is already in the header */}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nama Pengguna</Label>
            <Input id="username" defaultValue={name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={email} />
          </div>
          <Button className="w-full">Simpan Perubahan</Button>
        </CardContent>
      </Card>
    </main>
  );
}
