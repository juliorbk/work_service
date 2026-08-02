'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageCircle } from 'lucide-react';
import {
  WHATSAPP_NUMBER,
  SPACE_OPTIONS,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatDate,
} from '@/components/work-service/whatsapp';

const TIME_OPTIONS = ['09:00', '11:00', '14:00', '16:00'];
const DURATION_OPTIONS = ['1 hora', '2 horas', '4 horas', 'Día completo'];

interface WhatsAppBookingDialogProps {
  open: boolean;
  onClose: () => void;
  defaultSpace?: string;
  title?: string;
}

export function WhatsAppBookingDialog({
  open,
  onClose,
  defaultSpace = '',
  title = 'Reservar por WhatsApp',
}: WhatsAppBookingDialogProps) {
  const [form, setForm] = useState({
    space: defaultSpace,
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    duration: '1 hora',
    people: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const handleSubmit = () => {
    const required = ['space', 'name', 'phone', 'date', 'time'] as const;
    const nextErrors: Record<string, boolean> = {};
    for (const field of required) {
      if (!form[field].trim()) nextErrors[field] = true;
    }
    setErrors(nextErrors);

    const invalid = Object.values(nextErrors).some(Boolean);
    if (invalid) return;

    const message = buildWhatsAppMessage({
      ...form,
      date: formatDate(form.date),
    });
    window.open(buildWhatsAppUrl(WHATSAPP_NUMBER, message), '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[88vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Completa los datos de tu reservación y te enviaremos el mensaje listo por
            WhatsApp para confirmarla.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="ws-space">Espacio *</Label>
            <Select value={form.space} onValueChange={(v) => set('space', v)}>
              <SelectTrigger
                id="ws-space"
                className={errors.space ? 'border-destructive' : 'w-full'}
                data-error={errors.space || undefined}
              >
                <SelectValue placeholder="Selecciona un espacio" />
              </SelectTrigger>
              <SelectContent>
                {SPACE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.space && (
              <p className="text-xs text-destructive">Selecciona un espacio.</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ws-name">Nombre completo *</Label>
              <Input
                id="ws-name"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Juan Pérez"
                aria-invalid={errors.name || undefined}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ws-phone">Teléfono *</Label>
              <Input
                id="ws-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="+58 412 123 4567"
                aria-invalid={errors.phone || undefined}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ws-email">Email</Label>
            <Input
              id="ws-email"
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ws-date">Fecha *</Label>
              <Input
                id="ws-date"
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                aria-invalid={errors.date || undefined}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ws-time">Hora *</Label>
              <Select value={form.time} onValueChange={(v) => set('time', v)}>
                <SelectTrigger
                  id="ws-time"
                  className="w-full"
                  data-error={errors.time || undefined}
                >
                  <SelectValue placeholder="Hora" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_OPTIONS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ws-duration">Duración</Label>
              <Select value={form.duration} onValueChange={(v) => set('duration', v)}>
                <SelectTrigger id="ws-duration" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DURATION_OPTIONS.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="ws-people">Número de personas</Label>
            <Input
              id="ws-people"
              type="number"
              min={1}
              value={form.people}
              onChange={(e) => set('people', e.target.value)}
              placeholder="Ej. 8"
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="ws-message">Comentarios adicionales</Label>
            <Textarea
              id="ws-message"
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              placeholder="Cuéntanos los detalles que necesites"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#25D366] hover:bg-[#1eb958] text-white"
          >
            <MessageCircle className="size-4" />
            Enviar por WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface WhatsAppBookingButtonProps {
  label?: string;
  defaultSpace?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  className?: string;
}

export function WhatsAppBookingButton({
  label = 'Reservar por WhatsApp',
  defaultSpace = '',
  variant = 'default',
  className = '',
}: WhatsAppBookingButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={variant} className={className}>
        <MessageCircle className="size-4" />
        {label}
      </Button>
      <WhatsAppBookingDialog open={open} onClose={() => setOpen(false)} defaultSpace={defaultSpace} />
    </>
  );
}