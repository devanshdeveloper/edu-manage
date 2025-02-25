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
  Plus,
  Download,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { MaterialStats } from './MaterialStats';
import { MaterialCard } from './MaterialCard';
import { MaterialUploadModal } from './MaterialUploadModal';
import { MaterialPreviewModal } from './MaterialPreviewModal';
import { useMaterials } from '../hooks/useMaterials';

export function AdminMaterials() {
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
                label="Class"
                placeholder="Filter by class"
              >
                <SelectItem key="all" value="all">All Classes</SelectItem>
                <SelectItem key="10a" value="10a">Class 10-A</SelectItem>
                <SelectItem key="10b" value="10b">Class 10-B</SelectItem>
                <SelectItem key="10c" value="10c">Class 10-C</SelectItem>
              </Select>

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
                  <DropdownItem key="downloads">Most Downloads</DropdownItem>
                  <DropdownItem key="views">Most Views</DropdownItem>
                  <DropdownItem key="rating">Highest Rated</DropdownItem>
                </DropdownMenu>
              </Dropdown>

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
                  />
                ))}
              </div>
            </Tab>
            <Tab
              key="pending"
              title={
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Pending Approval</span>
                </div>
              }
            />
            <Tab
              key="approved"
              title={
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approved</span>
                </div>
              }
            />
            <Tab
              key="rejected"
              title={
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Rejected</span>
                </div>
              }
            />
          </Tabs>
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