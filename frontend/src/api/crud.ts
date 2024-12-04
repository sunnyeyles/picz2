import { axiosInstance } from "@/config/axiosInstance";

interface UploadImageResponse {
  message: string;
  data?: {
    imageId: string;
    imageUrl: string;
  };
}
export const uploadImage = async (
  formData: FormData
): Promise<UploadImageResponse> => {
  try {
    const response = await axiosInstance.post<UploadImageResponse>(
      "/api/image/uploadimage/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
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
