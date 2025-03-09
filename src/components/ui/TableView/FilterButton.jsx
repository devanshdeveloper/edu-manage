import { Button } from "@heroui/button";
import { useTableView } from "./TableContext";
import { FilterIcon } from "lucide-react";

function FilterButton() {
  const { onFilterSheetOpen } = useTableView();

  return (
    <Button
      endContent={<FilterIcon className="w-4 h-4" />}
      size="sm"
      variant="flat"
      onPress={() => onFilterSheetOpen()}
    >
      Filters
    </Button>
  );
}

export default FilterButton;
