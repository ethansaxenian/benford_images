export default function ImageDisplay({ image }) {
  return (
    <div style={{ width: "min(500px, 100%)" }}>
      <img src={image} />
    </div>
  );
}
