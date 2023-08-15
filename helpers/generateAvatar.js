const { createCanvas } = require("canvas");
const fs = require("fs");

const generateAvatar = (name, size) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Set background color
  ctx.fillStyle = "#007bff"; // You can choose any color you like
  ctx.fillRect(0, 0, size, size);

  // Draw text
  ctx.fillStyle = "#ffffff"; // Text color
  ctx.font = `${Math.floor(size / 2)}px Arial`; // Font size
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name[0].toUpperCase(), size / 2, size / 2);

  // Save the canvas as a PNG image
  const outputPath = `./temp/${name}_avatar.png`;
  const stream = canvas.createPNGStream();

  const out = fs.createWriteStream(outputPath);

  stream.pipe(out);

  out.on("finish",()=>{});
};

module.exports = generateAvatar;
