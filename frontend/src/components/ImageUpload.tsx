import { DragEvent, RefObject, ChangeEvent } from "react";

import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type UploadedImage = {
  file: File;
  preview: string;
  description: string;
};

type UploadAreaProps = {
  isDragging: boolean;
  handleDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UploadArea = ({
  isDragging,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  fileInputRef,
  handleFileInput,
}: UploadAreaProps) => (
  <div
    className={`border-2 border-dashed rounded-lg p-8 text-center ${
      isDragging ? "border-primary" : "border-border"
    }`}
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    onClick={() => fileInputRef.current?.click()}
  >
    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
    <p className="mt-2 text-sm text-muted-foreground">
      Drag and drop your images here, or click to select files
    </p>
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileInput}
      multiple
      accept="image/*"
      className="hidden"
    />
  </div>
);

type ImagePreviewListProps = {
  uploadedImages: UploadedImage[];
  handleRemoveImage: (index: number) => void;
  handleDescriptionChange: (index: number, description: string) => void;
};

export const ImagePreviewList = ({
  uploadedImages,
  handleRemoveImage,
  handleDescriptionChange,
}: ImagePreviewListProps) => (
  <div className="space-y-4">
    {uploadedImages.map((image, index) => (
      <div
        key={index}
        className="flex items-start space-x-4 p-4 border rounded-lg"
      >
        <img
          src={image.preview}
          alt="Preview"
          className="w-24 h-24 object-cover rounded"
        />
        <div className="flex-grow">
          <p className="font-semibold">{image.file.name}</p>
          <Textarea
            value={image.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
            placeholder="Add a description for this image"
            className="mt-2"
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleRemoveImage(index)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    ))}
  </div>
);
