"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function DashboardHeader() {
    const pathname = usePathname();
    const name = pathname.includes("/open-return") ? "Open" : "Closed";

    return (
        <div className="bg-header border-b border-header-border px-6 py-3 flex flex-row items-center gap-4">
            <div className="relative shrink-0 w-14 h-14">
                <Image
                    src="/umn-logo.png"
                    fill
                    sizes="56px"
                    alt="University of Minnesota Department of Aerospace Engineering and Mechanics logo"
                    className="object-contain"
                />
            </div>

            <a
            href="https://cse.umn.edu/aem/aem-wind-tunnel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-center min-w-0 leading-tight"
            >
                <span className="truncate text-sm text-header-text/70">
                    University of Minnesota Department of Aerospace Engineering and Mechanics
                </span>
                <span className="truncate text-header-text font-semibold text-[clamp(1.125rem,2.5vw,1.75rem)]">
                    {name} Return Wind Tunnel Dashboard
                </span>
            </a>
        </div>
    );
}