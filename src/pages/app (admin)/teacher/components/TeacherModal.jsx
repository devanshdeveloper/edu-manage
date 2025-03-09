import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import { Select, SelectSection, SelectItem } from "@heroui/select";

import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  FileText,
  Clock,
} from "lucide-react";

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { AvatarInput } from "../../../../components/inputs/AvatarInput";
import ValidatorHelper from "../../../../helpers/ValidatorHelper";
import FormMutation from "../../../../components/common/FormMutation";

const departments = [
  { label: "Mathematics", value: "mathematics" },
  { label: "Science", value: "science" },
  { label: "English", value: "english" },
  { label: "History", value: "history" },
  { label: "Computer Science", value: "computer-science" },
];

const subjects = [
  { label: "Algebra", value: "algebra" },
  { label: "Geometry", value: "geometry" },
  { label: "Physics", value: "physics" },
  { label: "Chemistry", value: "chemistry" },
  { label: "Biology", value: "biology" },
  { label: "Literature", value: "literature" },
  { label: "Grammar", value: "grammar" },
  { label: "World History", value: "world-history" },
  { label: "Programming", value: "programming" },
];

export function TeacherModal({ isOpen, onClose, teacher }) {
  const isEditing = !!teacher;

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      scrollBehavior="outside"
    >
      <ModalContent>
        <FormMutation
          formOptions={{
            defaultValues: {
              name: teacher?.name,
              employeeId: teacher?.employeeId,
              email: teacher?.email,
              phone: teacher?.phone,
              department: teacher?.department,
              subjects: teacher?.subjects,
              joinDate: teacher?.joinDate,
              experience: teacher?.experience,
              address: teacher?.address,
              qualifications: teacher?.qualifications,
            },
          }}
          mutationOptions={{
            mutationFn: async (data) => {
              // TODO: Implement API call
              console.log("Form data:", data);
              onClose();
            },
          }}
        >
          {({ formState }) => (
            <>
              <ModalHeader className="flex gap-1">
                {isEditing ? "Edit Teacher Profile" : "Add New Teacher"}
              </ModalHeader>
              <ModalBody className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 flex justify-center">
                    <AvatarInput
                      value={teacher?.avatar}
                      onChange={(file) => {
                        // TODO: Handle file upload
                        console.log("File selected:", file);
                      }}
                    />
                  </div>

                  <Input
                    autoFocus
                    endContent={<User className="w-4 h-4 text-default-400" />}
                    label="Full Name"
                    placeholder="Enter full name"
                    variant="bordered"
                    validate={ValidatorHelper.helper(
                      ValidatorHelper.required()
                    )}
                    {...formState.register("name")}
                  />

                  <Input
                    endContent={
                      <FileText className="w-4 h-4 text-default-400" />
                    }
                    label="Employee ID"
                    placeholder="Enter employee ID"
                    variant="bordered"
                    validate={ValidatorHelper.helper(
                      ValidatorHelper.required()
                    )}
                    {...formState.register("employeeId")}
                  />

                  <Input
                    endContent={<Mail className="w-4 h-4 text-default-400" />}
                    label="Email"
                    placeholder="Enter email address"
                    type="email"
                    variant="bordered"
                    validate={ValidatorHelper.helper(
                      ValidatorHelper.required()
                    )}
                    {...formState.register("email")}
                  />

                  <Input
                    endContent={<Phone className="w-4 h-4 text-default-400" />}
                    label="Phone"
                    placeholder="Enter phone number"
                    type="tel"
                    variant="bordered"
                    validate={ValidatorHelper.helper(
                      ValidatorHelper.required()
                    )}
                    {...formState.register("phone")}
                  />

                  <Select
                    endContent={
                      <GraduationCap className="w-4 h-4 text-default-400" />
                    }
                    label="Department"
                    placeholder="Select department"
                    variant="bordered"
                    validate={ValidatorHelper.helper(
                      ValidatorHelper.required()
                    )}
                    {...formState.register("department")}
                  >
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    endContent={
                      <BookOpen className="w-4 h-4 text-default-400" />
                    }
                    label="Subjects"
                    placeholder="Select subjects"
                    variant="bordered"
                    selectionMode="multiple"
                    onSelectionChange={(selection) => {
                      console.log("Subjects selected:", selection);
                    }}
                    // defaultSelectedKeys={teacher?.subjects}
                    validate={ValidatorHelper.helper(
                      ValidatorHelper.required()
                    )}
                    {...formState.register("subjects")}
                  >
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    endContent={
                      <Calendar className="w-4 h-4 text-default-400" />
                    }
                    label="Join Date"
                    placeholder="Select join date"
                    type="date"
                    variant="bordered"
                    validate={ValidatorHelper.helper(
                      ValidatorHelper.required()
                    )}
                    {...formState.register("joinDate")}
                  />

                  <Input
                    endContent={<Clock className="w-4 h-4 text-default-400" />}
                    label="Experience (Years)"
                    placeholder="Enter years of experience"
                    type="number"
                    variant="bordered"
                    validate={ValidatorHelper.helper(
                      ValidatorHelper.required()
                    )}
                    {...formState.register("experience")}
                  />

                  <div className="md:col-span-2">
                    <Textarea
                      endContent={
                        <MapPin className="w-4 h-4 text-default-400" />
                      }
                      label="Address"
                      placeholder="Enter full address"
                      variant="bordered"
                      validate={ValidatorHelper.helper(
                        ValidatorHelper.required()
                      )}
                      {...formState.register("address")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Textarea
                      label="Qualifications"
                      placeholder="Enter educational qualifications"
                      variant="bordered"
                      validate={ValidatorHelper.helper(
                        ValidatorHelper.required()
                      )}
                      {...formState.register("qualifications")}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  {isEditing ? "Save Changes" : "Add Teacher"}
                </Button>
              </ModalFooter>
            </>
          )}
        </FormMutation>
      </ModalContent>
    </Modal>
  );
}
