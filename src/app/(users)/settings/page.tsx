import auth from "@/middleware";
import SettingsPage from "./provider";

export default async function Page() {
  const session = await auth();
  return (
    <SettingsPage
      email={session?.user?.email ?? ""}
      name={session?.user?.name ?? ""}
    />
  );
}
