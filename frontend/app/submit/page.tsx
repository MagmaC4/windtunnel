// app/submit/page.tsx

import Form from 'next/form'
import Card from '@/components/Card'

export default function Page(){
    return(
        <div className="text-center">
            <Card className="min-h-[50%]">
                <p className="text-6xl font-bold">
                    Enter Air Speed (m/s)
                </p>
                <input type="text" className="bg-background rounded-md mt-6"/>
                <input type="submit" className="hover:font-bold m-6"/>
            </Card>
        </div>
    )}