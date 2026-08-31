"use client";

import {useState, useEffect} from "react";
import { MdInfoOutline } from "react-icons/md";

// pass in text
// have set show state
// in props, onMouseEnter={() => setShow(true) ... }
// cursor-help
// use span

type InfoTooltipProps = {
    ts: string;
}

export default function InfoTooltip({ts} : InfoTooltipProps){

    {/* info card color */}
    const COLORS = {
        normal : "text-zinc-400",
        normal_hover : "hover:text-zinc-200",
        outdated : "text-red-400",
        outdated_hover : "hover:text-red-200",
    }

    const [show, setShow] = useState(false);
    const [infoColor, setInfoColor] = useState(COLORS.normal);
    const [infoHoverColor, setInfoHoverColor] = useState(COLORS.normal_hover);

    useEffect(() => {
        if (isOutdated(ts)){
            setInfoColor(COLORS.outdated);
            setInfoHoverColor(COLORS.outdated_hover);
        }
        else{
            setInfoColor(COLORS.normal);
            setInfoHoverColor(COLORS.normal_hover);
        }


    }, [ts]);

    {/* Calculate how old the timestamp is in readable time */}
    function timeAgo(timestamp: string): string {
        const diffMs = Date.now() - new Date(timestamp).getTime();
        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return `${seconds}s ago`;
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    function isOutdated(timestamp: string) : boolean {
        const diffMs = Date.now() - new Date(timestamp).getTime();
        const seconds = Math.floor(diffMs / 1000);
        return (seconds > 10 || Number.isNaN(diffMs)) ? true : false;
    }

    return(

        <span
        className="relative inline-block pt-3"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        >
            <MdInfoOutline className={`cursor-help ${infoColor} ${infoHoverColor}`}/>
            {show && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max max-w-xs px-2 py-1 text-xs rounded bg-zinc-800 text-white shadow-lg z-10">
                    {timeAgo(ts)}
                </span>
            )}
        </span>

    )

}