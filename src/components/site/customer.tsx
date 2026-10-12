import Image from "next/image"
import abuTwins from "../../../public/customers/abu-twins.jpg"

export function AbuTwinsMark({ size = 40 }: { size?: number }) {
  return <Image src={abuTwins} alt="Abu Twins" width={size} height={size} className="rounded-full" />
}
