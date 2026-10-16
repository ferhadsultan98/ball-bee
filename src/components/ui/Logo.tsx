import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { cn } from "@/lib/utils";

export function LogoMark({ className, size = 32 }: { className?: string; size?: number }) {
  return <Image src={logo} alt="" width={size} height={size} className={cn("shrink-0 rounded-full bg-[#fffaf0]", className)} />;
}

export function Logo({ className, size = 46 }: { className?: string; size?: number }) {
  return <Image src={logo} alt="BalBee" width={size} height={size} className={cn("shrink-0 rounded-full bg-[#fffaf0]", className)} preload />;
}
