import { Head } from '@inertiajs/react';
import VehicleForm, { type ClientOption } from '@/components/vehicle-form';
import { index, store } from '@/routes/vehicles';

export default function VehiclesCreate({ clients }: { clients: ClientOption[] }) {
  return (
    <>
      <Head title="Nuevo vehículo" />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold">Nuevo vehículo</h1>
          <p className="text-sm text-muted-foreground">
            Registra un vehículo y asígnalo a su propietario.
          </p>
        </div>

        <div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/20 p-6 shadow-sm">
          <VehicleForm clients={clients} method="post" url={store().url} submitLabel="Crear vehículo" />
        </div>
      </div>
    </>
  );
}

VehiclesCreate.layout = () => ({
  breadcrumbs: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Vehículos', href: index().url },
    { title: 'Nuevo', href: '#' },
  ],
});