import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  handleFileInput,
  handleDrop,
  handleSubmit,
  handleConfirmUpload,
  handleDescriptionChange,
  handleRemoveImage,
} from "../handlers/imageUpload";
import { UploadArea, ImagePreviewList } from "../components/ImageUpload";

type UploadedImage = {
  file: File;
  preview: string;
  description: string;
};

const ImageUploadPage = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bind the `setIsDragging` function to the handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Images</h1>
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            uploadedImages,
            setUploadedImages,
            setShowModal,
            setCurrentImageIndex
          )
        }
        className="space-y-6"
      >
        <UploadArea
          isDragging={isDragging}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleDrop={(e) => handleDrop(e, setIsDragging, setUploadedImages)}
          fileInputRef={fileInputRef}
          handleFileInput={(e: any) => handleFileInput(e, setUploadedImages)}
        />

        {uploadedImages.length > 0 && (
          <ImagePreviewList
            uploadedImages={uploadedImages}
            handleRemoveImage={(index) =>
              handleRemoveImage(index, setUploadedImages)
            }
            handleDescriptionChange={(index, description) =>
              handleDescriptionChange(
                index,
                description,
                uploadedImages,
                setUploadedImages
              )
            }
          />
        )}

        <Button type="submit" disabled={uploadedImages.length === 0}>
          Upload Images
        </Button>
      </form>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Upload</DialogTitle>
            <DialogDescription>
              Are you sure you want to upload the image without any description?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleConfirmUpload(
                  setShowModal,
                  uploadedImages,
                  setUploadedImages
                )
              }
            >
              Confirm Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUploadPage;
