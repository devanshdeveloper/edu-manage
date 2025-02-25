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
  Tabs,
  Tab,
  Card,
  CardBody,
  Chip,
  Checkbox,
  RadioGroup,
  Radio,
} from '@nextui-org/react';
import {
  FileText,
  Clock,
  Calendar,
  BookOpen,
  Users,
  Settings,
  List,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react';

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  test?: any;
}

const subjects = [
  { label: 'Mathematics', value: 'mathematics' },
  { label: 'Physics', value: 'physics' },
  { label: 'Chemistry', value: 'chemistry' },
  { label: 'Biology', value: 'biology' },
  { label: 'English', value: 'english' },
  { label: 'History', value: 'history' },
];

const questionTypes = [
  { label: 'Multiple Choice', value: 'multiple_choice' },
  { label: 'True/False', value: 'true_false' },
  { label: 'Short Answer', value: 'short_answer' },
  { label: 'Essay', value: 'essay' },
];

export function TestModal({
  isOpen,
  onClose,
  test,
}: TestModalProps) {
  const isEditing = !!test;
  const [activeTab, setActiveTab] = useState("details");
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState("multiple_choice");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    onClose();
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: selectedQuestionType,
      question: '',
      options: selectedQuestionType === 'multiple_choice' ? ['', '', '', ''] : [],
      correctAnswer: '',
      points: 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (questionId: number) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const renderQuestionForm = (question: any, index: number) => {
    return (
      <Card key={question.id} className="mb-4">
        <CardBody className="space-y-4">
          <div className="flex items-center gap-4">
            <GripVertical className="w-5 h-5 text-default-400 cursor-move" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Question {index + 1}</span>
                  <Chip size="sm" variant="flat">
                    {questionTypes.find(t => t.value === question.type)?.label}
                  </Chip>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={() => handleRemoveQuestion(question.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <Textarea
            label="Question"
            placeholder="Enter your question"
            value={question.question}
          />

          {question.type === 'multiple_choice' && (
            <div className="space-y-2">
              <p className="text-small font-medium">Options</p>
              {question.options.map((option: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <Radio value={i.toString()} />
                  <Input
                    className="flex-1"
                    size="sm"
                    placeholder={`Option ${i + 1}`}
                    value={option}
                  />
                </div>
              ))}
            </div>
          )}

          {question.type === 'true_false' && (
            <RadioGroup label="Correct Answer">
              <Radio value="true">True</Radio>
              <Radio value="false">False</Radio>
            </RadioGroup>
          )}

          <Input
            type="number"
            label="Points"
            placeholder="Enter points"
            value={question.points.toString()}
            min={1}
          />
        </CardBody>
      </Card>
    );
  };

  const renderDetailsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        autoFocus
        endContent={<FileText className="w-4 h-4 text-default-400" />}
        label="Test Title"
        placeholder="Enter test title"
        variant="bordered"
        defaultValue={test?.title}
      />

      <Select
        endContent={<BookOpen className="w-4 h-4 text-default-400" />}
        label="Subject"
        placeholder="Select subject"
        variant="bordered"
        defaultSelectedKeys={test ? [test.subject] : undefined}
      >
        {subjects.map((subject) => (
          <SelectItem key={subject.value} value={subject.value}>
            {subject.label}
          </SelectItem>
        ))}
      </Select>

      <Input
        endContent={<Calendar className="w-4 h-4 text-default-400" />}
        label="Start Date"
        placeholder="Select start date"
        type="datetime-local"
        variant="bordered"
        defaultValue={test?.startDate}
      />

      <Input
        endContent={<Clock className="w-4 h-4 text-default-400" />}
        label="Duration (minutes)"
        placeholder="Enter test duration"
        type="number"
        variant="bordered"
        defaultValue={test?.duration}
      />

      <div className="md:col-span-2">
        <Textarea
          label="Instructions"
          placeholder="Enter test instructions"
          variant="bordered"
          defaultValue={test?.instructions}
        />
      </div>

      <div className="md:col-span-2">
        <Select
          endContent={<Users className="w-4 h-4 text-default-400" />}
          label="Assign to Classrooms"
          placeholder="Select classrooms"
          variant="bordered"
          selectionMode="multiple"
          defaultSelectedKeys={test?.classrooms}
        >
          <SelectItem key="10a" value="10a">Class 10-A</SelectItem>
          <SelectItem key="10b" value="10b">Class 10-B</SelectItem>
          <SelectItem key="10c" value="10c">Class 10-C</SelectItem>
        </Select>
      </div>
    </div>
  );

  const renderQuestionsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select
          className="w-48"
          label="Question Type"
          placeholder="Select type"
          value={selectedQuestionType}
          onChange={(e) => setSelectedQuestionType(e.target.value)}
        >
          {questionTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </Select>

        <Button
          color="primary"
          endContent={<Plus className="w-4 h-4" />}
          onPress={handleAddQuestion}
        >
          Add Question
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => renderQuestionForm(question, index))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardBody className="space-y-4">
          <h3 className="text-lg font-semibold">Attempt Settings</h3>
          <div className="space-y-2">
            <Input
              type="number"
              label="Maximum Attempts"
              placeholder="Enter maximum attempts allowed"
              defaultValue="1"
              min={1}
            />
            <Checkbox defaultSelected>
              Shuffle questions for each attempt
            </Checkbox>
            <Checkbox defaultSelected>
              Show results immediately after submission
            </Checkbox>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <h3 className="text-lg font-semibold">Time Settings</h3>
          <div className="space-y-2">
            <Checkbox defaultSelected>
              Enforce time limit strictly
            </Checkbox>
            <Checkbox>
              Allow late submissions (with penalty)
            </Checkbox>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <h3 className="text-lg font-semibold">Scoring Settings</h3>
          <div className="space-y-2">
            <Input
              type="number"
              label="Passing Score (%)"
              placeholder="Enter passing score percentage"
              defaultValue="60"
              min={0}
              max={100}
            />
            <Checkbox>
              Enable negative marking
            </Checkbox>
          </div>
        </CardBody>
      </Card>
    </div>
  );

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
            {isEditing ? 'Edit Test' : 'Create New Test'}
          </ModalHeader>
          <ModalBody>
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
            >
              <Tab
                key="details"
                title={
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Details</span>
                  </div>
                }
              >
                {renderDetailsTab()}
              </Tab>
              <Tab
                key="questions"
                title={
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    <span>Questions</span>
                  </div>
                }
              >
                {renderQuestionsTab()}
              </Tab>
              <Tab
                key="settings"
                title={
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </div>
                }
              >
                {renderSettingsTab()}
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Create Test'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}