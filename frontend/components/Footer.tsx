// Navigation footer
// Put links to other pages here

import Link from 'next/link';

export default function Footer(){
    

    return (
        <footer className="border-t border-black bg-neutral-950 py-8 mt-auto">
            <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
                <nav className="flex flex-wrap justify-center gap-6">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Home
                    </Link>
                    <Link href="/gauge" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Gauge
                    </Link>

                    <Link href="/chart" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Chart
                    </Link>
                    <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Dashboard
                    </Link>
                </nav>
            </div>
        </footer>
    )
}