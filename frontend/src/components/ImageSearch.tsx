import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "newest" | "oldest";

interface SearchAndSortProps {
  onSearch: (term: string) => void;
  onSort: (option: SortOption) => void;
}

export const SearchAndSort = ({ onSearch, onSort }: SearchAndSortProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSort = (value: SortOption) => {
    setSortOption(value);
    onSort(value);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:flex-row">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
      </div>
      <Select value={sortOption} onValueChange={handleSort}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
