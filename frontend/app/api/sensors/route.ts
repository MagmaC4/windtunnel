import pool from "@/lib/db";

interface SensorData {
  rpm: number;
  airSpeed: number;
  temp: number;
  pressure: number;
}

export async function GET() {

    // return zeros as placeholder api call
    var data : SensorData = {
        rpm: 0,
        airSpeed: 0,
        temp: 0,
        pressure: 0,
    }

    // latest rpm query
    try {
        const result = await pool.query(
            'SELECT rpm as latest FROM motor_rpm ORDER BY timestamp DESC LIMIT 1'
        );
        data.rpm = result.rows[0].latest;
    }
    catch (error) {
        console.error('Failed to fetch latest RPM:', error);
        // data.rpm stays 0 as fallback
    }

    // latest air speed query
    try {
        const result = await pool.query(
            'SELECT air_speed as latest FROM pitot ORDER BY timestamp DESC LIMIT 1'
        );
        data.airSpeed = result.rows[0].latest;
    }
    catch (error) {
        console.error('Failed to fetch latest air speed:', error);
    }

    // latest temperature query
    try {
        const result = await pool.query(
            'SELECT temp_celsius, pressure_hpa FROM thermometer ORDER BY timestamp DESC LIMIT 1'
        );
        data.temp = result.rows[0].temp_celsius;
        data.pressure = result.rows[0].pressure_hpa / 10000;
    }
    catch (error) {
        console.error('Failed to fetch latest temperature:', error);
    }




    return Response.json(data);
}