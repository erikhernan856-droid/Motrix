import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Car, Plus, Trash2, X } from 'lucide-react';

interface Client {
  id: number;
  name: string;
}

interface Vehicle {
  id: number;
  plate: string;
  brand: string;
  model: string;
  year?: number;
  color?: string;
  client?: Client;
}

interface Props {
  vehicles: {
    data: Vehicle[];
  };
  clients: Client[];
}

export default function VehicleIndex({ vehicles, clients }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, setData, post, processing, reset, errors, delete: destroy } = useForm({
    client_id: '',
    plate: '',
    brand: '',
    model: '',
    year: '',
    color: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('vehicles.store'), {
      onSuccess: () => {
        reset();
        setIsOpen(false);
      },
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar este vehículo?')) {
      destroy(route('vehicles.destroy', id));
    }
  };

  return (
    <div className="p-6 text-white bg-zinc-900 min-h-screen">
      <Head title="Vehículos" />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Car className="w-6 h-6 text-blue-500" />
            Vehículos
          </h1>
          <p className="text-sm text-zinc-400">Listado y registro de vehículos en el taller</p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2"
        >
          <Plus size={16} /> Nuevo Vehículo
        </button>
      </div>

      <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="px-4 py-3">PLACA</th>
              <th className="px-4 py-3">MARCA / MODELO</th>
              <th className="px-4 py-3">AÑO</th>
              <th className="px-4 py-3">COLOR</th>
              <th className="px-4 py-3">PROPIETARIO</th>
              <th className="px-4 py-3 text-right">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {vehicles.data.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-zinc-900/50">
                <td className="px-4 py-3 font-semibold text-blue-400">{vehicle.plate}</td>
                <td className="px-4 py-3">{vehicle.brand} {vehicle.model}</td>
                <td className="px-4 py-3 text-zinc-400">{vehicle.year || 'N/A'}</td>
                <td className="px-4 py-3 text-zinc-400">{vehicle.color || 'N/A'}</td>
                <td className="px-4 py-3">{vehicle.client?.name || 'Sin asignar'}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="text-red-500 hover:text-red-400 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Crear Vehículo */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 w-full max-w-md relative text-white">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-bold mb-4">Registrar Nuevo Vehículo</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-zinc-400 mb-1">Cliente / Propietario</label>
                <select
                  value={data.client_id}
                  onChange={(e) => setData('client_id', e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white"
                >
                  <option value="">Selecciona un cliente</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {errors.client_id && <p className="text-red-500 text-xs mt-1">{errors.client_id}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Placa</label>
                  <input
                    type="text"
                    value={data.plate}
                    onChange={(e) => setData('plate', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white uppercase"
                    placeholder="ABC123"
                  />
                  {errors.plate && <p className="text-red-500 text-xs mt-1">{errors.plate}</p>}
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Marca</label>
                  <input
                    type="text"
                    value={data.brand}
                    onChange={(e) => setData('brand', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white"
                    placeholder="Toyota"
                  />
                  {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Modelo</label>
                  <input
                    type="text"
                    value={data.model}
                    onChange={(e) => setData('model', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white"
                    placeholder="Corolla"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Año</label>
                  <input
                    type="number"
                    value={data.year}
                    onChange={(e) => setData('year', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white"
                    placeholder="2022"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Color</label>
                  <input
                    type="text"
                    value={data.color}
                    onChange={(e) => setData('color', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white"
                    placeholder="Negro"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}