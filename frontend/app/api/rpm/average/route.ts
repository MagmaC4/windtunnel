import Database from "better-sqlite3";

// The purpose of this file is to retrieve the average RPM query from the database.
// This is the backend api that will run on the raspberry
// SQL requests are error prone, so error catching is important.

export async function GET() {
  try {
    // Access local database
    const db = new Database("../backend/windtunnel_sensors.db");

    // Store data in a variable
    type AverageRow = { 
         average: number | null;
    }; 

    const average_rpm = db
      .prepare("SELECT AVG(rpm) as average FROM motor_rpm") // prompt database with SQL query
      .get() as AverageRow;                                               // receieve data 

    // Return data as a JSON
    // Error checking...
    // (average_rpm?.average) only returns if average_rpm is not null
    // (0) returns if average_rpm doesn't exist
    return Response.json({ average: average_rpm?.average ?? 0 });
  } 
  
  catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: String(error), average: 0 }, { status: 500 });
  }
}
