import { WebcamScanner } from "@/components/scan/webcam-scanner";
import auth from "@/middleware";

export default async function Page() {
  const session = await auth();

  console.log(session, "askdaks");
  return <WebcamScanner token={session!.tokenId} />;
}
