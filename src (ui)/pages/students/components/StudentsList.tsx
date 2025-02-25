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
  GraduationCap,
  Calendar,
  BookOpen,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  School,
} from 'lucide-react';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  suspended: "warning",
  inactive: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "class",
  "contact",
  "status",
  "academicInfo",
  "actions",
];

interface StudentsListProps {
  students: any[];
  isLoading: boolean;
  error: string | null;
  onEdit: (student: any) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export function StudentsList({
  students,
  isLoading,
  error,
  onEdit,
  onDelete,
  onStatusChange,
}: StudentsListProps) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [classFilter, setClassFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const headerColumns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "CLASS", uid: "class", sortable: true },
    { name: "CONTACT", uid: "contact" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACADEMIC INFO", uid: "academicInfo", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];

  const filteredItems = React.useMemo(() => {
    let filtered = [...students];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.studentId.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }
    if (classFilter !== "all") {
      filtered = filtered.filter((item) => item.class === classFilter);
    }

    return filtered;
  }, [students, filterValue, statusFilter, classFilter]);

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
            <Avatar
              src={item.avatar}
              name={item.name}
              size="sm"
              isBordered
              color="primary"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-small text-default-500">{item.studentId}</p>
            </div>
          </div>
        );
      case "class":
        return (
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-default-500" />
            <div>
              <p>{item.class}</p>
              <p className="text-small text-default-500">{item.section}</p>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-default-500" />
              <span className="text-small">{item.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-default-500" />
              <span className="text-small">{item.phone}</span>
            </div>
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
      case "academicInfo":
        return (
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-default-500" />
              <span>GPA: {item.gpa}</span>
            </div>
            <div className="flex items-center gap-2 text-small text-default-500">
              <Calendar className="w-4 h-4" />
              <span>Joined: {item.joinDate}</span>
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
              <DropdownMenu aria-label="Student actions">
                <DropdownItem
                  key="status"
                  startContent={<BookOpen className="w-4 h-4" />}
                  description="Change student's current status"
                >
                  Change Status
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Trash2 className="w-4 h-4" />}
                  description="This action cannot be undone"
                  onPress={() => onDelete(item.id)}
                >
                  Delete Student
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
          placeholder="Search by name, ID or email..."
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
          Total {filteredItems.length} students
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
        <p className="text-large font-medium">Failed to load students</p>
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
        emptyContent={isLoading ? "Loading students..." : "No students found"}
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