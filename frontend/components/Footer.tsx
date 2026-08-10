// Navigation footer
// Put links to other pages here

import Link from 'next/link';

export default function Footer(){
    

    return (
        <footer className="border-t border-footer-border bg-footer py-8 mt-auto">
            <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
                <nav className="flex flex-wrap justify-center gap-6">
                    <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Contact
                    </Link>

                    <Link href="/submit" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Submit
                    </Link>
                </nav>
            </div>
        </footer>
    )
}