import pool from "@/lib/db"

// DEPRECATED

export async function GET(){
    try {

        const query = `
            WITH params AS (
              SELECT $1::timestamp AS selected_date
            )
            SELECT
              bucket,
              AVG(rpm) AS avg_rpm
            FROM params, generate_series(
              params.selected_date,
              params.selected_date + interval '1 day',
              interval '5 minutes'
            ) AS bucket
            LEFT JOIN motor_rpm
              ON motor_rpm.timestamp >= bucket
              AND motor_rpm.timestamp < bucket + interval '5 minutes'
              AND motor_rpm.status = 'Running'
            GROUP BY bucket
            ORDER BY bucket;
        `

        const result = await pool.query(query, ['2026-07-02']) // hardcoded july 2

        const chartData = result.rows
            .map(row => ({
                name: new Date(row.bucket).toLocaleString([], { hour: 'numeric', minute: '2-digit' }),
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
