import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type PropertyCardProps = {
  address: string;
  propertyType: string;
  occupied: boolean;
  size: number;
  rooms: number;
  pricePerSqm: number;
  rentPerMonth: number;
  documents?: Document[];
  tenants: string[];
};

export const PropertyCard = ({
  property,
}: {
  property: PropertyCardProps | undefined;
}) => {
  if (!property) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <p className="text-center">Keine Immobiliendaten verfügbar.</p>
        </CardContent>
      </Card>
    );
  }

  const { address, occupied, size, pricePerSqm, rentPerMonth, tenants } =
    property;

  // Fallback values if numbers are invalid
  const safeRentPerMonth = typeof rentPerMonth === "number" ? rentPerMonth : 0;
  const safePricePerSqm = typeof pricePerSqm === "number" ? pricePerSqm : 0;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{address}</CardTitle>
        <Badge variant={occupied ? "outline" : "default"}>
          {occupied ? "Verfügbar" : "Belegt"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Größe</p>
              <p>{size} m²</p>
            </div>
            <div>
              <p className="text-sm font-medium">Preis pro m²</p>
              <p>{safePricePerSqm.toFixed(2)} €</p>
            </div>
            <div>
              <p className="text-sm font-medium">Miete pro Monat</p>
              <p>{safeRentPerMonth.toFixed(2)} €</p>
            </div>
            <div>
              <p className="text-sm font-medium">Dokumente</p>
              <p>something.pdf</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Mieter</p>
            <p>{tenants.length > 0 ? tenants.join(", ") : "Keine Mieter"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
