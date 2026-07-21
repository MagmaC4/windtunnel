import pool from "@/lib/db"

// Retrieve the status from the latest RPM entry in the database

export async function GET(){
    try {
        const result = await pool.query(
            'SELECT status FROM motor_rpm ORDER BY timestamp DESC LIMIT 1'
        );

        return Response.json({status: result.rows[0].status})

    }
    catch (error){
        console.error("Database error: ", error);
        return Response.json({status: "Off"})
    }
}



