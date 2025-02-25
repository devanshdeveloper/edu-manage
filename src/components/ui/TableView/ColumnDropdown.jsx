import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { SlidersHorizontal } from "lucide-react";
import { useTableView } from "./TableContext";

export function ColumnDropdown({ columns }) {
  const { visibleColumns, onVisibleColumnsChange } = useTableView();

  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={<SlidersHorizontal className="w-4 h-4" />}
          size="sm"
          variant="flat"
        >
          Columns
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect={false}
        selectedKeys={visibleColumns}
        selectionMode="multiple"
        onSelectionChange={onVisibleColumnsChange}
      >
        {columns.map((column) => (
          <DropdownItem key={column.uid} className="capitalize">
            {column.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}