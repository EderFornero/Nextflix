import Navbar from "@/components/shared/Navbar/Navbar";
import SliderVideo from "./(routes)/(home)/components/SliderVideo/SliderVideo";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { auth } from "@/auth";


export default async function Home() {

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return redirect("/login");
  }

  const userNextflix = await db.userNextflix.findMany({
    where: {
      userId: session.user.id,
    }
  })

  console.log("usernetflix", userNextflix)

  return (
    <div className="relative bg-zinc-900">
      <Navbar />
      <SliderVideo />
    </div>
  );
}
