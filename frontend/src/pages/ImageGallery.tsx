import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import useImageStore from "@/stores/imageStore";

const ImageGalleryPage = () => {
  const { images, loading, error, fetchImages } = useImageStore();
  const userId = useUser().user?.id;

  useEffect(() => {
    if (userId) {
      fetchImages(userId);
    } else {
      console.log("no user id");
    }
  }, [fetchImages]);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <div className="text-center">Loading...</div>}

      {!loading && !error && (
        <>
          <h1 className="text-3xl font-bold mb-6">Your Saved Images</h1>
          {images.length === 0 ? (
            <p className="text-center">You haven't saved any images yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="border rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{image.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageGalleryPage;
