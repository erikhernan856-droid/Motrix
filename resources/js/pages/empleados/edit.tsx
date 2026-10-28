import { Head } from '@inertiajs/react';
import EmpleadoForm, { type AgenciaOption, type EmpleadoData } from '@/components/empleado-form';
import { index, update } from '@/routes/empleados';

interface Props {
  empleado: EmpleadoData;
  agencias: AgenciaOption[];
}

export default function EmpleadosEdit({ empleado, agencias }: Props) {
  return (
    <>
      <Head title={`Editar ${empleado.nombre}`} />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold">Editar empleado</h1>
          <p className="text-sm text-muted-foreground">{empleado.nombre} {empleado.apellido}</p>
        </div>
        <div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/20 p-6 shadow-sm">
          <EmpleadoForm
            agencias={agencias}
            empleado={empleado}
            method="put"
            url={update({ empleado: empleado.empleado_id }).url}
            submitLabel="Guardar cambios"
          />
        </div>
      </div>
    </>
  );
}

EmpleadosEdit.layout = () => ({
  breadcrumbs: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Empleados', href: index().url },
    { title: 'Editar', href: '#' },
  ],
});