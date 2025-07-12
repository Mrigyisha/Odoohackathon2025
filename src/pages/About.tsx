import { useState } from "react";
import { Heart, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as Accordion from "@radix-ui/react-accordion";
import Navbar from "@/components/Navbar";

const faqs = [
  {
    question: "What is ReVibe?",
    answer:
      "ReVibe is a sustainable clothing exchange platform that lets users swap preloved fashion items through a point-based system or direct trades."
  },
  {
    question: "How do I earn points?",
    answer:
      "You earn points by uploading and exchanging your items. Each approved item gets a point value based on condition and category."
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes! ReVibe is completely free. Our mission is to reduce fashion waste and build a responsible community-driven platform."
  },
  {
    question: "Can I track my past swaps?",
    answer:
      "Absolutely! You can view your swap history and points through your profile dashboard once you're signed in."
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
        <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* About Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">About ReVibe</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ReVibe is your go-to sustainable fashion platform where style meets responsibility.
            We enable eco-conscious individuals to exchange clothes, reduce waste, and give fashion a second life.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground text-center">
            Frequently Asked Questions
          </h2>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg shadow-soft"
              >
                <Accordion.Trigger className="w-full flex justify-between items-center text-left p-4 font-medium text-foreground hover:bg-muted transition-colors">
                  {faq.question}
                  <span className="text-primary text-xl">+</span>
                </Accordion.Trigger>
                <Accordion.Content className="pt-1 px-4 pb-4 text-sm text-muted-foreground">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>

        {/* Contact Section */}
        <Card className="p-6 shadow-soft space-y-6">
          <h2 className="text-2xl font-semibold text-foreground text-center">Get in Touch</h2>
          <form className="space-y-4 max-w-xl mx-auto">
            <Input placeholder="Your name" required />
            <Input type="email" placeholder="Your email" required />
            <Textarea placeholder="Your message..." rows={4} required />
            <Button type="submit" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </Card>

       
      </div>
    </div>
  );
};

export default About;
