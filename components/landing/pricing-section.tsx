"use client";

import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Day Pass",
    description: "Perfect for professionals needing a premium space on demand.",
    price: "$45",
    period: "/ day",
    features: [
      "Access to hot desk areas",
      "High-speed Wi-Fi",
      "Artisanal coffee & tea",
    ],
    excluded: ["Meeting room credits", "24/7 building access"],
    cta: "Select Day Pass",
    popular: false,
  },
  {
    name: "Monthly Coworking",
    description: "Dedicated desk or flexible seating for the consistent professional.",
    price: "$350",
    period: "/ month",
    features: [
      "24/7 building access",
      "Priority seating in shared spaces",
      "4 hours meeting room credits",
      "Mail & package handling",
    ],
    excluded: [],
    cta: "Start Monthly Plan",
    popular: true,
  },
  {
    name: "Private Suite",
    description: "Fully enclosed, branded offices for teams of 4 to 50+.",
    price: "Custom",
    period: "",
    features: [
      "Secure, lockable private space",
      "Custom branding & layout",
      "Dedicated IT network",
      "Unlimited meeting room access",
    ],
    excluded: [],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm text-secondary font-medium tracking-[0.05em] mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            Membership Plans
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Transparent Pricing
          </h2>
          <p className="text-lg lg:text-xl text-secondary max-w-2xl mx-auto">
            Tailored to your workflow. Find the perfect fit for individuals or enterprise teams.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative bg-surface-container-lowest border rounded-lg p-8 transition-all duration-300 hover-lift ${
                plan.popular
                  ? "border-2 border-primary-container shadow-[0_10px_40px_-10px_rgba(237,145,33,0.15)] scale-100 lg:scale-105 z-10"
                  : "border-outline-variant"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-container text-white px-4 py-1 rounded-full text-xs font-semibold tracking-[0.05em] uppercase">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-secondary">{plan.description}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-outline-variant">
                {plan.price === "Custom" ? (
                  <span className="text-3xl font-bold text-primary-container">Custom Quote</span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-bold text-primary-container">
                      {plan.price}
                    </span>
                    <span className="text-sm text-secondary">{plan.period}</span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-secondary">
                    <span className="text-primary shrink-0">
                      <Check className="w-4 h-4" />
                    </span>
                    {feature}
                  </li>
                ))}
                {plan.excluded?.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-outline opacity-50">
                    <span className="shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className={`block w-full py-3 text-center rounded-md font-medium text-sm tracking-[0.05em] btn-premium ${
                  plan.popular
                    ? "bg-primary-container text-white hover:bg-primary"
                    : "border border-outline text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
