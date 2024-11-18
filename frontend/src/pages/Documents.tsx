import { useState } from "react";
import { Search, Filter } from "lucide-react";

const mockDocuments = [
  { id: 1, title: "Project Proposal", type: "PDF", date: "2023-05-15" },
  { id: 2, title: "Meeting Minutes", type: "DOCX", date: "2023-05-10" },
  { id: 3, title: "Budget Report", type: "XLSX", date: "2023-05-05" },
  { id: 4, title: "Product Roadmap", type: "PDF", date: "2023-05-01" },
  { id: 5, title: "User Research", type: "PDF", date: "2023-04-28" },
];
const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredDocuments = mockDocuments.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "All" || doc.type === filterType)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Document List</h1>

      <div className="mb-4 flex gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            size={20}
          />
        </div>
        <div className="relative">
          <select
            className="appearance-none pl-10 pr-8 py-2 border rounded-md"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="XLSX">XLSX</option>
          </select>
          <Filter
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            size={20}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {filteredDocuments.map((doc) => (
          <li
            key={doc.id}
            className="border rounded-md p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{doc.title}</h2>
              <p className="text-sm">
                {doc.type} • {doc.date}
              </p>
            </div>
            <button className="px-4 py-2 border rounded-md">View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Documents;
