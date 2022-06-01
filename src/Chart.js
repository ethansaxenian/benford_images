import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BENFORD_VALUES } from "./utils";

export default function Chart({ imageData }) {
  const data = Object.entries(imageData).map(([firstDigit, pct]) => ({
    "First Significant Digit": firstDigit,
    "Image Data": pct,
    "Benford's Law": BENFORD_VALUES[firstDigit],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={730}
        height={250}
        data={data}
        margin={{
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        }}
      >
        <XAxis
          dataKey="First Significant Digit"
          label={{
            value: "First Significant Digit",
            position: "insideBottom",
            offset: -20,
          }}
        />
        <YAxis
          dataKey="Image Data"
          label={{ value: "Frequency (%)", angle: -90, position: "insideLeft" }}
        />
        <Legend verticalAlign="top" />
        <Tooltip />
        <Bar dataKey="Image Data" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="Benford's Law" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
