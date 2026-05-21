import Database from "better-sqlite3";

export async function GET() {
  try {
    const db = new Database("example_table.db");
    const row = db
      .prepare("SELECT AVG(rpm) as average FROM sql_example")
      .get();
    db.close();
    
    return Response.json({ average: row?.average ?? 0 });
  } 
  
  catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: String(error), average: 0 }, { status: 500 });
  }
}