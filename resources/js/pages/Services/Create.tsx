import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function ServiceCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/services');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Crear Nuevo Servicio</h1>
                    <p className="text-sm text-zinc-400">Registra una nueva tarifa o servicio para el taller</p>
                </div>
                <Link
                    href="/services"
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    ← Volver
                </Link>
            </div>

            {/* Formulario con mayor ancho */}
            <form onSubmit={submit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Nombre del Servicio</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                            placeholder="Ej. Sincronización de motor"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Precio ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-600 transition"
                            placeholder="0.00"
                            required
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1.5">{errors.price}</p>}
                    </div>
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Descripción</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 h-32 resize-none transition"
                        placeholder="Detalles de lo que incluye el servicio..."
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1.5">{errors.description}</p>}
                </div>

                {/* Checkbox Estado */}
                <div className="flex items-center gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="is_active"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-red-600 focus:ring-red-600"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium text-zinc-300 cursor-pointer">
                        Servicio activo y disponible para cotizaciones
                    </label>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
                    <Link
                        href="/services"
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-5 py-2.5 rounded-lg font-medium transition"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition disabled:opacity-50"
                    >
                        Guardar Servicio
                    </button>
                </div>
            </form>
        </div>
    );
}