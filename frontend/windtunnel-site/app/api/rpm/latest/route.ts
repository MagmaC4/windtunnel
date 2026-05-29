import Database from "better-sqlite3";

// This is the backend api that will run on the raspberry
// SQL requests are error prone, so error catching is important.

export async function GET() {
  try {
    // Access local database
    const db = new Database("../../backend/windtunnel_sensors.db");


    const latest_rpm = db
      .prepare("SELECT rpm FROM motor_rpm ORDER BY timestamp DESC LIMIT 1") 
      .get(); 
    db.close();
    
    // Return data as a JSON
    return Response.json({ rpm: latest_rpm?.rpm ?? 0 });
  } 
  
  catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: String(error), rpm: 0 }, { status: 500 });
  }
}