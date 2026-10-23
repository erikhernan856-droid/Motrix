import { Head, Link, router } from '@inertiajs/react';
import {Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { create, edit, index, destroy } from '@/routes/clients';

interface Client {
  id: number;
  doc_type?: string | null;
  id_number?: string | null;
  first_name: string;
  middle_name?: string | null;
  first_last_name: string;
  second_last_name?: string | null;
  phone?: string | null;
  place_exp?: string | null;
  loyalty_pts?: number;
}

interface PaginatedClients {
  from: number | null;
  to: number | null;
  data: Client[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
  clients: PaginatedClients;
  filters: { search?: string };
}

export default function ClientsIndex({ clients, filters }: Props) {
  const [search, setSearch] = useState(filters.search ?? '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(index().url, { search }, { preserveState: true, replace: true });
  };

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`¿Eliminar a ${name}?`)) return;
    router.delete(destroy({ client: id }).url);
  };

  return (
    <>
      <Head title="Clientes" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Encabezado */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Clientes</h1>
          <Link
            href={create().url}
            prefetch
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Nuevo Cliente
          </Link>
        </div>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, documento o teléfono..."
            className="w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-md bg-sidebar-accent px-4 py-2 text-sm font-medium hover:bg-sidebar-accent/80"
          >
            Buscar
          </button>
        </form>

        {/* Tabla de Clientes */}
        <div className="overflow-hidden rounded-xl border border-sidebar-border/70">
          <table className="w-full text-sm">
            <thead className="bg-sidebar-accent text-left text-xs uppercase tracking-wide text-sidebar-accent-foreground">
              <tr>
                <th className="px-4 py-3">Tipo Doc.</th>
                <th className="px-4 py-3">Número</th>
                <th className="px-4 py-3">Nombre completo</th>
                <th className="px-4 py-3">Ciudad</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3 text-center">Pts.</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-sidebar-border/40">
              {clients.data.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    No se encontraron clientes.
                  </td>
                </tr>
              )}
              {clients.data.map((c) => {
                const fullName = [c.first_name, c.middle_name, c.first_last_name, c.second_last_name]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <tr key={c.id} className="hover:bg-sidebar-accent/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{c.doc_type ?? '-'}</td>
                    <td className="px-4 py-3 font-mono">{c.id_number ?? '-'}</td>
                    <td className="px-4 py-3 font-medium">{fullName || '-'}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.place_exp ?? '-'}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.phone ?? '-'}</td>
                    <td className="px-4 py-3 text-center">{c.loyalty_pts ?? 0}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={edit({ client: c.id }).url}
                          prefetch
                          className="rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id, fullName)}
                          className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginación - Fuera de la tabla */}
        {clients.links && clients.links.length > 3 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sidebar-border/70 pt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-semibold text-foreground">{clients.from ?? 0}</span> a{' '}
              <span className="font-semibold text-foreground">{clients.to ?? 0}</span> de{' '}
              <span className="font-semibold text-foreground">{clients.total}</span> clientes
            </p>

            <div className="flex flex-wrap gap-1">
              {clients.links.map((link, key) =>
                link.url === null ? (
                  <span
                    key={key}
                    className="rounded px-3 py-1.5 text-xs text-muted-foreground/50 border border-sidebar-border cursor-not-allowed opacity-50"
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ) : (
                  <Link
                    key={key}
                    href={link.url}
                    className={`rounded px-3 py-1.5 text-xs font-medium border transition-colors ${
                      link.active
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-sidebar-border bg-sidebar-accent/50 text-foreground hover:bg-sidebar-accent'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Configuración de Layout / Breadcrumbs
ClientsIndex.layout = (page: React.ReactNode) => ({
  breadcrumbs: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clientes', href: index().url },
  ],
});