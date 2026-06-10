import pool from "@/lib/db"

// Retrieves the most recent RPM reading from the database.
// Queries the motor_rpm table, ordering by timestamp to get the latest entry.
// Returns the RPM value as JSON, defaulting to 0 if no data exists.
// SQL errors are caught and returned as a 500 response.

type LatestRow = {
  latest: number | null;
};

export async function GET(){
  try{
    const result = await pool.query<LatestRow>(
      'SELECT rpm as latest FROM motor_rpm ORDER BY timestamp DESC LIMIT 1'
    );

    const latest_rpm = result.rows[0];

    return Response.json({latest: latest_rpm?.latest ?? 0})
  }

  catch(error){
    console.error("Database error:", error);
    return Response.json({error: String(error), latest: 0}, {status: 500});
  }
}