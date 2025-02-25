import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Divider,
} from '@nextui-org/react';
import {
  User,
  Building2,
  CreditCard,
  Mail,
  Bell,
  Shield,
  Users,
  Database,
  Wrench,
  Globe,
  FileText,
  Settings as SettingsIcon,
} from 'lucide-react';
import { AccountSettings } from './components/AccountSettings';
import { InstitutionSettings } from './components/InstitutionSettings';
import { PaymentSettings } from './components/PaymentSettings';
import { CommunicationSettings } from './components/CommunicationSettings';
import { SecuritySettings } from './components/SecuritySettings';
import { NotificationSettings } from './components/NotificationSettings';
import { RolesSettings } from './components/RolesSettings';
import { LocalizationSettings } from './components/LocalizationSettings';
import { AuditSettings } from './components/AuditSettings';
import { useAuth } from '../../context/AuthContext';

export function SettingsPage() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = React.useState("account");

  if (!user) return null;

  const renderSettingsView = () => {
    switch (selectedTab) {
      case "account":
        return <AccountSettings />;
      case "institution":
        return <InstitutionSettings />;
      case "payment":
        return <PaymentSettings />;
      case "communication":
        return <CommunicationSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <SecuritySettings />;
      case "roles":
        return <RolesSettings />;
      case "localization":
        return <LocalizationSettings />;
      case "audit":
        return <AuditSettings />;
      // Temporarily return null for unimplemented components
      case "data":
      case "integrations":
      case "system":
        return (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-large font-medium">Coming Soon</p>
            <p className="text-small text-default-500">
              This settings section is currently under development.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-default-500">
          Manage your account and system preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <Tabs
            aria-label="Settings categories"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="underlined"
            classNames={{
              tabList: "gap-6",
              cursor: "w-full",
            }}
          >
            <Tab
              key="account"
              title={
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Account</span>
                </div>
              }
            />
            {user.role === "SUPER_ADMIN" && (
              <Tab
                key="institution"
                title={
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Institution</span>
                  </div>
                }
              />
            )}
            {user.role === "SUPER_ADMIN" && (
              <Tab
                key="payment"
                title={
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Payment</span>
                  </div>
                }
              />
            )}
            {user.role === "ADMIN" && (
              <Tab
                key="communication"
                title={
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Communication</span>
                  </div>
                }
              />
            )}
            <Tab
              key="notifications"
              title={
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </div>
              }
            />
            <Tab
              key="security"
              title={
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </div>
              }
            />
            {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
              <Tab
                key="roles"
                title={
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Roles</span>
                  </div>
                }
              />
            )}
            {user.role === "SUPER_ADMIN" && (
              <Tab
                key="data"
                title={
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span>Data</span>
                  </div>
                }
              />
            )}
            {user.role === "SUPER_ADMIN" && (
              <Tab
                key="integrations"
                title={
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    <span>Integrations</span>
                  </div>
                }
              />
            )}
            <Tab
              key="localization"
              title={
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Localization</span>
                </div>
              }
            />
            {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
              <Tab
                key="audit"
                title={
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Audit</span>
                  </div>
                }
              />
            )}
            {user.role === "SUPER_ADMIN" && (
              <Tab
                key="system"
                title={
                  <div className="flex items-center gap-2">
                    <SettingsIcon className="w-4 h-4" />
                    <span>System</span>
                  </div>
                }
              />
            )}
          </Tabs>
        </CardHeader>
        <Divider />
        <CardBody>
          {renderSettingsView()}
        </CardBody>
      </Card>
    </div>
  );
}