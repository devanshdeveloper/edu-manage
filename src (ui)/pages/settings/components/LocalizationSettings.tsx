import React from 'react';
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Button,
  Switch,
  Input,
  Chip,
  Divider,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import {
  Globe,
  Calendar,
  DollarSign,
  Ruler,
  Languages,
  ArrowLeftRight,
  AlertTriangle,
  Save,
  RefreshCw,
  Clock
} from 'lucide-react';

const languages = [
  { label: 'English', value: 'en', flag: '🇺🇸' },
  { label: 'Spanish', value: 'es', flag: '🇪🇸' },
  { label: 'French', value: 'fr', flag: '🇫🇷' },
  { label: 'German', value: 'de', flag: '🇩🇪' },
  { label: 'Arabic', value: 'ar', flag: '🇸🇦' },
  { label: 'Chinese', value: 'zh', flag: '🇨🇳' },
  { label: 'Japanese', value: 'ja', flag: '🇯🇵' },
  { label: 'Korean', value: 'ko', flag: '🇰🇷' },
];

const dateFormats = [
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
];

const timeFormats = [
  { label: '12-hour (AM/PM)', value: '12' },
  { label: '24-hour', value: '24' },
];

const currencies = [
  { label: 'US Dollar ($)', value: 'USD', symbol: '$' },
  { label: 'Euro (€)', value: 'EUR', symbol: '€' },
  { label: 'British Pound (£)', value: 'GBP', symbol: '£' },
  { label: 'Japanese Yen (¥)', value: 'JPY', symbol: '¥' },
];

const measurementSystems = [
  { label: 'Metric', value: 'metric' },
  { label: 'Imperial', value: 'imperial' },
];

export function LocalizationSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRTL, setIsRTL] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState("en");
  const [fallbackLanguage, setFallbackLanguage] = React.useState("en");

  const handleSaveChanges = () => {
    // TODO: Implement saving changes
    onClose();
  };

  const renderPreview = () => (
    <Card className="bg-content2">
      <CardBody>
        <div className="space-y-4">
          <div>
            <p className="text-small font-medium">Date Format Preview</p>
            <p className="text-default-500">March 15, 2024</p>
          </div>
          <div>
            <p className="text-small font-medium">Time Format Preview</p>
            <p className="text-default-500">2:30 PM (14:30)</p>
          </div>
          <div>
            <p className="text-small font-medium">Number Format Preview</p>
            <p className="text-default-500">1,234,567.89</p>
          </div>
          <div>
            <p className="text-small font-medium">Currency Format Preview</p>
            <p className="text-default-500">$1,234.56</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Language Settings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Primary Language"
              placeholder="Select primary language"
              selectedKeys={[selectedLanguage]}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  startContent={<span className="text-xl">{lang.flag}</span>}
                >
                  {lang.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Fallback Language"
              placeholder="Select fallback language"
              selectedKeys={[fallbackLanguage]}
              onChange={(e) => setFallbackLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  startContent={<span className="text-xl">{lang.flag}</span>}
                >
                  {lang.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Right-to-Left (RTL) Support</p>
              <p className="text-small text-default-500">
                Enable RTL layout for languages like Arabic and Hebrew
              </p>
            </div>
            <Switch
              isSelected={isRTL}
              onValueChange={setIsRTL}
              startContent={<ArrowLeftRight className="w-4 h-4" />}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Date & Time</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Date Format"
              placeholder="Select date format"
              startContent={<Calendar className="w-4 h-4 text-default-400" />}
            >
              {dateFormats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Time Format"
              placeholder="Select time format"
              startContent={<Clock className="w-4 h-4 text-default-400" />}
            >
              {timeFormats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Time Zone"
              placeholder="Select time zone"
              startContent={<Globe className="w-4 h-4 text-default-400" />}
            >
              <SelectItem key="auto" value="auto">Auto-detect</SelectItem>
              <SelectItem key="utc" value="UTC">UTC (GMT+0)</SelectItem>
              <SelectItem key="est" value="EST">Eastern Time (GMT-5)</SelectItem>
              <SelectItem key="pst" value="PST">Pacific Time (GMT-8)</SelectItem>
            </Select>

            <Input
              label="First Day of Week"
              placeholder="Select first day"
              defaultValue="Sunday"
              startContent={<Calendar className="w-4 h-4 text-default-400" />}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Numbers & Currency</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Currency"
              placeholder="Select currency"
              startContent={<DollarSign className="w-4 h-4 text-default-400" />}
            >
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Measurement System"
              placeholder="Select system"
              startContent={<Ruler className="w-4 h-4 text-default-400" />}
            >
              {measurementSystems.map((system) => (
                <SelectItem key={system.value} value={system.value}>
                  {system.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              label="Decimal Separator"
              placeholder="Enter separator"
              defaultValue="."
            />

            <Input
              label="Thousands Separator"
              placeholder="Enter separator"
              defaultValue=","
            />
          </div>
        </CardBody>
      </Card>

      <Card className="bg-warning-50 dark:bg-warning-900/20">
        <CardBody>
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <p className="font-medium">Important Note</p>
              <p className="text-small">
                Changing language settings will require a page refresh. Make sure to
                save any unsaved work before proceeding.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          variant="flat"
          startContent={<RefreshCw className="w-4 h-4" />}
          onPress={onOpen}
        >
          Preview Changes
        </Button>
        <Button
          color="primary"
          startContent={<Save className="w-4 h-4" />}
          onPress={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Format Preview</ModalHeader>
          <ModalBody>
            {renderPreview()}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}