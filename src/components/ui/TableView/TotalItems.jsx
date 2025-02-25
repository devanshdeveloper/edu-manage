import { useTableView } from "./TableContext";

export function TotalItems() {
  const { items } = useTableView();

  return (
    <span className="text-default-400 text-small">
      Total {items.length} items
    </span>
  );
}