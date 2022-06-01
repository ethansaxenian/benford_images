import { useState, useEffect } from "react";
import { getPixelValues, calculateFirstDigitFrequencies } from "./utils";
import ImagePicker from "./ImagePicker";
import ChartDisplay from "./ChartDisplay";
import ImageDisplay from "./ImageDisplay";
import SourceCodeButton from "./SourceCodeButton";

export default function App() {
  const [image, setImage] = useState();
  const [frequencies, setFrequencies] = useState({});

  const chooseImage = (file) => {
    setFrequencies({});
    setImage();
    if (file) {
      setImage(URL.createObjectURL(file));
      const reader = new FileReader();

      reader.onload = (e) => {
        getPixelValues(e.target.result, (pixels) =>
          setFrequencies(calculateFirstDigitFrequencies(pixels))
        );
      };

      // this calls reader.onload
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        flex: 1,
        padding: 30,
      }}
    >
      <SourceCodeButton />
      <ImagePicker chooseImage={chooseImage} />
      {image && (
        <div className="display-row">
          <ImageDisplay image={image} />
          <ChartDisplay frequencies={frequencies} />
        </div>
      )}
    </div>
  );
}
