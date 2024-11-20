import { DragEvent, ChangeEvent } from "react";
import { Dispatch, SetStateAction, FormEvent } from "react";

type UploadedImage = {
  file: File;
  preview: string;
  description: string;
};

export const handleDragEnter = (
  e: DragEvent<HTMLDivElement>,
  setIsDragging: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(true);
};

export const handleDragLeave = (
  e: DragEvent<HTMLDivElement>,
  setIsDragging: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);
};

export const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export const handleDrop = (
  e: DragEvent<HTMLDivElement>,
  setIsDragging: Dispatch<SetStateAction<boolean>>,
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>
) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);

  const files = Array.from(e.dataTransfer.files);
  handleFiles(files, setUploadedImages);
};

export const handleFileInput = (
  e: ChangeEvent<HTMLInputElement>,
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>
) => {
  const files = Array.from(e.target.files || []);
  handleFiles(files, setUploadedImages);
};

const handleFiles = (
  files: File[],
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>
) => {
  const newImages = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
    description: "",
  }));
  setUploadedImages((prev) => [...prev, ...newImages]);
};

export const handleDescriptionChange = (
  index: number,
  description: string,
  uploadedImages: UploadedImage[],
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>
) => {
  setUploadedImages((prev) =>
    prev.map((img, i) => (i === index ? { ...img, description } : img))
  );
};

export const handleRemoveImage = (
  index: number,
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>
) => {
  setUploadedImages((prev) => prev.filter((_, i) => i !== index));
};

export const handleSubmit = (
  e: FormEvent,
  uploadedImages: UploadedImage[],
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setCurrentImageIndex: Dispatch<SetStateAction<number | null>>
) => {
  e.preventDefault();
  const emptyDescriptionIndex = uploadedImages.findIndex(
    (img) => img.description.trim() === ""
  );
  if (emptyDescriptionIndex !== -1) {
    setCurrentImageIndex(emptyDescriptionIndex);
    setShowModal(true);
  } else {
    submitImages(uploadedImages, setUploadedImages);
  }
};

const submitImages = (
  uploadedImages: UploadedImage[],
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>
) => {
  console.log("Submitted images:", uploadedImages);
  setUploadedImages([]);
};

export const handleConfirmUpload = (
  setShowModal: Dispatch<SetStateAction<boolean>>,
  uploadedImages: UploadedImage[],
  setUploadedImages: Dispatch<SetStateAction<UploadedImage[]>>
) => {
  setShowModal(false);
  submitImages(uploadedImages, setUploadedImages);
};
