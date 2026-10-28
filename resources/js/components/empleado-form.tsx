import { Link, useForm } from '@inertiajs/react';
import { index } from '@/routes/empleados';

export interface AgenciaOption {
  agencia_id: number;
  id_direc: string;
  city?: { province: string } | null;
}

export interface EmpleadoData {
  empleado_id: number;
  documento: string;
  nombre: string;
  apellido: string;
  cargo: string;
  telefono: string | null;
  agencia_id: number;
}

interface Props {
  agencias: AgenciaOption[];
  empleado?: EmpleadoData;
  method: 'post' | 'put';
  url: string;
  submitLabel: string;
}

const inputClass =
  'w-full rounded-lg border border-sidebar-border bg-background px-3 py-2.5 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40';
const labelClass = 'mb-1.5 block text-sm font-medium';
const errorClass = 'mt-1 text-xs text-red-500';

export default function EmpleadoForm({ agencias, empleado, method, url, submitLabel }: Props) {
  const form = useForm({
    documento: empleado?.documento ?? '',
    nombre: empleado?.nombre ?? '',
    apellido: empleado?.apellido ?? '',
    cargo: empleado?.cargo ?? '',
    telefono: empleado?.telefono ?? '',
    agencia_id: empleado ? String(empleado.agencia_id) : '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'post') form.post(url);
    else form.put(url);
  };

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Documento</label>
          <input type="text" value={form.data.documento} onChange={(e) => form.setData('documento', e.target.value)} className={inputClass} placeholder="1010101010" />
          {form.errors.documento && <p className={errorClass}>{form.errors.documento}</p>}
        </div>

        <div>
          <label className={labelClass}>Teléfono</label>
          <input type="text" value={form.data.telefono} onChange={(e) => form.setData('telefono', e.target.value)} className={inputClass} placeholder="3001112233" />
          {form.errors.telefono && <p className={errorClass}>{form.errors.telefono}</p>}
        </div>

        <div>
          <label className={labelClass}>Nombre</label>
          <input type="text" value={form.data.nombre} onChange={(e) => form.setData('nombre', e.target.value)} className={inputClass} />
          {form.errors.nombre && <p className={errorClass}>{form.errors.nombre}</p>}
        </div>

        <div>
          <label className={labelClass}>Apellido</label>
          <input type="text" value={form.data.apellido} onChange={(e) => form.setData('apellido', e.target.value)} className={inputClass} />
          {form.errors.apellido && <p className={errorClass}>{form.errors.apellido}</p>}
        </div>

        <div>
          <label className={labelClass}>Cargo</label>
          <input type="text" value={form.data.cargo} onChange={(e) => form.setData('cargo', e.target.value)} className={inputClass} placeholder="Mecánico" />
          {form.errors.cargo && <p className={errorClass}>{form.errors.cargo}</p>}
        </div>

        <div>
          <label className={labelClass}>Agencia</label>
          <select value={form.data.agencia_id} onChange={(e) => form.setData('agencia_id', e.target.value)} className={inputClass}>
            <option value="">Selecciona una agencia...</option>
            {agencias.map((a) => (
              <option key={a.agencia_id} value={a.agencia_id} className="text-black">
                {a.id_direc}{a.city ? ` - ${a.city.province}` : ''}
              </option>
            ))}
          </select>
          {form.errors.agencia_id && <p className={errorClass}>{form.errors.agencia_id}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-sidebar-border/60 pt-5">
        <Link href={index().url} className="rounded-lg bg-sidebar-accent px-4 py-2.5 text-sm font-medium hover:bg-sidebar-accent/80">
          Cancelar
        </Link>
        <button type="submit" disabled={form.processing} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
          {form.processing ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}