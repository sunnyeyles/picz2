import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { PropertyCard, PropertyCardProps } from "@/components/PropertyCard";
import { getProperties } from "@/testFunctions/getProperties";

const PropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await getProperties();

      const propertiesArray = response?.properties || [];

      setProperties(propertiesArray);
    };

    fetchProperties();
  }, []);

  console.log("Properties state:", properties);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Immobilienverwaltung</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Immobilien suchen"
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            size={20}
          />
        </div>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))
        ) : (
          <p>Loading properties...</p>
        )}
      </main>
    </div>
  );
};

export default PropertiesPage;
