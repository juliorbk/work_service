'use client';

import Link from 'next/link';

export function WorkServiceFooter() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Work Service</h3>
            <p className="text-sm text-background/70">
              Premium corporate spaces designed for excellence and productivity.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Coworking Spaces
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Meeting Rooms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Seminar Halls
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-sm text-background/60">
            &copy; 2026 Work Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
