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
  FileText,
  Clock,
  Users,
  Calendar,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Play,
  Pause,
} from 'lucide-react';

const statusColorMap: Record<string, ChipProps["color"]> = {
  scheduled: "primary",
  active: "success",
  completed: "default",
  draft: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "subject",
  "schedule",
  "status",
  "participants",
  "createdBy",
  "actions",
];

interface TestsListProps {
  tests: any[];
  isLoading: boolean;
  error: string | null;
  onEdit: (test: any) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export function TestsList({
  tests,
  isLoading,
  error,
  onEdit,
  onDelete,
  onStatusChange,
}: TestsListProps) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "startDate",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const headerColumns = [
    { name: "TITLE", uid: "title", sortable: true },
    { name: "SUBJECT", uid: "subject", sortable: true },
    { name: "SCHEDULE", uid: "schedule", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "PARTICIPANTS", uid: "participants" },
    { name: "CREATED BY", uid: "createdBy" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const filteredItems = React.useMemo(() => {
    let filtered = [...tests];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.subject.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [tests, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "title":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-small text-default-500">
                {item.totalQuestions} questions • {item.maxScore} points
              </p>
            </div>
          </div>
        );
      case "subject":
        return (
          <div className="capitalize">{item.subject}</div>
        );
      case "schedule":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-default-500" />
              <span className="text-small">
                {new Date(item.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-default-500" />
              <span className="text-small">{item.duration} minutes</span>
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
      case "participants":
        return (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-default-500" />
            <div>
              {item.classrooms.map((classroom: string) => (
                <Chip key={classroom} size="sm" variant="flat" className="mr-1">
                  {classroom}
                </Chip>
              ))}
            </div>
          </div>
        );
      case "createdBy":
        return (
          <div className="flex items-center gap-2">
            <Avatar
              src={item.createdBy.avatar}
              size="sm"
              name={item.createdBy.name}
            />
            <span className="text-small">{item.createdBy.name}</span>
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
              <DropdownMenu aria-label="Test actions">
                {item.status === 'scheduled' && (
                  <DropdownItem
                    key="activate"
                    startContent={<Play className="w-4 h-4" />}
                    description="Start the test now"
                    onPress={() => onStatusChange(item.id, 'active')}
                  >
                    Activate Test
                  </DropdownItem>
                )}
                {item.status === 'active' && (
                  <DropdownItem
                    key="pause"
                    startContent={<Pause className="w-4 h-4" />}
                    description="Pause the test temporarily"
                    onPress={() => onStatusChange(item.id, 'paused')}
                  >
                    Pause Test
                  </DropdownItem>
                )}
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Trash2 className="w-4 h-4" />}
                  description="This action cannot be undone"
                  onPress={() => onDelete(item.id)}
                >
                  Delete Test
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  }, [onEdit, onDelete, onStatusChange]);

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
          placeholder="Search by title or subject..."
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
          Total {filteredItems.length} tests
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
          <FileText className="w-6 h-6 text-danger" />
        </div>
        <p className="text-large font-medium">Failed to load tests</p>
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
        emptyContent={isLoading ? "Loading tests..." : "No tests found"}
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