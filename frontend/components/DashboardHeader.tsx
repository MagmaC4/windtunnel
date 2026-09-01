"use client";
import { usePathname } from "next/navigation";
import { FaWind } from "react-icons/fa";

export default function DashboardHeader(){

    // determine which wind tunnel name based on url
    const pathname = usePathname();
    const name = pathname.includes("/open-return")
      ? "Open"
      : "Closed";

    return(
        <div className="bg-header border-header-border border-b-1 p-4">
            <p className="flex justify-center gap-4 font-bold text-header-text text-2xl md:text-4xl">
                <FaWind />
                <span className="truncate"> {name} Return Wind Tunnel Dashboard </span>
                <FaWind className="scale-x-[-1]" />
            </p>
        </div>

    )


}