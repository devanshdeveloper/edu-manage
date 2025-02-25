import React from 'react';
import {
  Card,
  CardBody,
  Button,
  Chip,
} from '@nextui-org/react';
import {
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  BarChart3,
  Shield,
  MessageSquare,
  Bell,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export function FeaturesPage() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Student Management",
      description: "Efficiently manage student records, attendance tracking, and academic progress monitoring.",
      benefits: ["Digital student profiles", "Attendance tracking", "Performance analytics"],
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Course Management",
      description: "Create and manage courses, assignments, and learning materials with ease.",
      benefits: ["Curriculum planning", "Assignment management", "Resource library"],
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Scheduling",
      description: "Streamline class scheduling, exam timetables, and faculty assignments.",
      benefits: ["Automated scheduling", "Conflict detection", "Calendar integration"],
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Fee Management",
      description: "Handle fee collection, generate invoices, and track payments efficiently.",
      benefits: ["Online payments", "Invoice generation", "Payment tracking"],
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Assessment Tools",
      description: "Create and manage tests, quizzes, and assignments with automated grading.",
      benefits: ["Online testing", "Automated grading", "Progress tracking"],
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Reporting",
      description: "Gain insights with comprehensive analytics and customizable reports.",
      benefits: ["Performance metrics", "Custom reports", "Data visualization"],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security",
      description: "Ensure data protection with advanced security features and role-based access.",
      benefits: ["Role-based access", "Data encryption", "Audit trails"],
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Communication",
      description: "Foster collaboration with integrated messaging and notification systems.",
      benefits: ["In-app messaging", "Email notifications", "Announcements"],
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Notifications",
      description: "Keep everyone informed with automated alerts and reminders.",
      benefits: ["Custom alerts", "SMS notifications", "Email updates"],
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Customization",
      description: "Adapt the system to your institution's specific needs and workflows.",
      benefits: ["Custom fields", "Workflow automation", "Branding options"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-background py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Powerful Features for Modern Education
            </h1>
            <p className="text-large text-default-600 max-w-2xl mx-auto">
              Everything you need to manage your educational institution efficiently and effectively.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <CardBody className="gap-6">
                  <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center">
                    {React.cloneElement(feature.icon, { className: "w-6 h-6 text-primary" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-default-500 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.benefits.map((benefit, i) => (
                        <Chip key={i} size="sm" variant="flat">
                          {benefit}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Institution?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              Join hundreds of institutions already using our platform to streamline their operations and enhance learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                to="/signup"
                variant="solid"
                color="default"
                size="lg"
                endContent={<ArrowRight className="w-4 h-4" />}
              >
                Start Free Trial
              </Button>
              <Button
                as={Link}
                to="/contact"
                variant="bordered"
                size="lg"
                className="text-white border-white"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}