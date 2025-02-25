import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Progress,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Input,
  Tabs,
  Tab,
} from '@nextui-org/react';
import {
  Upload,
  Download,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Users,
  BookOpen,
} from 'lucide-react';

interface ImportClassroomsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function ImportClassrooms({ onNext, onBack }: ImportClassroomsProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'validating' | 'completed' | 'error'>('idle');
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("import");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      
      // Simulate file upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setUploadStatus('validating');
          simulateValidation();
        }
      }, 200);
    }
  };

  const simulateValidation = () => {
    // Simulate validation process
    setTimeout(() => {
      setValidationResults([
        {
          row: 1,
          status: 'success',
          name: 'Class 10-A',
          capacity: 30,
          subjects: ['Mathematics', 'Physics', 'Chemistry'],
          teacher: 'Dr. Sarah Wilson',
          message: 'Valid',
        },
        {
          row: 2,
          status: 'warning',
          name: 'Class 11-B',
          capacity: 45,
          subjects: ['Biology', 'Chemistry'],
          teacher: 'Pending Assignment',
          message: 'No teacher assigned',
        },
        {
          row: 3,
          status: 'error',
          name: 'Class Invalid',
          capacity: 0,
          subjects: [],
          teacher: 'Unknown',
          message: 'Invalid capacity',
        },
      ]);
      setUploadStatus('completed');
    }, 1500);
  };

  const downloadTemplate = () => {
    // TODO: Implement template download
    console.log('Downloading template...');
  };

  const handleContinue = () => {
    onNext({
      // Processed classroom data
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Set Up Classrooms</h2>
        <p className="text-default-500">
          Create your classroom structure by importing data or adding manually
        </p>
      </div>

      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        <Tab
          key="import"
          title={
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Bulk Import</span>
            </div>
          }
        >
          <div className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardBody className="space-y-4">
                  <h3 className="text-lg font-medium">1. Download Template</h3>
                  <p className="text-small text-default-500">
                    Download our classroom import template with all required fields and examples.
                  </p>
                  <Button
                    variant="flat"
                    startContent={<Download className="w-4 h-4" />}
                    onPress={downloadTemplate}
                  >
                    Download Template
                  </Button>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="space-y-4">
                  <h3 className="text-lg font-medium">2. Upload Data</h3>
                  <p className="text-small text-default-500">
                    Fill out the template and upload it here.
                    Supported formats: .xlsx, .csv
                  </p>
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<Upload className="w-4 h-4" />}
                    onPress={() => document.getElementById('classroom-upload')?.click()}
                  >
                    Upload File
                  </Button>
                  <input
                    id="classroom-upload"
                    type="file"
                    accept=".xlsx,.csv"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </CardBody>
              </Card>
            </div>

            {uploadStatus !== 'idle' && (
              <Card>
                <CardBody className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Upload Progress</h3>
                    <Chip
                      color={
                        uploadStatus === 'completed'
                          ? 'success'
                          : uploadStatus === 'error'
                          ? 'danger'
                          : 'primary'
                      }
                    >
                      {uploadStatus.charAt(0).toUpperCase() + uploadStatus.slice(1)}
                    </Chip>
                  </div>
                  <Progress
                    value={uploadProgress}
                    color={
                      uploadStatus === 'completed'
                        ? 'success'
                        : uploadStatus === 'error'
                        ? 'danger'
                        : 'primary'
                    }
                    className="w-full"
                  />
                </CardBody>
              </Card>
            )}

            {validationResults.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Validation Results</h3>
                  <Input
                    className="w-64"
                    placeholder="Search results..."
                    startContent={<Search className="w-4 h-4 text-default-400" />}
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                </div>

                <Table aria-label="Validation results">
                  <TableHeader>
                    <TableColumn>ROW</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>CAPACITY</TableColumn>
                    <TableColumn>SUBJECTS</TableColumn>
                    <TableColumn>TEACHER</TableColumn>
                    <TableColumn>MESSAGE</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {validationResults.map((result) => (
                      <TableRow key={result.row}>
                        <TableCell>{result.row}</TableCell>
                        <TableCell>
                          {result.status === 'success' && (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          )}
                          {result.status === 'error' && (
                            <XCircle className="w-5 h-5 text-danger" />
                          )}
                          {result.status === 'warning' && (
                            <AlertTriangle className="w-5 h-5 text-warning" />
                          )}
                        </TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>{result.capacity}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {result.subjects.map((subject: string, index: number) => (
                              <Chip key={index} size="sm">
                                {subject}
                              </Chip>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{result.teacher}</TableCell>
                        <TableCell>
                          <Chip
                            color={
                              result.status === 'success'
                                ? 'success'
                                : result.status === 'error'
                                ? 'danger'
                                : 'warning'
                            }
                            size="sm"
                          >
                            {result.message}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          key="manual"
          title={
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Manual Setup</span>
            </div>
          }
        >
          <div className="pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Example classroom cards */}
              <Card isPressable className="border-2 border-dashed border-default-200">
                <CardBody className="h-40 flex flex-col items-center justify-center">
                  <Plus className="w-8 h-8 text-default-400 mb-2" />
                  <p className="text-default-400">Add New Classroom</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium">Class 10-A</h4>
                    <Chip color="primary" variant="flat">Science</Chip>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-default-400" />
                      <span>30 students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-default-400" />
                      <span>6 subjects</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium">Class 11-B</h4>
                    <Chip color="primary" variant="flat">Commerce</Chip>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-default-400" />
                      <span>25 students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-default-400" />
                      <span>5 subjects</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="flat" onPress={onBack}>
          Back
        </Button>
        <Button
          color="primary"
          onPress={handleContinue}
          isDisabled={uploadStatus !== 'completed' && selectedTab === 'import'}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}