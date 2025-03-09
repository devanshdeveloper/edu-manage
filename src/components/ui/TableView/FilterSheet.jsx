import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { useTableView } from "./TableContext";
import { Button } from "@heroui/button";

export default function FilterSheet({ children }) {
  const {
    filters,
    setFilters,
    apply: applyFilters,
    reset: resetFilters,
    isFilterSheetOpen,
    // onFilterSheetOpen,
    onFilterSheetClose,
  } = useTableView();

  const handleApply = () => {
    applyFilters();
    onFilterSheetClose();
  };

  const handleReset = () => {
    resetFilters();
    onFilterSheetClose();
  };

  return (
    <Drawer isDismissable={false} isOpen={isFilterSheetOpen} size="sm" onClose={onFilterSheetClose}>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Filter Options</h3>
        </DrawerHeader>
        <DrawerBody className="space-y-6">
          {children(filters, setFilters)}
        </DrawerBody>
        <DrawerFooter className="border-t border-default-100">
          <Button
            color="danger"
            variant="light"
            type="button"
            onPress={handleReset}
            className="flex-1"
          >
            Reset
          </Button>
          <Button color="primary" onPress={handleApply} className="flex-1">
            Apply Filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
