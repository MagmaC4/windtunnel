// app/api/chart/route.ts

import pool from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

const METRIC_DATABASE_TABLE: Record<string, string> = {
    "RPM": "closed_tachometer",
    "Air Speed": "closed_pitot_static",
    "Temp": "closed_thermometer",
    "Pressure": "closed_barometer"
}

const METRIC_NAME: Record<string, string> = {
    "RPM": "rpm",
    "Air Speed": "air_speed",
    "Temp": "temp_celsius",
    "Pressure": "pressure_hpa"
}

// convert selected range to ms
const RANGE_MS: Record<string, number> = {
  "LIVE": 60 * 1000,
  "5M": 5 * 60 * 1000,
  "1H": 60 * 60 * 1000,
  "24H": 24 * 60 * 60 * 1000,
  "1D": 24 * 60 * 60 * 1000,
  "1W": 7 * 24 * 60 * 60 * 1000,
  "1MO": 30 * 24 * 60 * 60 * 1000,
  "6MO": 182 * 24 * 60 * 60 * 1000,
  "1Y": 365 * 24 * 60 * 60 * 1000,
};

// bucket size per range, so point count stays roughly constant
const BUCKET: Record<string, string> = {
  "LIVE": "second",
  "5M": "second",
  "1H": "minute",
  "24H": "minute",
  "1D": "minute",
  "1W": "hour",
  "1MO": "hour",
  "6MO": "day",
  "1Y": "day",
};

export async function GET(req: NextRequest){
    // convert selected range to ms
    const range = req.nextUrl.searchParams.get("range") ?? "1H";
    const metric = req.nextUrl.searchParams.get("metric") ?? "RPM";
    const ms = RANGE_MS[range];
    const bucket = BUCKET[range];
    const database_table = METRIC_DATABASE_TABLE[metric];
    const name = METRIC_NAME[metric];

    // reject invalid ranges
    if (!ms || !bucket) {
        return NextResponse.json({ error: "Invalid range" }, { status: 400 });
    }

    const since = new Date(Date.now() - ms);

    try {
        const query = `
            SELECT date_trunc($1, timestamp) AS timestamp, AVG(${name}) AS ${name}
            FROM ${database_table}
            WHERE timestamp >= $2
            GROUP BY date_trunc($1, timestamp)
            ORDER BY date_trunc($1, timestamp) ASC
        `;

        const result = await pool.query(query, [bucket, since]);

        const chartData = result.rows.map(row => ({
            timestamp: row.timestamp,
            value: Number(row[name]), // AVG returns a string in pg, cast to number
        }));

        return NextResponse.json(chartData);

    }

    catch(error){
        // send error
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}