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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  useDisclosure,
  Selection,
  ChipProps,
  SortDescriptor,
  Pagination,
  Card,
  CardBody,
} from '@nextui-org/react';
import {
  Search,
  SlidersHorizontal,
  Plus,
  MoreVertical,
  Building2,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Download,
  Trash2,
  Edit3,
  Eye,
} from 'lucide-react';
import { InstitutionModal } from './components/InstitutionModal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { useInstitutions } from './hooks/useInstitutions';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  trial: "warning",
  expired: "danger",
  suspended: "default",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "status",
  "plan",
  "users",
  "subscription",
  "contact",
  "actions",
];

export function InstitutionsPage() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [planFilter, setPlanFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const [selectedInstitution, setSelectedInstitution] = useState<any>(null);

  const { 
    institutions,
    isLoading,
    error,
    totalInstitutions,
    deleteInstitution 
  } = useInstitutions();

  const headerColumns = React.useMemo(() => [
    { name: "INSTITUTION", uid: "name", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "PLAN", uid: "plan", sortable: true },
    { name: "USERS", uid: "users", sortable: true },
    { name: "SUBSCRIPTION", uid: "subscription", sortable: true },
    { name: "CONTACT", uid: "contact" },
    { name: "ACTIONS", uid: "actions" },
  ], []);

  const filteredItems = React.useMemo(() => {
    let filtered = [...institutions];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }
    if (planFilter !== "all") {
      filtered = filtered.filter((item) => item.plan === planFilter);
    }

    return filtered;
  }, [institutions, filterValue, statusFilter, planFilter]);

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
              <p className="text-small text-default-500">{item.location}</p>
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
      case "plan":
        return (
          <div>
            <p className="font-medium">{item.plan}</p>
            <p className="text-small text-default-500">{item.features} features</p>
          </div>
        );
      case "users":
        return (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-default-500" />
            <span>{item.totalUsers}</span>
          </div>
        );
      case "subscription":
        return (
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-default-500" />
              <span>{item.renewalDate}</span>
            </div>
            <p className="text-small text-default-500">Next renewal</p>
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
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => {
                setSelectedInstitution(item);
                onModalOpen();
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => {
                setSelectedInstitution(item);
                onModalOpen();
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
                setSelectedInstitution(item);
                onDeleteModalOpen();
              }}
            >
              <Trash2 className="w-4 h-4" />
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
                Filters
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
          <Button
            className="bg-primary text-primary-foreground"
            endContent={<Plus className="w-4 h-4" />}
            size="sm"
            onPress={onModalOpen}
          >
            Add Institution
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {totalInstitutions} institutions
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
    statusFilter,
    visibleColumns,
    onSearchChange,
    totalInstitutions,
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
      <Card className="m-6">
        <CardBody>
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-danger/10 p-3 mb-4">
              <Building2 className="w-6 h-6 text-danger" />
            </div>
            <p className="text-large font-medium">Failed to load institutions</p>
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
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Institutions</h1>
          <p className="text-default-500">
            Manage all institutions using the platform
          </p>
        </div>
        <Button
          color="primary"
          endContent={<Download className="w-4 h-4" />}
          size="sm"
          variant="flat"
        >
          Export Data
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[calc(100vh-300px)]",
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
                isLoading ? (
                  "Loading institutions..."
                ) : (
                  "No institutions found"
                )
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
        </CardBody>
      </Card>

      <InstitutionModal
        institution={selectedInstitution}
        isOpen={isModalOpen}
        onClose={() => {
          onModalClose();
          setSelectedInstitution(null);
        }}
      />

      <DeleteConfirmationModal
        institution={selectedInstitution}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          onDeleteModalClose();
          setSelectedInstitution(null);
        }}
        onConfirm={async () => {
          if (selectedInstitution) {
            await deleteInstitution(selectedInstitution.id);
            onDeleteModalClose();
            setSelectedInstitution(null);
          }
        }}
      />
    </div>
  );
}