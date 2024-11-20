import { useState } from "react";
import { uploadImage } from "../api/crud";
import { useToast } from "@/hooks/use-toast";

export const useImageUploadHandler = () => {
  // const [notification, setNotification] = useState<{
  //   color: string;
  //   message: string;
  // } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (files: File[]) => {
    setIsLoading(true);
    try {
      const uploadPromises = files.map((file) => uploadImage(file));
      await Promise.all(uploadPromises);
    } catch (e) {
      console.log("error: ", e);
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleImageUpload, isLoading };
};
