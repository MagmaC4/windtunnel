// Navigation footer

import Link from 'next/link';

export default function Footer(){
    

    return (
        <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
            <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
                <nav className="flex flex-wrap justify-center gap-6">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Home
                    </Link>
                    <Link href="/gauge" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Gauge
                    </Link>
                </nav>
            </div>
        </footer>
    )
}