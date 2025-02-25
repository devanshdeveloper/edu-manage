import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Chip,
} from '@nextui-org/react';
import {
  FileText,
  Upload,
  BookOpen,
  GraduationCap,
  Tag,
  Users,
} from 'lucide-react';

interface MaterialUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  material?: any;
}

const subjects = [
  { label: 'Mathematics', value: 'mathematics' },
  { label: 'Physics', value: 'physics' },
  { label: 'Chemistry', value: 'chemistry' },
  { label: 'Biology', value: 'biology' },
  { label: 'English', value: 'english' },
  { label: 'History', value: 'history' },
];

const grades = [
  { label: 'Grade 6', value: '6' },
  { label: 'Grade 7', value: '7' },
  { label: 'Grade 8', value: '8' },
  { label: 'Grade 9', value: '9' },
  { label: 'Grade 10', value: '10' },
  { label: 'Grade 11', value: '11' },
  { label: 'Grade 12', value: '12' },
];

export function MaterialUploadModal({
  isOpen,
  onClose,
  material,
}: MaterialUploadModalProps) {
  const isEditing = !!material;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>(material?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    onClose();
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex gap-1">
            {isEditing ? 'Edit Study Material' : 'Upload New Study Material'}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  autoFocus
                  endContent={<FileText className="w-4 h-4 text-default-400" />}
                  label="Title"
                  placeholder="Enter material title"
                  variant="bordered"
                  defaultValue={material?.title}
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Description"
                  placeholder="Enter material description"
                  variant="bordered"
                  defaultValue={material?.description}
                />
              </div>

              <Select
                endContent={<BookOpen className="w-4 h-4 text-default-400" />}
                label="Subject"
                placeholder="Select subject"
                variant="bordered"
                defaultSelectedKeys={material ? [material.subject] : undefined}
              >
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                endContent={<GraduationCap className="w-4 h-4 text-default-400" />}
                label="Grade Level"
                placeholder="Select grade level"
                variant="bordered"
                defaultSelectedKeys={material ? [material.grade] : undefined}
              >
                {grades.map((grade) => (
                  <SelectItem key={grade.value} value={grade.value}>
                    {grade.label}
                  </SelectItem>
                ))}
              </Select>

              <div className="md:col-span-2">
                <Input
                  endContent={<Tag className="w-4 h-4 text-default-400" />}
                  label="Tags"
                  placeholder="Add tags (press Enter)"
                  variant="bordered"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      onClose={() => handleRemoveTag(tag)}
                      variant="flat"
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <Select
                  endContent={<Users className="w-4 h-4 text-default-400" />}
                  label="Assign to Classrooms"
                  placeholder="Select classrooms"
                  variant="bordered"
                  selectionMode="multiple"
                  defaultSelectedKeys={material?.classrooms}
                >
                  <SelectItem key="10a" value="10a">Class 10-A</SelectItem>
                  <SelectItem key="10b" value="10b">Class 10-B</SelectItem>
                  <SelectItem key="10c" value="10c">Class 10-C</SelectItem>
                </Select>
              </div>

              {!isEditing && (
                <div className="md:col-span-2">
                  <Input
                    type="file"
                    label="Upload File"
                    placeholder="Select file to upload"
                    variant="bordered"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setSelectedFile(file);
                    }}
                    endContent={<Upload className="w-4 h-4 text-default-400" />}
                  />
                  <p className="text-small text-default-500 mt-1">
                    Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                  </p>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Upload Material'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}