import RPMGauge from "@/components/gauges/RPMGauge";

export default function Page(){
    return (
        <main>
            <div className="flex justify-center items-center  h-screen py-16">
                <div >
                    <RPMGauge/>
                </div>
            </div>
        </main>
    )
}