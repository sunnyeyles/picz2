type Image = {
  id: string;
  url: string;
  title: string;
};

const userImages: Image[] = [
  { id: "1", url: "/placeholder.svg?height=200&width=200", title: "Image 1" },
  { id: "2", url: "/placeholder.svg?height=200&width=200", title: "Image 2" },
  { id: "3", url: "/placeholder.svg?height=200&width=200", title: "Image 3" },
];

const ImageGalleryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Saved Images</h1>

      {userImages.length === 0 ? (
        <p className="text-center">You haven't saved any images yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userImages.map((image) => (
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
    </div>
  );
};
export default ImageGalleryPage;