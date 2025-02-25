import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { ArrowDown } from "lucide-react";
import { useTableView } from "./TableContext";

export function RowsDropdown() {
  const { pageSize, setPageSize } = useTableView();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          size="sm"
          endContent={<ArrowDown className="w-4 h-4" />}
        >
          {pageSize} Rows
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Rows per page"
        onAction={(key) => setPageSize(Number(key))}
      >
        <DropdownItem key="5">5 Rows</DropdownItem>
        <DropdownItem key="10">10 Rows</DropdownItem>
        <DropdownItem key="15">15 Rows</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}