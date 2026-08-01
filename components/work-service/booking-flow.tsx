'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, ChevronRight } from 'lucide-react';

type Step = 1 | 2 | 3;

interface BookingState {
  spaceType: string | null;
  date: string;
  time: string;
  duration: string;
}

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [booking, setBooking] = useState<BookingState>({
    spaceType: null,
    date: '',
    time: '',
    duration: '1 hour',
  });

  const handleSpaceSelect = (space: string) => {
    setBooking({ ...booking, spaceType: space });
    setCurrentStep(2);
  };

  const handleDateTimeSubmit = () => {
    if (booking.date && booking.time) {
      setCurrentStep(3);
    }
  };

  const handleConfirmBooking = () => {
    // Handle booking submission
    console.log('Booking confirmed:', booking);
  };

  const spaceOptions = [
    {
      id: 'coworking',
      name: 'Coworking Desk',
      description: 'Professional shared workspace',
      price: '$45/day',
    },
    {
      id: 'meeting',
      name: 'Meeting Room',
      description: 'Private room with AV setup',
      price: '$150/hour',
    },
    {
      id: 'seminar',
      name: 'Seminar Hall',
      description: 'Large-capacity event space',
      price: '$500-2000/event',
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress indicator */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step < currentStep
                      ? 'bg-primary text-white'
                      : step === currentStep
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>Select Space</span>
            <span>Choose Date & Time</span>
            <span>Review & Confirm</span>
          </div>
        </div>

        {/* Step 1: Space Selection */}
        {currentStep === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-foreground mb-2">Select Your Space</h2>
            <p className="text-muted-foreground mb-8">
              Choose the workspace that best fits your needs.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {spaceOptions.map((space) => (
                <Card
                  key={space.id}
                  className="p-6 border-2 cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                  onClick={() => handleSpaceSelect(space.id)}
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">{space.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{space.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">{space.price}</span>
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {currentStep === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-foreground mb-2">Choose Date & Time</h2>
            <p className="text-muted-foreground mb-8">
              Selected: <span className="font-semibold text-foreground">{booking.spaceType}</span>
            </p>

            <div className="space-y-6">
              {/* Date picker */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">Date</label>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const dateStr = date.toISOString().split('T')[0];
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = date.getDate();

                    return (
                      <button
                        key={i}
                        onClick={() => setBooking({ ...booking, date: dateStr })}
                        className={`p-3 rounded-lg text-center text-xs transition-all ${
                          booking.date === dateStr
                            ? 'bg-primary text-white'
                            : 'bg-muted hover:bg-muted/80 text-foreground'
                        }`}
                      >
                        <div className="font-semibold">{dayName}</div>
                        <div>{dayNum}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time picker */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">Time</label>
                <div className="grid grid-cols-4 gap-3">
                  {['09:00', '11:00', '14:00', '16:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setBooking({ ...booking, time })}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        booking.time === time
                          ? 'bg-primary text-white'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">Duration</label>
                <div className="grid grid-cols-4 gap-3">
                  {['1 hour', '2 hours', '4 hours', 'Full day'].map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setBooking({ ...booking, duration: dur })}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        booking.duration === dur
                          ? 'bg-primary text-white'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleDateTimeSubmit}
                  disabled={!booking.date || !booking.time}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {currentStep === 3 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-foreground mb-8">Review Your Booking</h2>

            <Card className="p-8 mb-8 bg-muted/30 border-border">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Booking details */}
                <div>
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-6">
                    Booking Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Space Type</p>
                      <p className="font-semibold text-foreground capitalize">{booking.spaceType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Date</p>
                      <p className="font-semibold text-foreground">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Time</p>
                      <p className="font-semibold text-foreground">{booking.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Duration</p>
                      <p className="font-semibold text-foreground">{booking.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Price summary */}
                <div>
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-6">
                    Price Summary
                  </h3>
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-foreground">Base Rate</span>
                      <span className="font-semibold text-foreground">$150.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Service Fee</span>
                      <span className="font-semibold text-foreground">$15.00</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-border text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">$165.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirmBooking}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
