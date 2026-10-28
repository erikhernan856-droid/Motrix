import { Head } from '@inertiajs/react';
import EmpleadoForm, { type AgenciaOption } from '@/components/empleado-form';
import { index, store } from '@/routes/empleados';

export default function EmpleadosCreate({ agencias }: { agencias: AgenciaOption[] }) {
  return (
    <>
      <Head title="Nuevo empleado" />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold">Nuevo empleado</h1>
          <p className="text-sm text-muted-foreground">Registra un empleado y asígnalo a una agencia.</p>
        </div>
        <div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/20 p-6 shadow-sm">
          <EmpleadoForm agencias={agencias} method="post" url={store().url} submitLabel="Crear empleado" />
        </div>
      </div>
    </>
  );
}

EmpleadosCreate.layout = () => ({
  breadcrumbs: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Empleados', href: index().url },
    { title: 'Nuevo', href: '#' },
  ],
});