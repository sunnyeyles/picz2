import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import useImageStore from "@/stores/imageStore";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const ImageGalleryPage = () => {
  const { images, loading, error, fetchImages } = useImageStore();
  const userId = useUser()?.user?.id;
  console.log("Images from in state: ", images);

  useEffect(() => {
    if (userId) {
      fetchImages(userId);
    }
  }, [fetchImages, userId]);

  const handleDelete = (id: string) => {
    console.log("Delete image:", id);
    // Add logic to delete file from the bucket
  };

  // const handleDownload = (url: string) => {
  //   console.log("image url:", url);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "name_of_image.jpg";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  const handleDownload = (
    url: string,
    filename: string = "downloaded_image"
  ) => {
    console.log("image url:", url);
  };

  const hoverItems = images.map((image) => ({
    id: image._id,
    title: image.title,
    imageUrl: image.url,
    description: image.description,
    onDelete: () => handleDelete(image._id),
    onDownload: () => handleDownload(image.url),
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          <h1 className="text-3xl font-bold mb-6">Your Saved Images</h1>
          {images.length === 0 ? (
            <p className="text-center">You haven't saved any images yet.</p>
          ) : (
            <HoverEffect items={hoverItems} />
          )}
        </>
      )}
    </div>
  );
};

export default ImageGalleryPage;
