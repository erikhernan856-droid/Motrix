import { Link, useForm } from '@inertiajs/react';
import { index } from '@/routes/vehicles';

export interface ClientOption {
  client_id: number;
  first_name: string;
  first_last_name: string;
}

export interface VehicleData {
  vehicle_id: number;
  client_id: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  tipo: string;
  color: string | null;
  kilometraje: number;
  estado: string;
}

interface Props {
  clients: ClientOption[];
  vehicle?: VehicleData;
  method: 'post' | 'put';
  url: string;
  submitLabel: string;
}

const inputClass =
  'w-full rounded-lg border border-sidebar-border bg-background px-3 py-2.5 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40';

const labelClass = 'mb-1.5 block text-sm font-medium';
const errorClass = 'mt-1 text-xs text-red-500';

const TIPOS = [
  { value: 'moto', label: 'Moto' },
  { value: 'carro', label: 'Carro' },
];

const ESTADOS = [
  { value: 'en_taller', label: 'En taller' },
  { value: 'listo', label: 'Listo para entrega' },
  { value: 'entregado', label: 'Entregado' },
];

export default function VehicleForm({ clients, vehicle, method, url, submitLabel }: Props) {
  const form = useForm({
    client_id: vehicle ? String(vehicle.client_id) : '',
    plate: vehicle?.plate ?? '',
    brand: vehicle?.brand ?? '',
    model: vehicle?.model ?? '',
    year: vehicle ? String(vehicle.year) : '',
    tipo: vehicle?.tipo ?? 'moto',
    color: vehicle?.color ?? '',
    kilometraje: vehicle ? String(vehicle.kilometraje) : '0',
    estado: vehicle?.estado ?? 'en_taller',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'post') {
      form.post(url);
    } else {
      form.put(url);
    }
  };

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-6">
      {/* Propietario */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Propietario
        </h2>
        <div>
          <label className={labelClass}>Cliente</label>
          <select
            value={form.data.client_id}
            onChange={(e) => form.setData('client_id', e.target.value)}
            className={inputClass}
          >
            <option value="">Selecciona un cliente...</option>
            {clients.map((c) => (
              <option key={c.client_id} value={c.client_id} className="text-black">
                {c.first_name} {c.first_last_name}
              </option>
            ))}
          </select>
          {form.errors.client_id && <p className={errorClass}>{form.errors.client_id}</p>}
        </div>
      </section>

      <hr className="border-sidebar-border/60" />

      {/* Datos del vehículo */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Datos del vehículo
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Placa</label>
            <input
              type="text"
              value={form.data.plate}
              onChange={(e) => form.setData('plate', e.target.value.toUpperCase())}
              className={inputClass}
              placeholder="ABC123"
            />
            {form.errors.plate && <p className={errorClass}>{form.errors.plate}</p>}
          </div>

          <div>
            <label className={labelClass}>Año</label>
            <input
              type="number"
              value={form.data.year}
              onChange={(e) => form.setData('year', e.target.value)}
              className={inputClass}
              placeholder="2022"
            />
            {form.errors.year && <p className={errorClass}>{form.errors.year}</p>}
          </div>

          <div>
            <label className={labelClass}>Marca</label>
            <input
              type="text"
              value={form.data.brand}
              onChange={(e) => form.setData('brand', e.target.value)}
              className={inputClass}
              placeholder="Yamaha"
            />
            {form.errors.brand && <p className={errorClass}>{form.errors.brand}</p>}
          </div>

          <div>
            <label className={labelClass}>Modelo</label>
            <input
              type="text"
              value={form.data.model}
              onChange={(e) => form.setData('model', e.target.value)}
              className={inputClass}
              placeholder="FZ 150"
            />
            {form.errors.model && <p className={errorClass}>{form.errors.model}</p>}
          </div>

          <div>
            <label className={labelClass}>Tipo</label>
            <select
              value={form.data.tipo}
              onChange={(e) => form.setData('tipo', e.target.value)}
              className={inputClass}
            >
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value} className="text-black">
                  {t.label}
                </option>
              ))}
            </select>
            {form.errors.tipo && <p className={errorClass}>{form.errors.tipo}</p>}
          </div>

          <div>
            <label className={labelClass}>Color</label>
            <input
              type="text"
              value={form.data.color}
              onChange={(e) => form.setData('color', e.target.value)}
              className={inputClass}
              placeholder="Negro"
            />
            {form.errors.color && <p className={errorClass}>{form.errors.color}</p>}
          </div>

          <div>
            <label className={labelClass}>Kilometraje</label>
            <input
              type="number"
              min={0}
              value={form.data.kilometraje}
              onChange={(e) => form.setData('kilometraje', e.target.value)}
              className={inputClass}
            />
            {form.errors.kilometraje && <p className={errorClass}>{form.errors.kilometraje}</p>}
          </div>

          <div>
            <label className={labelClass}>Estado</label>
            <select
              value={form.data.estado}
              onChange={(e) => form.setData('estado', e.target.value)}
              className={inputClass}
            >
              {ESTADOS.map((s) => (
                <option key={s.value} value={s.value} className="text-black">
                  {s.label}
                </option>
              ))}
            </select>
            {form.errors.estado && <p className={errorClass}>{form.errors.estado}</p>}
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-2 border-t border-sidebar-border/60 pt-5">
        <Link
          href={index().url}
          className="rounded-lg bg-sidebar-accent px-4 py-2.5 text-sm font-medium hover:bg-sidebar-accent/80"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={form.processing}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {form.processing ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}