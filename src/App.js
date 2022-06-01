import { useState, useEffect } from "react";
import { getPixelValues, calculateFirstDigitFrequencies } from "./utils";
import ImagePicker from "./ImagePicker";
import ChartDisplay from "./ChartDisplay";
import ImageDisplay from "./ImageDisplay";

export default function App() {
  const [image, setImage] = useState();
  const [pixels, setPixels] = useState([]);
  const [frequencies, setFrequencies] = useState({});

  useEffect(() => {
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
        setPixels(getPixelValues(reader.result));
      };
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
