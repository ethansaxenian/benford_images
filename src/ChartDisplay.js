import Chart from "./Chart";

export default function ChartDisplay({ frequencies }) {
  return (
    <div
      style={{
        display: "flex",
        width: 500,
        height: 500,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Object.keys(frequencies).length === 0 ? (
        <p>Loading pixel data...</p>
      ) : (
        <Chart imageData={frequencies} />
      )}
    </div>
  );
}
