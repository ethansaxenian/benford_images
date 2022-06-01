import { useState, useEffect } from "react";
import { getPixelValues, calculateFirstDigitFrequencies } from "./utils";
import ImagePicker from "./ImagePicker";
import ChartDisplay from "./ChartDisplay";
import ImageDisplay from "./ImageDisplay";
import SourceCodeButton from "./SourceCodeButton";

export default function App() {
  const [image, setImage] = useState();
  const [pixels, setPixels] = useState([]);
  const [frequencies, setFrequencies] = useState({});

  useEffect(() => {
    console.log("pixels", pixels.length);
    if (pixels.length) {
      setFrequencies(calculateFirstDigitFrequencies(pixels));
    } else {
      setFrequencies({});
    }
  }, [pixels]);

  const chooseImage = (file) => {
    setPixels([]);
    setImage();
    if (file) {
      setImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("getting pixel values");
        setPixels(getPixelValues(reader.result));
      };
    }
  };

  console.log(pixels.length, Object.keys(frequencies).length);

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
