// row of buttons that choose data type
// row of buttons that choose timescale to view chart

import Button from "@/components/Button";

export default function ChartButtons(){


    return(
        <div className="flex flex-row gap-2">
            <Button/>
            <Button/>
            <Button/>
            <Button/>
            <Button/>
            <Button/>
        </div>
    );
}