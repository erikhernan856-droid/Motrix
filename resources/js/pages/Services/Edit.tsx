import { Head, Link, useForm } from '@inertiajs/react';

interface Service {
  id: number;
  name: string;
  description?: string | null;
  price: number | string;
  is_active: boolean;
}

export default function ServicesEdit({ service }: { service: Service }) {
  const { data, setData, put, processing, errors } = useForm({
    name: service.name,
    description: service.description ?? '',
    price: service.price,
    is_active: Boolean(service.is_active),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/services/${service.id}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Head title="Editar Servicio" />

      {/* Encabezado con título y botón volver */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Editar Servicio</h1>
          <p className="text-sm text-zinc-400">Modifica los detalles del servicio seleccionado.</p>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
        >
          ← Volver
        </Link>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre del Servicio */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Nombre del servicio
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Ej. Cambio de Aceite y Filtro"
                className="w-full rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
            </div>

            {/* Precio */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Precio (COP)
              </label>
              <input
                type="number"
                step="0.01"
                value={data.price}
                onChange={(e) => setData('price', e.target.value)}
                placeholder="120000"
                className="w-full rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
              />
              {errors.price && <p className="mt-1.5 text-xs text-red-400">{errors.price}</p>}
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                required
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Escribe detalles sobre el servicio..."
                className="w-full rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-4 py-3 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors resize-y"
              />
              {/* Mensaje de error / subtítulo en rojo integrado debajo */}
            {errors.description ? (
                <p className="mt-1.5 text-xs font-medium text-red-400 flex items-center gap-1">
                <span>⚠️</span> {errors.description}
                </p>
            ) : (
                <p className="mt-1.5 text-xs text-zinc-500">
                * La descripción es obligatoria para registrar el servicio.
                </p>
            )}
            </div>
          </div>

          {/* Estado Activo */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="is_active"
              checked={data.is_active}
              onChange={(e) => setData('is_active', e.target.checked)}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-red-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-zinc-300 cursor-pointer select-none">
              Servicio Activo
            </label>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-zinc-800">
            <Link
              href="/services"
              className="inline-flex justify-center items-center rounded-lg px-5 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="inline-flex justify-center items-center rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all disabled:opacity-50"
            >
              {processing ? 'Actualizando...' : 'Actualizar Servicio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}