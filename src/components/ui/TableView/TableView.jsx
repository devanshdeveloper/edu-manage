import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { TableProvider, useTableView } from "./TableContext";
import { SearchInput } from "./SearchInput";
import { ColumnDropdown } from "./ColumnDropdown";
import { RowsDropdown } from "./RowsDropdown";
import { TotalItems } from "./TotalItems";
import { Pagination } from "./Pagination";

export function TableView({
  columns,
  queryOptions,
  renderCell,
  initialFilters,
}) {
  const topContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <SearchInput />
        <div className="flex gap-3">
          <ColumnDropdown columns={columns} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <TotalItems />
        <RowsDropdown />
      </div>
    </div>
  );

  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination />
    </div>
  );

  function RenderTable() {
    const { isLoading, items, visibleColumns, selectionProps } = useTableView();

    return (
      <Table
        isHeaderSticky
        bottomContent={bottomContent}
        classNames={{
          wrapper: "max-h-[600px]",
        }}
        selectionMode="multiple"
        topContent={topContent}
        {...selectionProps}

        // bottomContentPlacement="outside"
        // topContentPlacement="outside"
      >
        <TableHeader
          columns={columns.filter((column) =>
            [...visibleColumns].includes(column.uid)
          )}
        >
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={isLoading ? "Loading..." : "No items found"}
          items={items}
          loadingContent={
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-md" />
            </div>
          }
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }

  return (
    <TableProvider
      columns={columns}
      queryOptions={queryOptions}
      initialFilters={initialFilters}
    >
      <RenderTable />
    </TableProvider>
  );
}
