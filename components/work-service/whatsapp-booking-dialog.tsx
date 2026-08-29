'use client';

import { useState } from 'react';
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextArea,
  TextField,
} from '@heroui/react';
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
    <Modal>
      <Modal.Backdrop isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <Modal.Container scroll="inside">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Completa los datos de tu reservación y te enviaremos el mensaje listo por
                WhatsApp para confirmarla.
              </p>
            </Modal.Header>
            <Modal.Body>
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-1 gap-2">
                  <Select
                    value={form.space || null}
                    onChange={(v) => set('space', String(v ?? ''))}
                    placeholder="Selecciona un espacio"
                    isInvalid={!!errors.space}
                    className="w-full"
                  >
                    <Label>Espacio *</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {SPACE_OPTIONS.map((option) => (
                          <ListBox.Item key={option} id={option} textValue={option}>
                            {option}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError>Selecciona un espacio.</FieldError>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    value={form.name}
                    onChange={(v) => set('name', v)}
                    isInvalid={!!errors.name}
                    className="w-full"
                  >
                    <Label>Nombre completo *</Label>
                    <Input placeholder="Juan Pérez" />
                    <FieldError>Ingresa tu nombre.</FieldError>
                  </TextField>
                  <TextField
                    type="tel"
                    value={form.phone}
                    onChange={(v) => set('phone', v)}
                    isInvalid={!!errors.phone}
                    className="w-full"
                  >
                    <Label>Teléfono *</Label>
                    <Input placeholder="+58 412 123 4567" />
                    <FieldError>Ingresa tu teléfono.</FieldError>
                  </TextField>
                </div>

                <TextField
                  type="email"
                  value={form.email}
                  onChange={(v) => set('email', v)}
                  className="w-full"
                >
                  <Label>Email</Label>
                  <Input placeholder="tucorreo@ejemplo.com" />
                </TextField>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <TextField
                    type="date"
                    value={form.date}
                    onChange={(v) => set('date', v)}
                    isInvalid={!!errors.date}
                    className="w-full"
                  >
                    <Label>Fecha *</Label>
                    <Input />
                    <FieldError>Ingresa la fecha.</FieldError>
                  </TextField>
                  <Select
                    value={form.time || null}
                    onChange={(v) => set('time', String(v ?? ''))}
                    placeholder="Hora"
                    isInvalid={!!errors.time}
                    className="w-full"
                  >
                    <Label>Hora *</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {TIME_OPTIONS.map((time) => (
                          <ListBox.Item key={time} id={time} textValue={time}>
                            {time}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError>Selecciona la hora.</FieldError>
                  </Select>
                  <Select
                    value={form.duration}
                    onChange={(v) => set('duration', String(v ?? ''))}
                    className="w-full"
                  >
                    <Label>Duración</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {DURATION_OPTIONS.map((duration) => (
                          <ListBox.Item key={duration} id={duration} textValue={duration}>
                            {duration}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <TextField
                  type="number"
                  value={form.people}
                  onChange={(v) => set('people', v)}
                  className="w-full"
                >
                  <Label>Número de personas</Label>
                  <Input min={1} placeholder="Ej. 8" />
                </TextField>

                <TextField
                  value={form.message}
                  onChange={(v) => set('message', v)}
                  className="w-full"
                >
                  <Label>Comentarios adicionales</Label>
                  <TextArea placeholder="Cuéntanos los detalles que necesites" />
                </TextField>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                onPress={handleSubmit}
                className="bg-[#25D366] hover:bg-[#1eb958] text-white"
              >
                <MessageCircle className="size-4" />
                Enviar por WhatsApp
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

interface WhatsAppBookingButtonProps {
  label?: string;
  defaultSpace?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'danger-soft';
  className?: string;
}

export function WhatsAppBookingButton({
  label = 'Reservar por WhatsApp',
  defaultSpace = '',
  variant = 'primary',
  className = '',
}: WhatsAppBookingButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)} variant={variant} className={className}>
        <MessageCircle className="size-4" />
        {label}
      </Button>
      <WhatsAppBookingDialog open={open} onClose={() => setOpen(false)} defaultSpace={defaultSpace} />
    </>
  );
}
