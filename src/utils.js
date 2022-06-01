export const getPixelValues = (image, callback) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const pixels = [];
    for (let i = 0; i < data.length; i += 4) {
      const lum = luminance({
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
      });
      if (lum != 0) {
        pixels.push(lum);
      }
    }
    callback(pixels);
  };

  // this will call img.onload
  img.src = image;
};

// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
const sRGBConversion = (sRGB) => {
  if (sRGB <= 0.03928) {
    return sRGB / 12.92;
  } else {
    return Math.pow((sRGB + 0.055) / 1.055, 2.4);
  }
};

export const luminance = ({ r, g, b }) => {
  return (
    0.2126 * sRGBConversion(r / 255) +
    0.7152 * sRGBConversion(g / 255) +
    0.0722 * sRGBConversion(b / 255)
  );
};

export const calculateFirstDigitFrequencies = (values) => {
  const frequencies = {};
  values.forEach((value) => {
    const firstDigit = FSD(value);
    if (firstDigit) {
      if (frequencies[firstDigit]) {
        frequencies[firstDigit]++;
      } else {
        frequencies[firstDigit] = 1;
      }
    }
  });
  const total = Object.values(frequencies).reduce((a, b) => a + b);
  for (let i in frequencies) {
    frequencies[i] = +((frequencies[i] / total) * 100).toFixed(2);
  }
  return frequencies;
};

const FSD = (num) => {
  for (let c of num.toString()) {
    if (c !== "." && c !== "0") {
      return c;
    }
  }
};

export const BENFORD_VALUES = {
  1: 30.1,
  2: 17.6,
  3: 12.5,
  4: 9.7,
  5: 7.9,
  6: 6.7,
  7: 5.8,
  8: 5.1,
  9: 4.6,
};
