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
} from '@nextui-org/react';
import {
  Upload,
  Download,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
} from 'lucide-react';

interface ImportStudentsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function ImportStudents({ onNext, onBack }: ImportStudentsProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'validating' | 'completed' | 'error'>('idle');
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
          name: 'John Smith',
          email: 'john.smith@example.com',
          grade: '10',
          section: 'A',
          message: 'Valid',
        },
        {
          row: 2,
          status: 'error',
          name: 'Emma Wilson',
          email: 'invalid-email',
          grade: '10',
          section: 'B',
          message: 'Invalid email format',
        },
        {
          row: 3,
          status: 'warning',
          name: 'Michael Brown',
          email: 'michael.brown@example.com',
          grade: '13',
          section: 'A',
          message: 'Grade out of range',
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
      // Processed student data
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Import Students</h2>
        <p className="text-default-500">
          Upload your student data in bulk using our template
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardBody className="space-y-4">
            <h3 className="text-lg font-medium">1. Download Template</h3>
            <p className="text-small text-default-500">
              Start by downloading our student import template. The template includes all required fields and examples.
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
              Fill out the template with your student data and upload it here.
              Supported formats: .xlsx, .csv
            </p>
            <Button
              color="primary"
              variant="flat"
              startContent={<Upload className="w-4 h-4" />}
              onPress={() => document.getElementById('file-upload')?.click()}
            >
              Upload File
            </Button>
            <input
              id="file-upload"
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
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>GRADE</TableColumn>
              <TableColumn>SECTION</TableColumn>
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
                  <TableCell>{result.email}</TableCell>
                  <TableCell>{result.grade}</TableCell>
                  <TableCell>{result.section}</TableCell>
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

      <div className="flex justify-between">
        <Button variant="flat" onPress={onBack}>
          Back
        </Button>
        <Button
          color="primary"
          onPress={handleContinue}
          isDisabled={uploadStatus !== 'completed'}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}