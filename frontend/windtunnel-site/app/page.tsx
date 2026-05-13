export default async function Home() {
  try {
    const res = await fetch("http://localhost:3000/api/rpm");
    const data = await res.json();

    return (
      <main>
        <h1>Average RPM</h1>
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