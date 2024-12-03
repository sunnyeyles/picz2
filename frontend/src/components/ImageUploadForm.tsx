import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useImageStore from "@/stores/imageStore";
import { useUser } from "@clerk/clerk-react";
import { ImageFormData } from "@/types/sharedTypes";
import { Toaster } from "@/components/ui/toaster";

export const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { uploadImage } = useImageStore();
  const user = useUser();

  if (!user || !user.user) {
    return <div>Loading user...</div>;
  }

  const userId = user.user.id;

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      toast({
        title: "Error",
        description: "Please select an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const imageFormData: ImageFormData = {
        userId: userId,
        file: image,
      };

      // Make the image upload request here
      uploadImage(imageFormData);

      // Clear image after upload
      setImage(null);
      setPreviewUrl(null); // Clear the preview URL as well

      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false); // Set uploading state to false
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <Label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8" />
                <span>Upload Image</span>
              </div>
              <Input
                id="image-upload"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </Label>
          </div>
          <Button onClick={handleUpload} className="w-full">
            Select Image
          </Button>
          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Uploaded preview"
                className="max-h-64 w-full object-contain"
              />
            </div>
          )}
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!image || isUploading}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </Button>
          <Toaster />
        </div>
      </CardContent>
    </Card>
  );
};
