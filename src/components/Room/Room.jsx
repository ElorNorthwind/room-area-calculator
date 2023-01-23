export default function Room({ room }) {
  return (
    <div className={`room room__${!!room.sMain ? "main" : "secondary"}`}>
      <div>{room.label}</div>
      <div>{room.desc}</div>
      <div>{room.sMain || "-"}</div>
      <div>{room.sSecondary || "-"}</div>
      <div>{room.sSummer || "-"}</div>
    </div>
  );
}
