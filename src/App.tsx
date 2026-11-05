import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TelegramSimulator } from './components/TelegramSimulator';
import { FeaturesBento } from './components/FeaturesBento';
import { LiveSignalsFeed } from './components/LiveSignalsFeed';
import { RoiCalculator } from './components/RoiCalculator';
import { PricingSection } from './components/PricingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');

  const handleOpenCheckout = (planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId);
    }
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased">
      {/* Navigation Top Bar */}
      <Header onOpenCheckout={handleOpenCheckout} />

      {/* Main Landing Page Stream */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenCheckout={handleOpenCheckout} />

        {/* 2. Interactive Telegram Bot Simulator */}
        <TelegramSimulator onOpenCheckout={handleOpenCheckout} />

        {/* 3. Bento Grid: Core Capabilities & Technology */}
        <FeaturesBento />

        {/* 4. Live Historical Signals & Verified Win-Rate */}
        <LiveSignalsFeed />

        {/* 5. Interactive ROI / Profit Calculator */}
        <RoiCalculator onOpenCheckout={handleOpenCheckout} />

        {/* 6. Pricing Plans & Guarantee */}
        <PricingSection onOpenCheckout={handleOpenCheckout} />

        {/* 7. Community Reviews & Founder Quote */}
        <ReviewsSection />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenCheckout={handleOpenCheckout} />

      {/* Checkout & Instant Access Token Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        selectedPlanId={selectedPlanId}
      />
    </div>
  );
}
