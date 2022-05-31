import { useState, useEffect } from "react";
import { getPixelValues, calculateFirstDigitFrequencies } from "./utils";
import { flushSync } from "react-dom";
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
      flushSync(() => {
        setImage(URL.createObjectURL(file));
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        setPixels(await getPixelValues(reader.result));
      };
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ImagePicker chooseImage={chooseImage} />
      {image && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <ImageDisplay image={image} />
          <ChartDisplay frequencies={frequencies} />
        </div>
      )}
    </div>
  );
}
