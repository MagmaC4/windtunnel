import pool from "@/lib/db"

// This api route gets the 60 most recent entries from the database

export async function GET(){
    try {

        const query = `
            SELECT
              bucket, -- this is the time bucket
              AVG(rpm) AS avg_rpm -- average across all readings in this bucket
            FROM generate_series(
              now() - interval '30 days', -- start of window
              now(),                     -- end of window
              interval '1 hour'          -- bucket width
            ) AS bucket
            LEFT JOIN motor_rpm
              ON motor_rpm.timestamp >= bucket
              AND motor_rpm.timestamp < bucket + interval '1 hour'
              AND motor_rpm.status = 'Running' -- only count active readings
              AND motor_rpm.rpm < 3000 -- remove bad data
            GROUP BY bucket
            ORDER BY bucket;
        `

        const result = await pool.query(query)

        const chartData = result.rows
            .map(row => ({
                name: new Date(row.bucket).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric' }),
                rpm: row.avg_rpm,
            }));

        return Response.json(chartData)

    }

    catch(error){
        // send error
        console.error("Database error:", error);
        return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }









}
