import pool from "@/lib/db"

// This api route gets the 60 most recent entries from the database

export async function GET(){
    try {

        const query = `
            SELECT DISTINCT ON (date_trunc('second', timestamp))
              to_char(timestamp, 'Mon DD, HH12:MI:SS AM') AS name,
              rpm
            FROM motor_rpm
            WHERE status = 'Running'
            ORDER BY date_trunc('second', timestamp) DESC, timestamp DESC
            LIMIT 60;
        `

        const result = await pool.query(query)

        const chartData = result.rows
            .reverse() // oldest first, so the line reads left-to-right correctly
            .map(row => ({
                name: row.name,
                rpm: row.rpm,
            }));

        return Response.json(chartData)

    }

    catch(error){
        // send error
        console.error("Database error:", error);
        return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }









}
