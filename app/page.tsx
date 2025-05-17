import { redirect } from "next/navigation";
import Image from 'next/image';

/**
 * Root page that redirects to onboarding.
 */
export default function Home() {
  redirect("/onboarding");
  return null;
}
