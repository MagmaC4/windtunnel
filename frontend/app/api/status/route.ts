import pool from "@/lib/db"

// Retrieve the status from the latest RPM entry in the database

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get("prefix") ?? "closed";

    try {
        const result = await pool.query(
            `SELECT status FROM ${prefix}_tachometer ORDER BY timestamp DESC LIMIT 1`
        );

        return Response.json({status: result.rows[0].status})

    }
    catch (error){
        console.error("Database error: ", error);
        return Response.json({status: "Off"})
    }
}



