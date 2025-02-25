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
  Pagination,
  Selection,
  SortDescriptor,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import {
  Search,
  SlidersHorizontal,
  Building2,
  Calendar,
  CreditCard,
  Eye,
  Edit3,
  Ban,
} from 'lucide-react';
import { SubscriptionModal } from './SubscriptionModal';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  expiring: "warning",
  cancelled: "danger",
  suspended: "default",
};

const INITIAL_VISIBLE_COLUMNS = [
  "institution",
  "plan",
  "status",
  "billing",
  "nextPayment",
  "actions",
];

interface SubscriptionsListProps {
  subscriptions: any[];
  isLoading: boolean;
  error: string | null;
}

export function SubscriptionsList({
  subscriptions,
  isLoading,
  error,
}: SubscriptionsListProps) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "institution",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headerColumns = [
    { name: "INSTITUTION", uid: "institution", sortable: true },
    { name: "PLAN", uid: "plan", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "BILLING", uid: "billing", sortable: true },
    { name: "NEXT PAYMENT", uid: "nextPayment", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ];

  const filteredItems = React.useMemo(() => {
    let filtered = [...subscriptions];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.institution.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [subscriptions, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "institution":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{item.institution}</p>
              <p className="text-small text-default-500">{item.email}</p>
            </div>
          </div>
        );
      case "plan":
        return (
          <div>
            <p className="font-medium">{item.plan}</p>
            <p className="text-small text-default-500">
              {item.price}/month
            </p>
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
      case "billing":
        return (
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-default-500" />
            <span>Monthly</span>
          </div>
        );
      case "nextPayment":
        return (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-default-500" />
            <span>{item.nextPayment}</span>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => {
                setSelectedSubscription(item);
                setIsModalOpen(true);
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => {
                setSelectedSubscription(item);
                setIsModalOpen(true);
              }}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onPress={() => {
                // TODO: Implement subscription cancellation
              }}
            >
              <Ban className="w-4 h-4" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  }, []);

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
          placeholder="Search by institution..."
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
          Total {filteredItems.length} subscriptions
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
          <CreditCard className="w-6 h-6 text-danger" />
        </div>
        <p className="text-large font-medium">Failed to load subscriptions</p>
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
    <>
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
          emptyContent={
            isLoading ? "Loading subscriptions..." : "No subscriptions found"
          }
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

      <SubscriptionModal
        subscription={selectedSubscription}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSubscription(null);
        }}
      />
    </>
  );
}