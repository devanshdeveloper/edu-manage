import { useCallback, useState } from "react";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ApiEndpoints from "../../../constants/ApiEndpoints";
import { requestHelper } from "../../../helpers";
import { useDisclosure } from "@heroui/use-disclosure";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import Stats from "../../../components/ui/Stats/Stats";
import { Chip } from "@heroui/chip";

import {
  Search,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  GraduationCap,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
} from "lucide-react";

import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { TableView } from "../../../components/ui/TableView/TableView";
import { TeacherModal } from "./components/TeacherModal";
import AsyncSelect from "../../../components/inputs/AsyncSelect";
import { NumberInput } from "@heroui/number-input";
import { Select, SelectItem } from "@heroui/select";

const statusColorMap = {
  active: "success",
  onLeave: "warning",
  inactive: "danger",
};

const mockTeachers = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    employeeId: "TCH001",
    email: "sarah.wilson@school.edu",
    phone: "+1 (555) 123-4567",
    department: "Science",
    subjects: ["Physics", "Chemistry"],
    status: "active",
    experience: 8,
    avatar: "https://i.pravatar.cc/150?u=sarah",
    joinDate: "2016-08-15",
    address: "123 Education St, Academic City",
    qualifications: "Ph.D. in Physics, M.Sc. in Chemistry",
  },
  {
    id: "2",
    name: "Prof. Michael Brown",
    employeeId: "TCH002",
    email: "michael.brown@school.edu",
    phone: "+1 (555) 234-5678",
    department: "Mathematics",
    subjects: ["Algebra", "Calculus"],
    status: "active",
    experience: 12,
    avatar: "https://i.pravatar.cc/150?u=michael",
    joinDate: "2012-06-20",
    address: "456 Learning Ave, Knowledge Park",
    qualifications: "M.Sc. in Mathematics, B.Ed.",
  },
  {
    id: "3",
    name: "Ms. Emily Davis",
    employeeId: "TCH003",
    email: "emily.davis@school.edu",
    phone: "+1 (555) 345-6789",
    department: "English",
    subjects: ["Literature", "Grammar"],
    status: "onLeave",
    experience: 5,
    avatar: "https://i.pravatar.cc/150?u=emily",
    joinDate: "2019-01-10",
    address: "789 Wisdom Rd, Scholar Valley",
    qualifications: "M.A. in English Literature, TEFL Certification",
  },
];

const mockDepartments = [
  { label: "Science", value: "science" },
  { label: "Mathematics", value: "mathematics" },
  { label: "English", value: "english" },
];

const TeachersStatsData = [
  {
    title: "Total Teachers",
    value: "29",
    icon: "users",
    trend: "+5.2%",
    description: "vs last month",
  },
  {
    title: "Active Teachers",
    value: "15",
    icon: "user-check",
    trend: "+3.1%",
    description: "vs last month",
  },
  {
    title: "Average Experience",
    value: "10",
    icon: "clock",
    trend: "+0.5",
    description: "years vs last year",
  },
  {
    title: "Subjects Covered",
    value: "12",
    icon: "book-open",
    trend: "+2",
    description: "new subjects added",
  },
];

const headerColumns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "DEPARTMENT", uid: "department", sortable: true },
  { name: "SUBJECTS", uid: "subjects" },
  { name: "CONTACT", uid: "contact" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "EXPERIENCE", uid: "experience", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export function TeachersPage() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: [ApiEndpoints.Teacher.Stats],
    queryFn: () => {
      return TeachersStatsData;
      return requestHelper.request(ApiEndpoints.Teacher.Stats);
    },
  });

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    onModalOpen();
  };

  const handleAdd = () => {
    setSelectedTeacher(null);
    onModalOpen();
  };

  const renderCell = useCallback((item, columnKey) => {
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
              <p className="text-small text-default-500">{item.employeeId}</p>
            </div>
          </div>
        );
      case "department":
        return (
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-default-500" />
            <span>{item.department}</span>
          </div>
        );
      case "subjects":
        return (
          <div className="flex flex-wrap gap-1">
            {item.subjects.map((subject, index) => (
              <Chip key={index} size="sm" variant="flat">
                {subject}
              </Chip>
            ))}
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
          <Chip color={statusColorMap[item.status]} size="sm" variant="flat">
            {item.status}
          </Chip>
        );
      case "experience":
        return (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-default-500" />
            <span>{item.experience} years</span>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2 justify-end">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Teacher actions">
                <DropdownItem
                  key="view"
                  startContent={<Eye className="w-4 h-4" />}
                  description="View teacher's full details"
                  onPress={() => onEdit(item)}
                >
                  View Details
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  startContent={<Edit3 className="w-4 h-4" />}
                  description="Edit teacher's information"
                  onPress={() => onEdit(item)}
                >
                  Edit Teacher
                </DropdownItem>
                <DropdownItem
                  key="status"
                  startContent={<BookOpen className="w-4 h-4" />}
                  description="Change teacher's current status"
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
                  Delete Teacher
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Teachers</h1>
          <p className="text-default-500">
            Manage teacher profiles and assignments
          </p>
        </div>
        <Button
          color="primary"
          endContent={<Plus className="w-4 h-4" />}
          onPress={handleAdd}
        >
          Add Teacher
        </Button>
      </div>

      <Stats stats={TeachersStatsData} isLoading={isLoading} />

      <h2 className="text-lg font-semibold">Teacher Directory</h2>

      <TableView
        columns={headerColumns}
        queryOptions={{
          queryKey: [ApiEndpoints.Teacher.Paginate],
          queryFn: () => {
            return mockTeachers;
          },
        }}
        renderCell={renderCell}
        initialFilters={{
          search: "",
          department: new Set([]),
          subjects: new Set([]),
          status: new Set([]),
          experience: 0,
        }}
        renderFilters={(filters, setFilters) => {
          console.log({ filters });
          return (
            <>
              <Select
                className="max-w-xs"
                label="Favorite Animal"
                placeholder="Select an animal"
                // selectedKeys={filters.department}
                variant="bordered"
                // onSelectionChange={(value) => setFilters({ department: value })}
              >
                {mockDepartments.map((animal) => (
                  <SelectItem key={animal.value}>{animal.label}</SelectItem>
                ))}
              </Select>
              {/* <AsyncSelect
                label="Department"
                labelPlacement="outside"
                placeholder="Select Department"
                value={filters.department}
                onChange={(value) => {
                  console.log({value});
                  setFilters({ department: value });
                }}
                queryOptions={{
                  queryKey: ["departments"],
                  queryFn: () => {
                    return ;
                  },
                }}
              /> */}
              <AsyncSelect
                label="Subjects"
                labelPlacement="outside"
                placeholder="Select Subjects"
                value={filters.subjects}
                onChange={(e) => setFilters({ subjects: e.target.value })}
                queryOptions={{
                  queryKey: ["subjects"],
                  queryFn: () => {
                    return [
                      { label: "Physics", value: "physics" },
                      { label: "Chemistry", value: "chemistry" },
                      { label: "Algebra", value: "algebra" },
                      { label: "Calculus", value: "calculus" },
                      { label: "Literature", value: "literature" },
                      { label: "Grammar", value: "grammar" },
                    ];
                  },
                }}
                multiple
              />
              <AsyncSelect
                label="Status"
                labelPlacement="outside"
                placeholder="Select Status"
                value={filters.status}
                onChange={(e) => setFilters({ status: e.target.value })}
                queryOptions={{
                  queryKey: ["statuses"],
                  queryFn: () => {
                    return [
                      { label: "Active", value: "active" },
                      { label: "On Leave", value: "onLeave" },
                      { label: "Inactive", value: "inactive" },
                    ];
                  },
                }}
              />
              <NumberInput
                label="Experience"
                labelPlacement="outside"
                placeholder="Select Experience"
                value={filters.experience}
                onValueChange={(value) => setFilters({ experience: value })}
              />
            </>
          );
        }}
      />

      <TeacherModal
        teacher={selectedTeacher}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </div>
  );
}
