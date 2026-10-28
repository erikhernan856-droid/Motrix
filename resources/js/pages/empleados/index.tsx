import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { create, edit, index, destroy } from '@/routes/empleados';

interface Empleado {
  empleado_id: number;
  documento: string;
  nombre: string;
  apellido: string;
  cargo: string;
  telefono: string | null;
  agencia?: { agencia_id: number; id_direc: string } | null;
}

interface Props {
  empleados: {
    data: Empleado[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters: { search?: string };
}

export default function EmpleadosIndex({ empleados, filters }: Props) {
  const [search, setSearch] = useState(filters.search ?? '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(index().url, { search }, { preserveState: true, replace: true });
  };

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`¿Eliminar a ${name}?`)) return;
    router.delete(destroy({ empleado: id }).url);
  };

  return (
    <>
      <Head title="Empleados" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Empleados</h1>
          <Link href={create().url} prefetch className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            + Nuevo Empleado
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, documento o cargo..."
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
                <th className="px-4 py-3">Documento</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Cargo</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Agencia</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border/40">
              {empleados.data.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No se encontraron empleados.
                  </td>
                </tr>
              )}
              {empleados.data.map((e) => (
                <tr key={e.empleado_id} className="hover:bg-sidebar-accent/40 transition-colors">
                  <td className="px-4 py-3 font-mono">{e.documento}</td>
                  <td className="px-4 py-3 font-medium">{e.nombre} {e.apellido}</td>
                  <td className="px-4 py-3">{e.cargo}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.telefono ?? '-'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.agencia?.id_direc ?? '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={edit({ empleado: e.empleado_id }).url} prefetch className="rounded px-2 py-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950">
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => handleDelete(e.empleado_id, `${e.nombre} ${e.apellido}`)} className="rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {empleados.links.length > 3 && (
          <div className="flex flex-wrap gap-1">
            {empleados.links.map((link, key) =>
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

EmpleadosIndex.layout = () => ({
  breadcrumbs: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Empleados', href: index().url },
  ],
});