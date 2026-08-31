// Navigation footer
// Put links to other pages here

import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

export default function Footer(){
    

    return (
        <footer className="border-t border-footer-border bg-footer py-8 mt-auto">
            <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
                <nav className="flex flex-wrap justify-center gap-3">
                    <Link href="/dashboard/closed-return" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Closed Return
                    </Link>

                    <span className="text-sm text-gray-400">|</span>

                    <Link href="/dashboard/open-return" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Open Return
                    </Link>

                    <span className="text-sm text-gray-400">|</span>

                    <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Contact
                    </Link>
                </nav>
                <ThemeSwitcher/>
            </div>
        </footer>
    )
}