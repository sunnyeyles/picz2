import { axiosInstance } from "@/config/axiosInstance";

export const uploadImage = async (formData: FormData) => {
  const response = await axiosInstance.post(
    "/api/image/uploadimage/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getAllImages = async () => {
  try {
    const response = await axiosInstance.get("/api/image/getAllImages/");
    console.log("images from api: ", response.data.images);
    return response.data.images;
  } catch (error) {
    console.log("Failed to fetch images:", error);
    throw error;
  }
};
