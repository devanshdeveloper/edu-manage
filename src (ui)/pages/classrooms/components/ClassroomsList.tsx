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
  Tooltip,
  Pagination,
} from '@nextui-org/react';
import {
  Search,
  SlidersHorizontal,
  Building2,
  Users,
  GraduationCap,
  MapPin,
  Monitor,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Calendar,
} from 'lucide-react';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  maintenance: "warning",
  inactive: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "location",
  "capacity",
  "resources",
  "status",
  "assignments",
  "actions",
];

interface ClassroomsListProps {
  classrooms: any[];
  isLoading: boolean;
  error: string | null;
  onEdit: (classroom: any) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export function ClassroomsList({
  classrooms,
  isLoading,
  error,
  onEdit,
  onDelete,
  onStatusChange,
}: ClassroomsListProps) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const headerColumns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "LOCATION", uid: "location", sortable: true },
    { name: "CAPACITY", uid: "capacity", sortable: true },
    { name: "RESOURCES", uid: "resources" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ASSIGNMENTS", uid: "assignments" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const filteredItems = React.useMemo(() => {
    let filtered = [...classrooms];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.location.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [classrooms, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-small text-default-500">Room {item.roomNumber}</p>
            </div>
          </div>
        );
      case "location":
        return (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-default-500" />
            <span>{item.location}</span>
          </div>
        );
      case "capacity":
        return (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-default-500" />
            <span>{item.capacity} students</span>
          </div>
        );
      case "resources":
        return (
          <div className="flex flex-wrap gap-1">
            {item.resources.map((resource: string, index: number) => (
              <Chip key={index} size="sm" variant="flat">
                {resource}
              </Chip>
            ))}
          </div>
        );
      case "status":
        return (
          <Chip
            color={statusColorMap[item.status]}
            size="sm"
            variant="flat"
          >
            {item.status}
          </Chip>
        );
      case "assignments":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-default-500" />
              <span className="text-small">{item.teacherCount} teachers</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-default-500" />
              <span className="text-small">{item.studentCount} students</span>
            </div>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2 justify-end">
            <Tooltip content="View Details">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onEdit(item)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Edit">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => onEdit(item)}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </Tooltip>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Classroom actions">
                <DropdownItem
                  key="timetable"
                  startContent={<Calendar className="w-4 h-4" />}
                  description="View and edit class schedule"
                >
                  Manage Timetable
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Trash2 className="w-4 h-4" />}
                  description="This action cannot be undone"
                  onPress={() => onDelete(item.id)}
                >
                  Delete Classroom
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  }, [onEdit, onDelete]);

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
            inputWrapper: "border-1",
          }}
          placeholder="Search by name or location..."
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
          Total {filteredItems.length} classrooms
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
          <Building2 className="w-6 h-6 text-danger" />
        </div>
        <p className="text-large font-medium">Failed to load classrooms</p>
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
        emptyContent={isLoading ? "Loading classrooms..." : "No classrooms found"}
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