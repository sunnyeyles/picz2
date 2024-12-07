// import { useState, useRef, ChangeEvent } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Upload } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useUser } from "@clerk/clerk-react";
// import { Toaster } from "@/components/ui/toaster";
// import { uploadImage } from "@/api/crud";

// export const ImageUpload = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { toast } = useToast();
//   const user = useUser();

//   if (!user || !user.user) {
//     return <div>Loading user...</div>;
//   }

//   const userId = user.user.id;

//   const handleUpload = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setImage(file);
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
//     }
//   };
//   const handleSubmit = async () => {
//     if (!image) {
//       toast({
//         title: "Error",
//         description: "Please select an image first.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("userId", userId);
//       formData.append("file", image);
//       console.log(formData);

//       await uploadImage(formData);

//       setImage(null);
//       setPreviewUrl(null);

//       toast({
//         title: "Success",
//         description: "Image uploaded successfully!",
//         variant: "success",
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast({
//         title: "Error",
//         description: "Failed to upload image. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md">
//       <CardContent className="pt-6">
//         <div className="space-y-4">
//           <div className="flex items-center justify-center">
//             <Label htmlFor="image-upload" className="cursor-pointer">
//               <div className="flex flex-col items-center gap-2">
//                 <Upload className="h-8 w-8" />
//                 <span>Upload Image</span>
//               </div>
//               <Input
//                 id="image-upload"
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 // accept="image/*"
//                 className="hidden"
//               />
//             </Label>
//           </div>
//           <Button onClick={handleUpload} className="w-full">
//             Select Image
//           </Button>
//           {previewUrl && (
//             <div className="mt-4">
//               <img
//                 src={previewUrl}
//                 alt="Uploaded preview"
//                 className="max-h-64 w-full object-contain"
//               />
//             </div>
//           )}
//           <Button
//             onClick={handleSubmit}
//             className="w-full"
//             disabled={!image || isUploading}
//           >
//             {isUploading ? "Uploading..." : "Submit"}
//           </Button>
//           <Toaster />
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/toaster";
import { uploadImage } from "@/api/crud";

export const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useUser();

  if (!user) {
    return <div>Loading user...</div>;
  }

  const userId = user.id;

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

    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for the image.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", image);
      formData.append("title", title);
      formData.append("description", description);
      console.log("form data: ", formData);

      await uploadImage(formData);

      setImage(null);
      setPreviewUrl(null);
      setTitle("");
      setDescription("");

      toast({
        title: "Success",
        description: "Image uploaded successfully!",
        variant: "success",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
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
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter image description"
              rows={3}
            />
          </div>
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
