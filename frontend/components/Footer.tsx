// Navigation footer
// Put links to other pages here

import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import { TbArrowsRight } from "react-icons/tb";
import { TbChartArrows } from "react-icons/tb";
import { MdContactEmergency } from "react-icons/md";

export default function Footer(){
    

    return (
        <footer className="border-t bg-footer border-footer-border text-footer-text text-sm py-8 mt-auto transition-colors">
            <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
                <nav className="flex flex-wrap justify-center gap-2 md:gap-6">
                    <Link href="/dashboard/open-return" className="flex items-center gap-2 hover:text-footer-text/60 transition-colors">
                        <TbArrowsRight /> Open Return
                    </Link>

                    <span className="">|</span>

                    <Link href="/dashboard/closed-return" className="flex items-center gap-2 hover:text-footer-text/60 transition-colors">
                        <TbChartArrows /> Closed Return
                    </Link>

                    <span className="text-sm">|</span>

                    <Link href="/contact" className="flex items-center gap-2 hover:text-footer-text/60">
                        <MdContactEmergency/> Contact
                    </Link>
                </nav>
                <ThemeSwitcher/>
            </div>
        </footer>
    )
}