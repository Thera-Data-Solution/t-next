import HomeScreen from "@/components/screen/homePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Scheduler'
}

export default async function Page() {
  return <HomeScreen />
}