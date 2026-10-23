import { Head } from '@inertiajs/react';

interface Client {
    id: number;
    doc_type?: string | null;
    id_number?: string | null;
    first_name: string;
    middle_name?: string | null;
    first_last_name: string;
    second_last_name?: string | null;
    phone?: string | null;
    email?: string | null;
    place_exp?: string | null;
    grupo_sanguineo?: string | null;
    fecha_exp_doc?: string | null;
}

interface DashboardProps {
    recentClients?: Client[];
}

export default function Dashboard({ recentClients = [] }: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Lista Completa e Información de Usuarios */}
                <div className="relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h3 className="mb-4 text-lg font-semibold">Usuarios Recientes</h3>

                    {recentClients.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-sidebar-border">
                                        <th className="pb-3 font-medium">Documento</th>
                                        <th className="pb-3 font-medium">Nombre Completo</th>
                                        <th className="pb-3 font-medium">Teléfono</th>
                                        <th className="pb-3 font-medium">Ciudad</th>
                                        <th className="pb-3 font-medium">Correo</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sidebar-border/40">
                                    {recentClients.map((client) => (
                                        <tr key={client.id}>
                                            <td className="py-3">{client.id_number ?? '-'}</td>
                                            <td className="py-3">{`${client.first_name} ${client.first_last_name}`}</td>
                                            <td className="py-3">{client.phone ?? '-'}</td>
                                            <td className="py-3">{client.place_exp ?? '-'}</td>
                                            <td className="py-3">{client.email ?? '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No hay clientes registrados recientemente.</p>
                    )}
                </div>

            </div>
        </>
    );
}