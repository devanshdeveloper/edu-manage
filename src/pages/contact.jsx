import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Clock,
  Building2,
  Users,
  HelpCircle,
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
// import { Select, SelectItem } from "@heroui/select";
export function ContactPage() {
  const inquiryTypes = [
    { label: "Sales Inquiry", value: "sales" },
    { label: "Technical Support", value: "support" },
    { label: "Billing Question", value: "billing" },
    { label: "Partnership Opportunity", value: "partnership" },
    { label: "General Question", value: "general" },
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Market Street, Suite 456, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@example.com",
    },
    {
      city: "New York",
      address: "789 Broadway Avenue, 10th Floor, New York, NY 10003",
      phone: "+1 (555) 987-6543",
      email: "nyc@example.com",
    },
    {
      city: "London",
      address: "45 King's Road, Westminster, London SW1A 1AA",
      phone: "+44 20 7123 4567",
      email: "london@example.com",
    },
  ];

  const faqs = [
    {
      question: "How quickly can we get started?",
      answer:
        "You can start using our platform immediately after signing up. Our onboarding team will help you set up everything within 24-48 hours.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer 24/7 technical support via email, chat, and phone for our Professional and Enterprise plans. Basic plan includes email support during business hours.",
    },
    {
      question: "Can we migrate data from our current system?",
      answer:
        "Yes! We provide comprehensive data migration services and tools to help you transition smoothly from your existing system.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-background py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-large text-default-600 max-w-2xl mx-auto">
            Have questions about our platform? Our team is here to help you find
            the perfect solution for your institution.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="p-6">
            <CardBody className="gap-6">
              <h2 className="text-2xl font-bold">Send us a Message</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  variant="bordered"
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  variant="bordered"
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  startContent={<Mail className="w-4 h-4 text-default-400" />}
                />
                <Input
                  label="Phone"
                  placeholder="Enter your phone number"
                  type="tel"
                  variant="bordered"
                  startContent={<Phone className="w-4 h-4 text-default-400" />}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Institution Name"
                    placeholder="Enter your institution name"
                    variant="bordered"
                    startContent={
                      <Building2 className="w-4 h-4 text-default-400" />
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Number of Students"
                    placeholder="Approximate number of students"
                    type="number"
                    variant="bordered"
                    startContent={
                      <Users className="w-4 h-4 text-default-400" />
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  {/* <Select
                    label="Inquiry Type"
                    placeholder="Select inquiry type"
                    variant="bordered"
                    startContent={
                      <HelpCircle className="w-4 h-4 text-default-400" />
                    }
                  >
                    {inquiryTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select> */}
                </div>
                <div className="md:col-span-2">
                  <Textarea
                    label="Message"
                    placeholder="Enter your message"
                    variant="bordered"
                    minRows={4}
                  />
                </div>
              </div>
              <Button
                color="primary"
                size="lg"
                endContent={<Send className="w-4 h-4" />}
              >
                Send Message
              </Button>
            </CardBody>
          </Card>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Other Ways to Reach Us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Live Chat</p>
                      <p className="text-small text-default-500">
                        Chat with our team
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-small text-default-500">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Divider />

            <div>
              <h2 className="text-2xl font-bold mb-4">Global Offices</h2>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{office.city}</h3>
                      <div className="flex items-start gap-2 text-small text-default-500">
                        <MapPin className="w-4 h-4 mt-1" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-small text-default-500">
                        <Phone className="w-4 h-4" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-small text-default-500">
                        <Mail className="w-4 h-4" />
                        <span>{office.email}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Divider />

            <div>
              <h2 className="text-2xl font-bold mb-4">Support Hours</h2>
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">24/7 Support</p>
                      <p className="text-small text-default-500">
                        Our technical support team is available around the clock
                        for Professional and Enterprise plans.
                      </p>
                    </div>
                  </div>
                  <Divider />
                  <div>
                    <p className="font-semibold mb-2">
                      Business Hours (Basic Plan)
                    </p>
                    <div className="space-y-1 text-small text-default-500">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                      <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-default-50 dark:bg-default-50/5 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-default-600">
              Quick answers to questions we hear most often
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="text-default-600 text-small">{faq.answer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
