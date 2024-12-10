import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import useImageStore from "@/stores/imageStore";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const ImageGalleryPage = () => {
  const {
    imagesAscending,
    imagesDescending,
    fetchAll,
    deleteImage,
    loading,
    error,
  } = useImageStore();

  const ascending = useImageStore((state) => state.ascending);

  const userId = useUser()?.user?.id;

  useEffect(() => {
    if (userId) {
      const order = ascending ? "ascending" : "descending";
      fetchAll(userId, 50, order).catch((err) =>
        console.error("Error fetching images:", err)
      );
    }
  }, [userId, ascending, fetchAll]);

  const handleDelete = (id: string) => {
    console.log("Delete image:", id);
    deleteImage(id, userId!);
  };

  const handleDownload = (
    url: string,
    filename: string = "downloaded_image"
  ) => {
    console.log("Image URL:", url);
  };

  const hoverItems = (ascending ? imagesAscending : imagesDescending).map(
    (image) => ({
      id: image._id,
      title: image.title,
      imageUrl: image.url,
      description: image.description,
      onDelete: () => handleDelete(image._id),
      onDownload: () => handleDownload(image.url),
    })
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          <h1 className="text-3xl font-bold mb-6">Your Saved Images</h1>
          {hoverItems.length === 0 ? (
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
