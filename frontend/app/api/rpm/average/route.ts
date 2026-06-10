import pool from "@/lib/db";

// Retrieve the average RPM query from the database.
// Returns the RPM value as JSON, defaulting to 0 if no data exists.
// SQL errors are caught and returned as a 500 response.
 
type AverageRow = { 
  average: number | null;
}; 

export async function GET() {
  try {
    const result = await pool.query<AverageRow>(
      'SELECT AVG(rpm)::float as average FROM motor_rpm'
    );
    
    const average_rpm = result.rows[0]

    // (average_rpm?.average) only returns if average_rpm is not null
    // (0) returns if average_rpm doesn't exist
    return Response.json({ average: average_rpm?.average ?? 0 });
  } 
  
  catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: String(error), average: 0 }, { status: 500 });
  }
}
