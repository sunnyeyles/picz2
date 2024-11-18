// import mongoose from "mongoose";
// import { UserModel } from "../models/user.js";

// export const seedData = async () => {
//   try {
//     await UserModel.deleteMany({});

//     const document1 = {
//       title: "Lease Agreement",
//       filePath: "/documents/lease123.pdf",
//       createdAt: new Date("2023-01-15"),
//     };

//     const document2 = {
//       title: "Inspection Report",
//       filePath: "/documents/inspection456.pdf",
//       createdAt: new Date("2023-02-20"),
//     };

//     const property1 = {
//       address: "123 Main St, Springfield, IL",
//       tenants: ["Jane Doe", "Alice Smith"],
//       size: 150,
//       sizePerSquareMeter: 100,
//       rentPerMonth: 1500,
//       vacant: false, // Example status
//       documents: [document1, document2],
//       createdAt: new Date("2022-06-01"),
//     };

//     const property2 = {
//       address: "456 Oak Ave, Oakwood, OH",
//       tenants: ["Bob Johnson"],
//       size: 120,
//       sizePerSquareMeter: 80,
//       rentPerMonth: 1200,
//       vacant: true,
//       documents: [document1],
//       createdAt: new Date("2022-09-15"),
//     };

//     const landlord1 = {
//       name: "John Doe",
//       email: "john.doe@example.com",
//       properties: [property1, property2],
//       createdAt: new Date("2020-04-25"),
//     };

//     const landlord2 = {
//       name: "Sarah Lee",
//       email: "sarah.lee@example.com",
//       properties: [property1],
//       createdAt: new Date("2021-01-10"),
//     };

//     const result = await UserModel.create([landlord1, landlord2]);

//     console.log("Database seeded successfully:", result);
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   }
// };
import mongoose from "mongoose";
import { UserModel } from "../models/model.js";

export const seedData = async () => {
  try {
    await UserModel.deleteMany({});

    const document1 = {
      title: "Mietvertrag",
      filePath: "/dokumente/mietvertrag123.pdf",
      createdAt: new Date("2023-01-15"),
    };

    const document2 = {
      title: "Inspektionsbericht",
      filePath: "/dokumente/inspektion456.pdf",
      createdAt: new Date("2023-02-20"),
    };

    const document3 = {
      title: "Rechnungsbeleg",
      filePath: "/dokumente/rechnung789.pdf",
      createdAt: new Date("2023-03-10"),
    };

    const document4 = {
      title: "Wartungsbericht",
      filePath: "/dokumente/wartung321.pdf",
      createdAt: new Date("2022-12-05"),
    };

    const document5 = {
      title: "Mietbestätigung",
      filePath: "/dokumente/mietbestätigung654.pdf",
      createdAt: new Date("2023-04-15"),
    };

    const property1 = {
      address: "Hauptstraße 123, Berlin",
      tenants: ["Anna Müller", "Peter Schmidt"],
      size: 150,
      sizePerSquareMeter: 100,
      rentPerMonth: 1500,
      vacant: false,
      documents: [document1, document2],
      createdAt: new Date("2022-06-01"),
    };

    const property2 = {
      address: "Eichenallee 456, Hamburg",
      tenants: ["Maria Becker"],
      size: 120,
      sizePerSquareMeter: 80,
      rentPerMonth: 1200,
      vacant: true,
      documents: [document1],
      createdAt: new Date("2022-09-15"),
    };

    const property3 = {
      address: "Blumenweg 789, München",
      tenants: ["Hans Meier"],
      size: 100,
      sizePerSquareMeter: 70,
      rentPerMonth: 1000,
      vacant: false,
      documents: [document3],
      createdAt: new Date("2021-11-05"),
    };

    const property4 = {
      address: "Kirchplatz 12, Köln",
      tenants: ["Lisa Fischer", "Paul Weber"],
      size: 200,
      sizePerSquareMeter: 120,
      rentPerMonth: 1800,
      vacant: false,
      documents: [document2, document3],
      createdAt: new Date("2023-01-20"),
    };

    const property5 = {
      address: "Marktplatz 89, Frankfurt",
      tenants: ["Jonas Krause"],
      size: 140,
      sizePerSquareMeter: 90,
      rentPerMonth: 1400,
      vacant: true,
      documents: [document1],
      createdAt: new Date("2020-10-10"),
    };

    const property6 = {
      address: "Schillerstraße 22, Stuttgart",
      tenants: ["Sophia Lehmann"],
      size: 160,
      sizePerSquareMeter: 110,
      rentPerMonth: 1600,
      vacant: false,
      documents: [document4],
      createdAt: new Date("2023-02-14"),
    };

    const property7 = {
      address: "Goethestraße 33, Düsseldorf",
      tenants: ["Erik Maier"],
      size: 180,
      sizePerSquareMeter: 130,
      rentPerMonth: 1900,
      vacant: false,
      documents: [document5],
      createdAt: new Date("2021-08-09"),
    };

    const property8 = {
      address: "Bachstraße 11, Hannover",
      tenants: ["Lena Müller", "Tom Bauer"],
      size: 170,
      sizePerSquareMeter: 120,
      rentPerMonth: 1750,
      vacant: false,
      documents: [document2, document4],
      createdAt: new Date("2022-04-03"),
    };

    const landlord1 = {
      name: "Johann Bauer",
      email: "johann.bauer@beispiel.de",
      properties: [property1, property2, property3, property4, property5],
      createdAt: new Date("2020-04-25"),
    };

    const landlord2 = {
      name: "Sarah Lehmann",
      email: "sarah.lehmann@beispiel.de",
      properties: [property3, property4, property6, property7, property8],
      createdAt: new Date("2021-01-10"),
    };

    const landlord3 = {
      name: "Markus Schäfer",
      email: "markus.schaefer@beispiel.de",
      properties: [property5, property6, property1, property7, property2],
      createdAt: new Date("2019-03-15"),
    };

    const landlord4 = {
      name: "Elisabeth Wolf",
      email: "elisabeth.wolf@beispiel.de",
      properties: [property8, property2, property4, property3, property5],
      createdAt: new Date("2022-08-01"),
    };

    const result = await UserModel.create([
      landlord1,
      landlord2,
      landlord3,
      landlord4,
    ]);

    console.log("Datenbank erfolgreich befüllt:", result);
  } catch (error) {
    console.error("Fehler beim Befüllen der Datenbank:", error);
  }
};
