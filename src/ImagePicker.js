export default function ImagePicker({ chooseImage }) {
  return (
    <div style={{ paddingTop: 30, paddingBottom: 30 }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => chooseImage(e.target.files[0])}
      />
    </div>
  );
}
