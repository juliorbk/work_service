'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Drawer, ProgressBar } from '@heroui/react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Home,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
} from 'lucide-react';

type NavItem = 'dashboard' | 'bookings' | 'spaces' | 'clients' | 'settings';

const navItems = [
  { id: 'dashboard' as NavItem, label: 'Panel', icon: LayoutDashboard },
  { id: 'bookings' as NavItem, label: 'Reservaciones', icon: Calendar },
  { id: 'spaces' as NavItem, label: 'Espacios', icon: Home },
  { id: 'clients' as NavItem, label: 'Clientes', icon: Users },
  { id: 'settings' as NavItem, label: 'Ajustes', icon: Settings },
];

const statusLabels: Record<string, string> = {
  confirmed: 'Confirmado',
  pending: 'Pendiente',
  completed: 'Completado',
};

function getStatusColor(status: string) {
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
}

function NavItemButton({
  item,
  isActive,
  onSelect,
}: {
  item: (typeof navItems)[number];
  isActive: boolean;
  onSelect: (id: NavItem) => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`w-full flex items-center gap-3 px-4 py-3 min-h-11 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-background/70 hover:text-background hover:bg-foreground/50'
      }`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-left">{item.label}</span>
    </button>
  );
}

function NavList({
  activeNav,
  onSelect,
}: {
  activeNav: NavItem;
  onSelect: (id: NavItem) => void;
}) {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <NavItemButton
          key={item.id}
          item={item}
          isActive={activeNav === item.id}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
}

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
    space: 'Salón de Eventos A',
    date: '2026-06-22',
    time: '10:00 AM',
    duration: '4 horas',
    status: 'confirmed',
  },
  {
    id: '002',
    client: 'Tech Startup Inc',
    space: 'Sala de Reuniones 3',
    date: '2026-06-22',
    time: '2:00 PM',
    duration: '1 hora',
    status: 'confirmed',
  },
  {
    id: '003',
    client: 'Global Partners LLC',
    space: 'Escritorio de Coworking',
    date: '2026-06-23',
    time: '9:00 AM',
    duration: 'Día completo',
    status: 'pending',
  },
  {
    id: '004',
    client: 'Finance Group',
    space: 'Sala de Reuniones 1',
    date: '2026-06-21',
    time: '3:00 PM',
    duration: '2 horas',
    status: 'completed',
  },
  {
    id: '005',
    client: 'Instituto de Capacitación',
    space: 'Aula / Curso',
    date: '2026-06-24',
    time: '9:00 AM',
    duration: 'Día completo',
    status: 'pending',
  },
];

const occupancyStats = [
  { space: 'Espacios de Coworking', occupied: 28, total: 40, percentage: 70 },
  { space: 'Salas de Reuniones', occupied: 5, total: 8, percentage: 62 },
  { space: 'Salones de Eventos', occupied: 2, total: 3, percentage: 67 },
  { space: 'Aulas / Cursos', occupied: 2, total: 4, percentage: 50 },
];

export function AdminDashboard() {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');
  const [navOpen, setNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const handleNavSelect = (id: NavItem) => {
    setActiveNav(id);
    setNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-background lg:flex">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-foreground text-background px-4 h-16 border-b border-background/20">
        <div className="min-w-0">
          <h1 className="text-lg font-bold truncate">Work Services</h1>
          <p className="text-xs text-background/60 truncate">Panel de Administración</p>
        </div>
        <Drawer>
          <Drawer.Trigger
            aria-label="Abrir menú de administración"
            className="w-11 h-11 shrink-0 inline-flex items-center justify-center text-background rounded-md hover:bg-foreground/50 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </Drawer.Trigger>
          <Drawer.Backdrop isOpen={navOpen} onOpenChange={setNavOpen}>
            <Drawer.Content
              placement="left"
              className="w-[280px] sm:max-w-sm bg-foreground text-background border-r border-background/20"
            >
              <Drawer.Dialog>
                <Drawer.Header>
                  <Drawer.Heading className="text-background">Work Services</Drawer.Heading>
                  <p className="text-sm text-background/60">Panel de Administración</p>
                </Drawer.Header>
                <Drawer.Body>
                  <NavList activeNav={activeNav} onSelect={handleNavSelect} />
                </Drawer.Body>
                <Drawer.Footer>
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 justify-center text-background/70 hover:text-background border-background/20 min-h-11"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Cerrar Sesión</span>
                  </Button>
                </Drawer.Footer>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-foreground text-background border-r border-background/20 sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Work Services</h1>
          <p className="text-sm text-background/60">Panel de Administración</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <NavList activeNav={activeNav} onSelect={setActiveNav} />
        </div>

        <div className="p-4 border-t border-background/20">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center text-background/70 hover:text-background border-background/20 min-h-11"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Cerrar Sesión</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner label="Cargando estadísticas..." />
          </div>
        ) : (
          <>
        {activeNav === 'dashboard' && (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-foreground">Panel de Control</h2>
              <p className="text-muted-foreground mt-1">Resumen de las operaciones de tu espacio</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 rounded-lg border-border">
                <Card.Content>
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                    Reservaciones Totales
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">247</p>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                </Card.Content>
              </Card>
              <Card className="p-4 sm:p-6 rounded-lg border-border">
                <Card.Content>
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                    Clientes Activos
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">89</p>
                  <p className="text-xs text-muted-foreground">Usuarios registrados</p>
                </Card.Content>
              </Card>
              <Card className="p-4 sm:p-6 rounded-lg border-border">
                <Card.Content>
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                    Tasa de Ocupación
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">66%</p>
                  <p className="text-xs text-muted-foreground">Utilización promedio</p>
                </Card.Content>
              </Card>
              <Card className="p-4 sm:p-6 rounded-lg border-border">
                <Card.Content>
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                    Ingresos
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">$42.5K</p>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                </Card.Content>
              </Card>
            </div>

            {/* Occupancy Stats */}
            <Card className="p-4 sm:p-6 lg:p-8 rounded-lg border-border">
              <Card.Content>
                <h3 className="text-lg font-bold text-foreground mb-6">Ocupación de Espacios</h3>
                <div className="space-y-6">
                  {occupancyStats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground">{stat.space}</span>
                        <span className="text-sm font-bold text-primary">
                          {stat.occupied}/{stat.total}
                        </span>
                      </div>
                      <ProgressBar
                        aria-label={`Ocupación de ${stat.space}`}
                        value={stat.percentage}
                        className="w-full"
                        size="sm"
                      >
                        <ProgressBar.Track className="h-2 bg-muted rounded-full overflow-hidden">
                          <ProgressBar.Fill className="h-full bg-primary transition-all" />
                        </ProgressBar.Track>
                      </ProgressBar>
                      <p className="text-xs text-muted-foreground mt-1">{stat.percentage}% ocupado</p>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Recent Bookings */}
            <Card className="p-4 sm:p-6 lg:p-8 rounded-lg border-border">
              <Card.Content>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-foreground">Reservaciones Recientes</h3>
                  <Button variant="outline" size="sm" className="min-h-11">
                    Ver Todo
                  </Button>
                </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Cliente
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Espacio
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Fecha
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Hora
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Duración
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Estado
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-secondary uppercase">
                        Acción
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
                            {statusLabels[booking.status] || booking.status}
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
              </Card.Content>
            </Card>
          </div>
        )}

        {/* Other sections would follow similar pattern */}
        {activeNav !== 'dashboard' && (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground text-lg">
              {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}: sección próximamente
            </p>
          </div>
        )}
          </>
        )}
      </main>
    </div>
  );
}
