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
  imagesAscending: Image[];
  imagesDescending: Image[];
  ascending: boolean;
  loading: boolean;
  error: string | null;
  fetchImages: (userId: string) => void;
  setImages: (images: Image[]) => void;
  fetchAll: (userId: string, limit: number, order: string) => Promise<any>;
  getOrder: () => boolean;
  setOrder: () => void;
  setLoading: (loading: boolean) => void;
  uploadImage: (image: ImageFormData) => void;
  deleteImage: (imageId: string, userId: string) => void;
};

const useImageStore = create<ImageState>((set, get) => ({
  images: [],
  imagesAscending: [],
  imagesDescending: [],
  ascending: true,
  loading: false,
  error: null,
  setImages: (images) => set({ images }),
  getOrder: () => get().ascending,

  setOrder: () => {
    const currentOrder = get().ascending;
    set({ ascending: !currentOrder });
  },
  setLoading: (loading) => set({ loading }),

  // FETCH
  fetchImages: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/api/image/getallimages/", {
        userId,
      });
      const images = response.data.images.map((img: any) => ({
        userId: img.userId,
        key: img.key,
        title: img.title,
        description: img.description,
        url: img.url,
      }));
      set({ images: images, loading: false });
    } catch (error) {
      console.error("Failed to fetch images:", error);
      set({ error: "Failed to load images.", loading: false });
    }
  },
  fetchAll: async (userId, limit, order) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/api/image/getallimages/", {
        userId: userId,
        limit: limit,
        order: order,
      });
      const images = response.data.images.map((img: any) => ({
        _id: img._id,
        userId: img.userId,
        key: img.key,
        title: img.title,
        description: img.description,
        url: img.url,
      }));
      if (order === "ascending") {
        set({ imagesAscending: images, loading: false });
      } else {
        set({ imagesDescending: images, loading: false });
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      set({ error: "Failed to load images.", loading: false });
    }
  },
  // UPLOAD
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
  // DELETE
  deleteImage: async (imageId: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/api/image/deleteimage/", {
        userId,
        imageId,
      });

      set((state) => {
        const updatedImages = state.images.filter(
          (image) => image._id !== imageId
        );
        const updatedImagesAscending = state.imagesAscending.filter(
          (image) => image._id !== imageId
        );
        const updatedImagesDescending = state.imagesDescending.filter(
          (image) => image._id !== imageId
        );

        return {
          images: updatedImages,
          imagesAscending: updatedImagesAscending,
          imagesDescending: updatedImagesDescending,
          loading: false,
        };
      });
    } catch (error) {
      console.error("Failed to delete image:", error);
      set({ error: "Failed to delete image.", loading: false });
    }
  },
}));

export default useImageStore;
