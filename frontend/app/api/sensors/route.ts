import pool from "@/lib/db";

interface SensorData {
  rpm: number;
  windSpeed: number;
  temp: number;
  pressure: number;
}

export async function GET() {

    // return zeros as placeholder api call
    var data : SensorData = {
        rpm: 0,
        windSpeed: 0,
        temp: 0,
        pressure: 0,
    }

    return Response.json(data);
}