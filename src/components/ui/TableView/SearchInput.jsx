import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { useTableView } from "./TableContext";

export function SearchInput() {
  const { filters, setFilterValue, clearFilter } = useTableView();

  return (
    <Input
      isClearable
      classNames={{
        base: "w-full sm:max-w-[44%]",
      }}
      placeholder="Search by name or email..."
      size="sm"
      variant="faded"
      startContent={<Search className="w-4 h-4 text-default-300" />}
      value={filters.search}
      onClear={() => clearFilter("search")}
      onValueChange={(value) => setFilterValue("search", value)}
    />
  );
}