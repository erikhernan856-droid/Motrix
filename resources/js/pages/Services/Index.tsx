import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description?: string | null;
  price: number | string;
  is_active: boolean;
}

interface Props {
  services: {
    data: Service[];
  };
}

export default function ServicesIndex({ services }: Props) {
  const handleDelete = (id: number, name: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar el servicio "${name}"?`)) {
      router.delete(`/services/${id}`);
    }
  };

  return (
    <div className="p-6">
      {/* Encabezado con Botón Crear */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Servicios</h1>
        <Link
          href="/services/create"
          className="inline-flex items-center gap-2 rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Servicio
        </Link>
      </div>

      {/* Tabla de Servicios */}
      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-800 text-xs uppercase text-zinc-400">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Descripción</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {services.data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  No se encontraron servicios registrados.
                </td>
              </tr>
            )}
            {services.data.map((s) => (
              <tr key={s.id} className="transition-colors hover:bg-zinc-800/50">
                <td className="px-4 py-3 font-semibold text-white">{s.name}</td>
                <td className="px-4 py-3 text-zinc-400">{s.description ?? '-'}</td>
                <td className="px-4 py-3 font-mono">${Number(s.price).toLocaleString('es-CO')}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      s.is_active ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-red-950 text-red-400 border border-red-800/50'
                    }`}
                  >
                    {s.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    
                    <Link
                    href={`/services/${s.id}/edit`}
                          prefetch
                          className="rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                        >
                          <Pencil size={14} />
                    </Link>

                    <button
                     onClick={() => handleDelete(s.id, s.name)}
                          className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}