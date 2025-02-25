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
import {
  Building2,
  CreditCard,
  Calendar,
  DollarSign,
  Users,
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription?: any;
}

const plans = [
  { label: 'Basic', value: 'basic', price: '$99' },
  { label: 'Professional', value: 'professional', price: '$199' },
  { label: 'Enterprise', value: 'enterprise', price: '$499' },
];

export function SubscriptionModal({
  isOpen,
  onClose,
  subscription,
}: SubscriptionModalProps) {
  const isEditing = !!subscription;

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
            {isEditing ? 'Edit Subscription' : 'New Subscription'}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  autoFocus
                  endContent={<Building2 className="w-4 h-4 text-default-400" />}
                  label="Institution"
                  placeholder="Select institution"
                  variant="bordered"
                  defaultValue={subscription?.institution}
                  isReadOnly={isEditing}
                />
              </div>

              <Select
                endContent={<CreditCard className="w-4 h-4 text-default-400" />}
                label="Subscription Plan"
                placeholder="Select a plan"
                variant="bordered"
                defaultSelectedKeys={subscription ? [subscription.plan] : undefined}
              >
                {plans.map((plan) => (
                  <SelectItem key={plan.value} value={plan.value}>
                    {plan.label} - {plan.price}/month
                  </SelectItem>
                ))}
              </Select>

              <Input
                endContent={<Calendar className="w-4 h-4 text-default-400" />}
                label="Billing Cycle"
                placeholder="Select billing cycle"
                variant="bordered"
                defaultValue="Monthly"
              />

              <Input
                endContent={<DollarSign className="w-4 h-4 text-default-400" />}
                label="Price Override"
                placeholder="Enter custom price (optional)"
                type="number"
                variant="bordered"
                defaultValue={subscription?.priceOverride}
              />

              <Input
                endContent={<Users className="w-4 h-4 text-default-400" />}
                label="User Limit"
                placeholder="Enter maximum users allowed"
                type="number"
                variant="bordered"
                defaultValue={subscription?.userLimit}
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Notes"
                  placeholder="Enter any additional notes"
                  variant="bordered"
                  defaultValue={subscription?.notes}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Create Subscription'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}