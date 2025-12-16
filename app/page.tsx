import { UserButton } from "@clerk/nextjs";
import { Button } from "./_components/ui/button"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { dark } from "@clerk/themes";
import Navbar from "./_components/navbar";

const Home = async () => {
  const {userId} = await auth();
  if (!userId) {
    redirect("/login");
  } 
  
  return (
    <Navbar />
  )
};

export default Home;
