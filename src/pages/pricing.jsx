import React from 'react';
import { Check, ArrowRight, Shield, Zap, Award } from 'lucide-react';
import { Link } from "react-router-dom";
import { Card, CardBody , CardHeader} from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {Divider} from "@heroui/divider";
export function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      period: "per month",
      description: "Perfect for small institutions just getting started",
      icon: <Shield className="w-6 h-6" />,
      features: [
        "Up to 500 students",
        "Basic student management",
        "Attendance tracking",
        "Basic reporting",
        "Email support",
        "5GB storage",
      ],
      popular: false,
      color: "default"
    },
    {
      name: "Professional",
      price: "$199",
      period: "per month",
      description: "Ideal for growing institutions with advanced needs",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Up to 2000 students",
        "Advanced student management",
        "Online testing system",
        "Advanced analytics",
        "Priority support",
        "25GB storage",
        "Custom branding",
        "API access"
      ],
      popular: true,
      color: "primary"
    },
    {
      name: "Enterprise",
      price: "$499",
      period: "per month",
      description: "For large institutions requiring maximum flexibility",
      icon: <Award className="w-6 h-6" />,
      features: [
        "Unlimited students",
        "Full platform access",
        "Custom integrations",
        "24/7 premium support",
        "Unlimited storage",
        "White labeling",
        "Dedicated account manager",
        "Custom development",
        "SLA guarantee"
      ],
      popular: false,
      color: "default"
    }
  ];

  const faqs = [
    {
      question: "Can I try the platform before committing?",
      answer: "Yes! We offer a 14-day free trial for all plans. No credit card required."
    },
    {
      question: "What happens if I exceed my student limit?",
      answer: "We'll notify you when you're approaching your limit. You can upgrade your plan at any time."
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes, you can save 20% by choosing annual billing on any plan."
    },
    {
      question: "What kind of support do you provide?",
      answer: "All plans include email support. Professional and Enterprise plans include priority support with faster response times."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no hidden fees. You only pay the advertised price for your chosen plan."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="py-20 bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-background">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-large text-default-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your institution. All plans include core features with flexible scaling options.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="bordered">Monthly Billing</Button>
            <Button variant="bordered">
              Annual Billing
              <Chip size="sm" color="primary" variant="flat">Save 20%</Chip>
            </Button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? 'border-primary' : ''}`}
              shadow="sm"
            >
              {plan.popular && (
                <Chip
                  color="primary"
                  className="absolute top-3 right-3"
                >
                  Most Popular
                </Chip>
              )}
              <CardHeader className="flex gap-3 p-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-small text-default-500">{plan.description}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="gap-8">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-small text-default-500 ml-1">{plan.period}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  as={Link}
                  to="/signup"
                  color={plan.popular ? "primary" : "default"}
                  variant={plan.popular ? "solid" : "bordered"}
                  size="lg"
                  className="w-full"
                  endContent={<ArrowRight className="w-4 h-4" />}
                >
                  Get Started
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="py-20 bg-default-50 dark:bg-default-50/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
            <p className="text-default-600">
              Find the perfect plan for your institution's needs
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left">Features</th>
                  <th className="py-4 px-6 text-center">Basic</th>
                  <th className="py-4 px-6 text-center">Professional</th>
                  <th className="py-4 px-6 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-6">Student Limit</td>
                  <td className="py-4 px-6 text-center">500</td>
                  <td className="py-4 px-6 text-center">2000</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6">Storage</td>
                  <td className="py-4 px-6 text-center">5GB</td>
                  <td className="py-4 px-6 text-center">25GB</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6">Support</td>
                  <td className="py-4 px-6 text-center">Email</td>
                  <td className="py-4 px-6 text-center">Priority</td>
                  <td className="py-4 px-6 text-center">24/7 Premium</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6">API Access</td>
                  <td className="py-4 px-6 text-center">-</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6">Custom Branding</td>
                  <td className="py-4 px-6 text-center">-</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6">Dedicated Manager</td>
                  <td className="py-4 px-6 text-center">-</td>
                  <td className="py-4 px-6 text-center">-</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-default-600">
              Have questions? We have answers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-default-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/80">
            Our team is here to help you find the perfect plan for your institution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/contact"
              variant="solid"
              color="default"
              size="lg"
            >
              Contact Sales
            </Button>
            <Button
              as={Link}
              to="/signup"
              variant="bordered"
              size="lg"
              className="text-white border-white"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}