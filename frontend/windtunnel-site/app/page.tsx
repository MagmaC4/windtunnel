/* eslint-disable react-hooks/error-boundaries */
export default async function Home() {
  try {
    const res = await fetch("http://localhost:3000/api/rpm"); // database response generated from api/rpm route
    const data = await res.json(); // database response as a JSON

    return (
      <main>
        <h1>Average RPM</h1>
        {/* ternary if/else operation to error check database API response */}
        <p>{data.error ? `Error: ${data.error}` : Math.round(data.average)}</p>
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