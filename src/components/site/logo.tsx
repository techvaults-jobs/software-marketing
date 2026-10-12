import Image from "next/image"
import logo from "../../../public/brand/techvaults.png"

export function Logo({ className }: { className?: string }) {
  return <Image src={logo} alt="TechVaults" priority className={className ?? "h-9 w-auto"} />
}
