import { Head } from '@inertiajs/react';
import VehicleForm, { type ClientOption, type VehicleData } from '@/components/vehicle-form';
import { index, update } from '@/routes/vehicles';

interface Props {
  vehicle: VehicleData;
  clients: ClientOption[];
}

export default function VehiclesEdit({ vehicle, clients }: Props) {
  return (
    <>
      <Head title={`Editar ${vehicle.plate}`} />
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-semibold">Editar vehículo {vehicle.plate}</h1>
        <VehicleForm
          clients={clients}
          vehicle={vehicle}
          method="put"
          url={update({ vehicle: vehicle.vehicle_id }).url}
          submitLabel="Guardar cambios"
        />
      </div>
    </>
  );
}

VehiclesEdit.layout = () => ({
  breadcrumbs: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Vehículos', href: index().url },
    { title: 'Editar', href: '#' },
  ],
});