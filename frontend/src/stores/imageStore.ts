import { create } from "zustand";
import { axiosInstance } from "@/config/axiosInstance";
import { ImageFormData } from "@/types/sharedTypes";
type Image = {
  userId: string;
  key: string;
  title: string;
  description?: string;
  url: string;
  _id: string;
};

type ImageState = {
  images: Image[];
  loading: boolean;
  error: string | null;
  fetchImages: (userId: string) => void;
  setImages: (images: Image[]) => void;
  setLoading: (loading: boolean) => void;
  uploadImage: (image: ImageFormData) => void;
};

const useImageStore = create<ImageState>((set) => ({
  images: [],
  loading: false,
  error: null,
  setImages: (images) => set({ images }),
  setLoading: (loading) => set({ loading }),
  fetchImages: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/api/image/getallimages/", {
        userId,
      });
      const apiImages = response.data.images.map((img: any) => ({
        userId: img.userId,
        key: img.key,
        title: img.title,
        description: img.description,
        url: img.url,
        _id: img._id,
      }));
      console.log(apiImages);

      set({ images: apiImages, loading: false });
    } catch (error) {
      console.error("Failed to fetch images:", error);
      set({ error: "Failed to load images.", loading: false });
    }
  },
  uploadImage: async ({ file, userId }: ImageFormData) => {
    set({ loading: true, error: null });

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", file);
      console.log("Form data from imageStore.ts: ", formData);
    } catch (error) {
      console.error("Failed to upload image:", error);
      set({ error: "Failed to upload image.", loading: false });
    }
  },
}));

export default useImageStore;
