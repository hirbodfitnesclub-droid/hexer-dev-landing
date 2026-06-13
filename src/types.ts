export interface DemoResult {
  type: "task" | "note";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueDate: string | null;
  emoji: string;
  tags: string[];
  isFallback?: boolean;
}

export interface PainCard {
  iconName: "brain" | "lightbulb" | "phone" | "clock" | "repeat" | "globe";
  title: string;
  description: string;
}

export interface FeatureCardType {
  iconName: "mic" | "image" | "check" | "search" | "folder" | "trending";
  title: string;
  description: string;
  gradientClass: string;
  badge?: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  quota: string;
  duration: string;
  model: string;
  features: string[];
  ctaText: string;
  badge?: string;
  popular?: boolean;
}

export interface TestimonialItem {
  name: string;
  role: string;
  avatarChar: string;
  avatarGradient: string;
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
