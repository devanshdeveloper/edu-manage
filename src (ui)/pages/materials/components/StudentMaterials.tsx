import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Select,
  SelectItem,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tab,
  Tabs,
} from '@nextui-org/react';
import {
  Search,
  SlidersHorizontal,
  FileText,
  Bookmark,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { MaterialCard } from './MaterialCard';
import { MaterialPreviewModal } from './MaterialPreviewModal';
import { useMaterials } from '../hooks/useMaterials';

export function StudentMaterials() {
  const {
    materials,
    isLoading,
    error,
  } = useMaterials();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const {
    isOpen: isPreviewModalOpen,
    onOpen: onPreviewModalOpen,
    onClose: onPreviewModalClose,
  } = useDisclosure();

  const handleView = (id: string) => {
    const material = materials.find(m => m.id === id);
    if (material) {
      setSelectedMaterial(material);
      onPreviewModalOpen();
    }
  };

  const handleDownload = (id: string) => {
    // TODO: Implement download logic
    console.log('Downloading material:', id);
  };

  const handleBookmark = (id: string) => {
    // TODO: Implement bookmark logic
    console.log('Bookmarking material:', id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                className="w-full sm:w-64"
                placeholder="Search materials..."
                startContent={<Search className="w-4 h-4 text-default-400" />}
                value={searchQuery}
                onValueChange={setSearchQuery}
              />

              <Select
                className="w-full sm:w-48"
                label="Subject"
                placeholder="Filter by subject"
              >
                <SelectItem key="all" value="all">All Subjects</SelectItem>
                <SelectItem key="math" value="math">Mathematics</SelectItem>
                <SelectItem key="science" value="science">Science</SelectItem>
                <SelectItem key="english" value="english">English</SelectItem>
              </Select>
            </div>

            <div className="flex gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    startContent={<SlidersHorizontal className="w-4 h-4" />}
                  >
                    Sort
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Sort options">
                  <DropdownItem key="newest">Newest First</DropdownItem>
                  <DropdownItem key="oldest">Oldest First</DropdownItem>
                  <DropdownItem key="popular">Most Popular</DropdownItem>
                  <DropdownItem key="rating">Highest Rated</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Tabs aria-label="Material categories">
            <Tab
              key="all"
              title={
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>All Materials</span>
                </div>
              }
            >
              <div className="grid grid-cols-1 gap-4 mt-4">
                {materials.map((material) => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    onView={handleView}
                    onDownload={handleDownload}
                    onBookmark={handleBookmark}
                    showProgress
                  />
                ))}
              </div>
            </Tab>
            <Tab
              key="bookmarked"
              title={
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmarked</span>
                </div>
              }
            />
            <Tab
              key="inProgress"
              title={
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>In Progress</span>
                </div>
              }
            />
            <Tab
              key="completed"
              title={
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completed</span>
                </div>
              }
            />
          </Tabs>
        </CardBody>
      </Card>

      <MaterialPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={onPreviewModalClose}
        material={selectedMaterial}
        onDownload={handleDownload}
      />
    </div>
  );
}