"use client";

import {useState, useEffect} from "react";

export default function StatusBox(){

    // variable that keeps track of status string
    const [status, setStatus] = useState("Off");
    const [textColor, setTextColor] = useState("text-gray-400");

    // constantly fetch the latest rpm reading to detect status
    useEffect(() => {

        // function to fetch status
        const fetchStatus = async () => {
            try {
                const res = await fetch("/api/status")
                const json = await res.json();
                setStatus(json.status);
            }
            catch (error) {
                console.log("Status API call failed")
            }
        };

        fetchStatus(); // fetch immediately on mount

        // set up interval to repeatedly call fetchStatus
        const interval = setInterval(fetchStatus, 1000);

        // cleanup on unmount
        return () => clearInterval(interval);

    }, [])


    // change text color when state changes
    // this could probably change to be a map
    useEffect(() => {
        if (status == "Running"){
            setTextColor("text-green-500")
        }
        else if (status == "Idle"){
            setTextColor("text-amber-500")
        }
        else if (status == "Off"){
            setTextColor("text-[#818cf8]")
        }
    }, [status])


    return (
        <div>
            <p className="text-2xl text-gray-400"> Status </p>
            <p className={`text-8xl font-bold ${textColor}`}> {status} </p>
        </div>

    );
}