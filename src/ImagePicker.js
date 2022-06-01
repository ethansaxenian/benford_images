export default function ImagePicker({ chooseImage }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
      }}
    >
      <h3 style={{ marginBottom: 15 }}>
        Select an image to view the distribution of the first significant digit
        of pixel luminosities. Does this distribution follow{" "}
        <a
          href="https://en.wikipedia.org/wiki/Benford%27s_law"
          target="_blank"
          rel="noopener noreferrer"
        >
          Benford's Law
        </a>
        ?
      </h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => chooseImage(e.target.files[0])}
      />
    </div>
  );
}
