'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Home,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';

type NavItem = 'dashboard' | 'bookings' | 'spaces' | 'clients' | 'settings';

interface Booking {
  id: string;
  client: string;
  space: string;
  date: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const mockBookings: Booking[] = [
  {
    id: '001',
    client: 'Acme Corporation',
    space: 'Seminar Hall A',
    date: '2026-06-22',
    time: '10:00 AM',
    duration: '4 hours',
    status: 'confirmed',
  },
  {
    id: '002',
    client: 'Tech Startup Inc',
    space: 'Meeting Room 3',
    date: '2026-06-22',
    time: '2:00 PM',
    duration: '1 hour',
    status: 'confirmed',
  },
  {
    id: '003',
    client: 'Global Partners LLC',
    space: 'Coworking Desk',
    date: '2026-06-23',
    time: '9:00 AM',
    duration: 'Full day',
    status: 'pending',
  },
  {
    id: '004',
    client: 'Finance Group',
    space: 'Meeting Room 1',
    date: '2026-06-21',
    time: '3:00 PM',
    duration: '2 hours',
    status: 'completed',
  },
];

const occupancyStats = [
  { space: 'Coworking Spaces', occupied: 28, total: 40, percentage: 70 },
  { space: 'Meeting Rooms', occupied: 5, total: 8, percentage: 62 },
  { space: 'Seminar Halls', occupied: 2, total: 3, percentage: 67 },
];

export function AdminDashboard() {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');

  const navItems = [
    { id: 'dashboard' as NavItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings' as NavItem, label: 'Bookings', icon: Calendar },
    { id: 'spaces' as NavItem, label: 'Spaces', icon: Home },
    { id: 'clients' as NavItem, label: 'Clients', icon: Users },
    { id: 'settings' as NavItem, label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-background border-r border-background/20">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Work Service</h1>
          <p className="text-sm text-background/60">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-background/70 hover:text-background hover:bg-foreground/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-background/20 w-64">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center text-background/70 hover:text-background border-background/20"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {activeNav === 'dashboard' && (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground mt-1">Overview of your workspace operations</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 border-border">
                <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                  Total Bookings
                </p>
                <p className="text-4xl font-bold text-foreground mb-2">247</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </Card>
              <Card className="p-6 border-border">
                <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                  Active Clients
                </p>
                <p className="text-4xl font-bold text-foreground mb-2">89</p>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </Card>
              <Card className="p-6 border-border">
                <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                  Occupancy Rate
                </p>
                <p className="text-4xl font-bold text-primary mb-2">66%</p>
                <p className="text-xs text-muted-foreground">Average utilization</p>
              </Card>
              <Card className="p-6 border-border">
                <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                  Revenue
                </p>
                <p className="text-4xl font-bold text-foreground mb-2">$42.5K</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </Card>
            </div>

            {/* Occupancy Stats */}
            <Card className="p-8 border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Space Occupancy</h3>
              <div className="space-y-6">
                {occupancyStats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{stat.space}</span>
                      <span className="text-sm font-bold text-primary">
                        {stat.occupied}/{stat.total}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.percentage}% occupied</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Bookings */}
            <Card className="p-8 border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-foreground">Recent Bookings</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Client
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Space
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Time
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Duration
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium text-foreground">{booking.client}</td>
                        <td className="py-4 px-4 text-foreground">{booking.space}</td>
                        <td className="py-4 px-4 text-foreground">{booking.date}</td>
                        <td className="py-4 px-4 text-foreground">{booking.time}</td>
                        <td className="py-4 px-4 text-foreground">{booking.duration}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-primary hover:text-primary/80 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Other sections would follow similar pattern */}
        {activeNav !== 'dashboard' && (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground text-lg">
              {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} section coming soon
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
