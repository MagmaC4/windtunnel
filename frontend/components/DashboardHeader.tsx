"use client";
import { usePathname } from "next/navigation";
import Image from 'next/image'

export default function DashboardHeader(){

    // determine which wind tunnel name based on url
    const pathname = usePathname();
    const name = pathname.includes("/open-return")
      ? "Open"
      : "Closed";

    return(

        <div className="bg-header border-header-border border-b-1 p-4 flex flex-row items-center justify-between">
            <div className="relative shrink-0 w-32 h-32">
                <Image
                    src="/umn-logo.png"
                    fill={true}
                    alt="aem logo"
                    className="object-contain"
                />
            </div>

            <a
            href="https://cse.umn.edu/aem/aem-wind-tunnel"
            target="_blank"
            className="flex flex-col justify-center text-right font-bold text-header-text text-[clamp(1rem,4vw,2.25rem)]"
            >
                <span className="text-xl truncate"> University of Minnesota Department of Aerospace Engineering and Mechanics </span>
                <span className="truncate"> {name} Return Wind Tunnel Dashboard </span>

            </a>
        </div>

    )


}