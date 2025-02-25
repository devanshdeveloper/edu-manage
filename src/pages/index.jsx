import DefaultLayout from "@/layouts/default";
import { Chip } from "@heroui/chip";
import {
  ArrowRight,
  Users,
  BookOpen,
  TestTube2,
  CreditCard,
  Shield,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

export default function IndexPage() {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Student Management",
      description:
        "Efficiently manage student records, attendance, and academic progress tracking.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "Course Management",
      description:
        "Create and manage courses, assignments, and learning materials.",
    },
    {
      icon: <TestTube2 className="w-6 h-6 text-primary" />,
      title: "Online Testing",
      description:
        "Conduct online tests, quizzes, and assessments with automated grading.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      title: "Fee Management",
      description:
        "Handle fee collection, generate invoices, and track payments.",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Advanced Analytics",
      description:
        "Comprehensive reports and insights for data-driven decisions.",
    },
  ];

  const testimonials = [
    {
      quote:
        "This platform has revolutionized how we manage our institution. The automation and insights are invaluable.",
      author: "Dr. Sarah Wilson",
      role: "Principal, Springfield Academy",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      quote:
        "The student management and online testing features have made our processes so much more efficient.",
      author: "Prof. Michael Chen",
      role: "Director, Tech Institute",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    },
    {
      quote:
        "Outstanding support team and regular updates keep making the platform better and better.",
      author: "Emily Rodriguez",
      role: "Admin Head, Global School",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
  ];

  return (
    <>
      {/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section> */}
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <Chip color="primary" variant="flat" className="mb-4">
                  #1 Institute Management Platform
                </Chip>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Transform Your Institution with Smart Management
                </h1>
                <p className="text-large text-default-600 mb-8">
                  Streamline operations, enhance learning experiences, and drive
                  growth with our comprehensive institute management system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    as={Link}
                    to="/signup"
                    color="primary"
                    size="lg"
                    endContent={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Started Free
                  </Button>
                  <Button as={Link} to="/contact" variant="flat" size="lg">
                    Contact Sales
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                  alt="Students using platform"
                  className="rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-default-50 dark:bg-default-50/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">500+</p>
                <p className="text-default-600">Institutions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">100k+</p>
                <p className="text-default-600">Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">95%</p>
                <p className="text-default-600">Satisfaction Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">24/7</p>
                <p className="text-default-600">Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need to Run Your Institution
              </h2>
              <p className="text-default-600 max-w-2xl mx-auto">
                Our platform provides comprehensive tools and features to
                streamline your administrative tasks and enhance the learning
                experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6">
                  <CardBody className="gap-4">
                    <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-default-600">{feature.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-default-50 dark:bg-default-50/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Trusted by Leading Institutions
              </h2>
              <p className="text-default-600 max-w-2xl mx-auto">
                See what our customers have to say about their experience with
                our platform.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardBody className="gap-4">
                    <p className="text-default-600 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-small text-default-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Institution?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              Join hundreds of institutions already using our platform to
              streamline their operations and enhance learning experiences.
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
                to="/pricing"
                variant="bordered"
                size="lg"
                className="text-white border-white"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
