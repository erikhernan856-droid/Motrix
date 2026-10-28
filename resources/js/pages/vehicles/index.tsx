import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { create, edit, index, destroy } from '@/routes/vehicles';

interface Vehicle {
  vehicle_id: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  tipo: string;
  color?: string | null;
  kilometraje: number;
  estado: string;
  client?: { client_id: number; first_name: string; first_last_name: string } | null;
}

interface Props {
  vehicles: {
    data: Vehicle[];
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters: { search?: string };
}

export default function VehiclesIndex({ vehicles, filters }: Props) {
  const [search, setSearch] = useState(filters.search ?? '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(index().url, { search }, { preserveState: true, replace: true });
  };

  const handleDelete = (id: number, plate: string) => {
    if (!confirm(`¿Eliminar el vehículo ${plate}?`)) return;
    router.delete(destroy({ vehicle: id }).url);
  };

  return (
    <>
      <Head title="Vehículos" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Vehículos</h1>
          <Link href={create().url} prefetch className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            + Nuevo Vehículo
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por placa, marca o modelo..."
            className="w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="rounded-md bg-sidebar-accent px-4 py-2 text-sm font-medium hover:bg-sidebar-accent/80">
            Buscar
          </button>
        </form>

        <div className="overflow-hidden rounded-xl border border-sidebar-border/70">
          <table className="w-full text-sm">
            <thead className="bg-sidebar-accent text-left text-xs uppercase tracking-wide text-sidebar-accent-foreground">
              <tr>
                <th className="px-4 py-3">Placa</th>
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3">Modelo</th>
                <th className="px-4 py-3">Año</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Km</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border/40">
              {vehicles.data.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                    No se encontraron vehículos.
                  </td>
                </tr>
              )}
              {vehicles.data.map((v) => (
                <tr key={v.vehicle_id} className="hover:bg-sidebar-accent/40 transition-colors">
                  <td className="px-4 py-3 font-mono">{v.plate}</td>
                  <td className="px-4 py-3">{v.brand}</td>
                  <td className="px-4 py-3">{v.model}</td>
                  <td className="px-4 py-3">{v.year}</td>
                  <td className="px-4 py-3 capitalize">{v.tipo}</td>
                  <td className="px-4 py-3">{v.kilometraje.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        v.estado === 'en_taller'
                          ? 'bg-amber-500/20 text-amber-500'
                          : v.estado === 'listo'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-sidebar-accent text-muted-foreground'
                      }`}
                    >
                      {v.estado.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {v.client ? `${v.client.first_name} ${v.client.first_last_name}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={edit({ vehicle: v.vehicle_id }).url} prefetch className="rounded px-2 py-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950">
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => handleDelete(v.vehicle_id, v.plate)} className="rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {vehicles.links.length > 3 && (
          <div className="flex flex-wrap gap-1">
            {vehicles.links.map((link, key) =>
              link.url === null ? (
                <span key={key} className="rounded border border-sidebar-border px-3 py-1.5 text-xs opacity-50" dangerouslySetInnerHTML={{ __html: link.label }} />
              ) : (
                <Link
                  key={key}
                  href={link.url}
                  className={`rounded border px-3 py-1.5 text-xs font-medium ${link.active ? 'border-blue-600 bg-blue-600 text-white' : 'border-sidebar-border bg-sidebar-accent/50'}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

VehiclesIndex.layout = () => ({
  breadcrumbs: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Vehículos', href: index().url },
  ],
});