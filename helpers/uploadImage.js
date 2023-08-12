// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: "dici0468p",
  api_key: "289252817377921",
  api_secret: "umUKFWmisSTjoP_0MUIPS3s1DqY",
});

const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log("result", result);
    return result.url;
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = uploadImage;
