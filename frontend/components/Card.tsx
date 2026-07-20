export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-neutral-800 rounded-2xl shadow p-4 ${className}`}>
      {children}
    </div>
  );
}