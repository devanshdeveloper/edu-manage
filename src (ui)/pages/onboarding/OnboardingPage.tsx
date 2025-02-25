import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Progress,
  Divider,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { School, Users, BookOpen, Settings, CheckCircle2 } from 'lucide-react';
import { InstitutionSetup } from './steps/InstitutionSetup';
import { ImportStudents } from './steps/ImportStudents';
import { ImportClassrooms } from './steps/ImportClassrooms';
import { FinalSetup } from './steps/FinalSetup';

const steps = [
  {
    id: 'institution',
    title: 'Institution Details',
    description: 'Set up your institution profile',
    icon: School,
  },
  {
    id: 'students',
    title: 'Import Students',
    description: 'Add your students in bulk',
    icon: Users,
  },
  {
    id: 'classrooms',
    title: 'Import Classrooms',
    description: 'Set up your classrooms',
    icon: BookOpen,
  },
  {
    id: 'final',
    title: 'Final Setup',
    description: 'Configure additional settings',
    icon: Settings,
  },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    institution: null,
    students: [],
    classrooms: [],
    settings: null,
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = (data: any) => {
    setOnboardingData((prev) => ({
      ...prev,
      [steps[currentStep].id]: data,
    }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // TODO: Submit all data to backend
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InstitutionSetup onNext={handleNext} />;
      case 1:
        return <ImportStudents onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <ImportClassrooms onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <FinalSetup onNext={handleNext} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome to EduManage</h1>
            <p className="text-default-500 mb-6">
              Let's get your institution set up in just a few steps
            </p>
            <Progress
              value={progress}
              className="mb-4"
              color="primary"
              showValueLabel
            />
            <div className="grid grid-cols-4 gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center text-center ${
                    index === currentStep
                      ? 'text-primary'
                      : index < currentStep
                      ? 'text-success'
                      : 'text-default-400'
                  }`}
                >
                  <div className="mb-2">
                    {index < currentStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <p className="font-medium text-sm">{step.title}</p>
                  <p className="text-xs text-default-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardBody className="p-8">
              {renderStep()}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}