/* eslint-disable react-hooks/error-boundaries */
export default async function Home() {
  try {
    const res = await fetch("http://localhost:3000/api/rpm"); // database response generated from api/rpm route
    const data = await res.json(); // database response as a JSON

    return (
      <main >
        <div className="text-center py-8 space-y-2">
          <h1 className="font-bold text-2xl">Average RPM (past hour)</h1 >
          
          {/* ternary if/else operation to error check database API response */}
          <p className="text-9xl py-8">{data.error ? `Error: ${data.error}` : Math.round(data.average)}</p>
        </div>
      </main>
    );

  } catch (error) {
    return (
      <main>
        <h1>Average RPM</h1>
        <p>Error: {String(error)}</p>
      </main>
    );
  }
}