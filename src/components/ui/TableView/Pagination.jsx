import { Pagination as NextUIPagination } from "@heroui/pagination";
import { useTableView } from "./TableContext";

export function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = useTableView();

  return (
    <NextUIPagination
      showControls
      classNames={{
        cursor: "bg-primary",
      }}
      color="primary"
      page={currentPage}
      total={totalPages}
      variant="light"
      onChange={setCurrentPage}
    />
  );
}