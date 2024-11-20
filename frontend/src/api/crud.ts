import axios from "axios";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // You can modify this based on your API's response structure
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; // Propagate the error to be handled in the hook
  }
};
