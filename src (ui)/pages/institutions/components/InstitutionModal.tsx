import React from 'react';
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
} from '@nextui-org/react';
import { Building2, Mail, Phone, MapPin, Users, CreditCard } from 'lucide-react';

interface InstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  institution?: any;
}

const plans = [
  { label: 'Basic', value: 'basic', features: 10 },
  { label: 'Professional', value: 'professional', features: 20 },
  { label: 'Enterprise', value: 'enterprise', features: 'Unlimited' },
];

export function InstitutionModal({ isOpen, onClose, institution }: InstitutionModalProps) {
  const isEditing = !!institution;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    onClose();
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
            {isEditing ? 'Edit Institution' : 'Add New Institution'}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  autoFocus
                  endContent={<Building2 className="w-4 h-4 text-default-400" />}
                  label="Institution Name"
                  placeholder="Enter institution name"
                  variant="bordered"
                  defaultValue={institution?.name}
                />
              </div>

              <Input
                endContent={<Mail className="w-4 h-4 text-default-400" />}
                label="Email"
                placeholder="Enter email address"
                type="email"
                variant="bordered"
                defaultValue={institution?.email}
              />

              <Input
                endContent={<Phone className="w-4 h-4 text-default-400" />}
                label="Phone"
                placeholder="Enter phone number"
                type="tel"
                variant="bordered"
                defaultValue={institution?.phone}
              />

              <div className="md:col-span-2">
                <Textarea
                  endContent={<MapPin className="w-4 h-4 text-default-400" />}
                  label="Address"
                  placeholder="Enter full address"
                  variant="bordered"
                  defaultValue={institution?.address}
                />
              </div>

              <Select
                endContent={<CreditCard className="w-4 h-4 text-default-400" />}
                label="Subscription Plan"
                placeholder="Select a plan"
                variant="bordered"
                defaultSelectedKeys={institution ? [institution.plan] : undefined}
              >
                {plans.map((plan) => (
                  <SelectItem key={plan.value} value={plan.value}>
                    {plan.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                endContent={<Users className="w-4 h-4 text-default-400" />}
                label="Maximum Users"
                placeholder="Enter maximum allowed users"
                type="number"
                variant="bordered"
                defaultValue={institution?.maxUsers}
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Additional Notes"
                  placeholder="Enter any additional notes or requirements"
                  variant="bordered"
                  defaultValue={institution?.notes}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Add Institution'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}