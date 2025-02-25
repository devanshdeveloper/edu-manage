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
} from '@nextui-org/react';
import {
  Search,
  SlidersHorizontal,
  Plus,
  Download,
  BarChart3,
  PieChart,
} from 'lucide-react';
import { MaterialStats } from './MaterialStats';
import { MaterialCard } from './MaterialCard';
import { MaterialUploadModal } from './MaterialUploadModal';
import { MaterialPreviewModal } from './MaterialPreviewModal';
import { useMaterials } from '../hooks/useMaterials';

export function SuperAdminMaterials() {
  const {
    materials,
    isLoading,
    error,
    stats,
  } = useMaterials();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const {
    isOpen: isUploadModalOpen,
    onOpen: onUploadModalOpen,
    onClose: onUploadModalClose,
  } = useDisclosure();
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

  return (
    <div className="space-y-6">
      <MaterialStats stats={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex gap-3">
            <BarChart3 className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Material Usage</p>
              <p className="text-small text-default-500">Downloads and views over time</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {/* TODO: Implement usage chart */}
            <div className="h-[300px] flex items-center justify-center bg-default-100 rounded-lg">
              <span className="text-default-500">Usage Chart Coming Soon</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <PieChart className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Material Distribution</p>
              <p className="text-small text-default-500">By subject and grade level</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {/* TODO: Implement distribution chart */}
            <div className="h-[300px] flex items-center justify-center bg-default-100 rounded-lg">
              <span className="text-default-500">Distribution Chart Coming Soon</span>
            </div>
          </CardBody>
        </Card>
      </div>

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

              <Select
                className="w-full sm:w-48"
                label="Grade"
                placeholder="Filter by grade"
              >
                <SelectItem key="all" value="all">All Grades</SelectItem>
                <SelectItem key="10" value="10">Grade 10</SelectItem>
                <SelectItem key="11" value="11">Grade 11</SelectItem>
                <SelectItem key="12" value="12">Grade 12</SelectItem>
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
                  <DropdownItem key="downloads">Most Downloads</DropdownItem>
                  <DropdownItem key="views">Most Views</DropdownItem>
                  <DropdownItem key="rating">Highest Rated</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button
                color="primary"
                variant="flat"
                startContent={<Download className="w-4 h-4" />}
              >
                Export
              </Button>

              <Button
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={onUploadModalOpen}
              >
                Upload Material
              </Button>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 gap-4">
            {materials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onView={handleView}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      <MaterialUploadModal
        isOpen={isUploadModalOpen}
        onClose={onUploadModalClose}
      />

      <MaterialPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={onPreviewModalClose}
        material={selectedMaterial}
        onDownload={handleDownload}
      />
    </div>
  );
}