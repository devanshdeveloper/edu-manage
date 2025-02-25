import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  SortDescriptor,
  Avatar,
  Tooltip,
  Pagination,
} from '@nextui-org/react';
import {
  Search,
  SlidersHorizontal,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  GraduationCap,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
} from 'lucide-react';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  onLeave: "warning",
  inactive: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "department",
  "subjects",
  "contact",
  "status",
  "experience",
  "actions",
];

interface TeachersListProps {
  teachers: any[];
  isLoading: boolean;
  error: string | null;
  onEdit: (teacher: any) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export function TeachersList({
  teachers,
  isLoading,
  error,
  onEdit,
  onDelete,
  onStatusChange,
}: TeachersListProps) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [departmentFilter, setDepartmentFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const headerColumns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "DEPARTMENT", uid: "department", sortable: true },
    { name: "SUBJECTS", uid: "subjects" },
    { name: "CONTACT", uid: "contact" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "EXPERIENCE", uid: "experience", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];

  const filteredItems = React.useMemo(() => {
    let filtered = [...teachers];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }
    if (departmentFilter !== "all") {
      filtered = filtered.filter((item) => item.department === departmentFilter);
    }

    return filtered;
  }, [teachers, filterValue, statusFilter, departmentFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
          }}
          placeholder="Search by name or email..."
          size="sm"
          startContent={<Search className="w-4 h-4 text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
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
              onSelectionChange={setVisibleColumns}
            >
              {headerColumns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {filteredItems.length} teachers
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  ), [
    filterValue,
    visibleColumns,
    onSearchChange,
    filteredItems.length,
    rowsPerPage,
  ]);

  const bottomContent = React.useMemo(() => (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        showControls
        classNames={{
          cursor: "bg-primary",
        }}
        color="primary"
        page={page}
        total={pages}
        variant="light"
        onChange={setPage}
      />
      <span className="text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${filteredItems.length} selected`}
      </span>
    </div>
  ), [selectedKeys, items.length, page, pages, selectedKeys.size]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="rounded-full bg-danger/10 p-3 mb-4">
          <GraduationCap className="w-6 h-6 text-danger" />
        </div>
        <p className="text-large font-medium">Failed to load teachers</p>
        <p className="text-small text-default-500">
          Please try again later or contact support if the problem persists.
        </p>
        <Button
          className="mt-4"
          color="primary"
          onPress={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Table
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[600px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
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
        emptyContent={isLoading ? "Loading teachers..." : "No teachers found"}
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