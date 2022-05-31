export default function ImageDisplay({ image }) {
  return (
    <div style={{ maxWidth: 500 }}>
      <img src={image} />
    </div>
  );
}
