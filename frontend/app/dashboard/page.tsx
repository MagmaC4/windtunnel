// this is the home page
// it will redirect you to the dashboard

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard/closed-return");
}