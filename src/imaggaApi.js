import axios from "axios";
import FormData from "form-data";

const apiKey = "acc_c72e74d2dfe60eb";
const apiSecret = "e64511fdfabdc0ec4036ae3c35637f50";

export async function getImageColors(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      "https://api.imagga.com/v2/colors",
      formData,
      {
        headers: {
          Authorization: "Basic " + btoa(apiKey + ":" + apiSecret),
          "Content-Type": "multipart/form-data"
        }
      }
    );

    const foregroundColors = response.data.result.colors.foreground_colors
      .map((color) => ({
        color: color.html_code,
        closest_palette_color: color.closest_palette_color,
        closest_palette_color_parent: color.closest_palette_color_parent,
        percent: color.percent
      }))
      .sort((a, b) => b.percent - a.percent);

    return foregroundColors;
  } catch (error) {
    throw new Error("Error fetching image colors. Please try again.");
  }
}
