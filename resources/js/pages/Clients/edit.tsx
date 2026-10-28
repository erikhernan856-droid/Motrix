import { Form, Head } from '@inertiajs/react';
import ClientController from '@/actions/App/Http/Controllers/ClientController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { index } from '@/routes/clients';

type client = {
  client_id: number;
  doc_type: string;
  id_number: number;
  first_name: string;
  middle_name: string;
  first_last_name: string;
  second_last_name: string;
  gender: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  birth_date: string | null;
  loyalty_pts: number;
  is_active: boolean;
};

type Props = {
  client: client;
  docTypes: Record<string, string>;
  genders: Record<string, string>;
};

export default function ClientEdit({ client, docTypes, genders }: Props) {
  return (
    <>
      <Head title="Editar cliente" />
      <div className="flex flex-col gap-6 p-6">
        <Heading
          title="Editar cliente"
          description={`Modifica los datos de ${client.first_name} ${client.first_last_name}.`}
        />

        <Form
          {...ClientController.update.form({ client: client.client_id })}
          className="flex flex-col gap-6"
        >
          {({ processing, errors }) => (
            <>
              {/* Documento de identidad */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Documento de identidad
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="doc_type">
                      Tipo de documento <span className="text-destructive">*</span>
                    </Label>
                    <Select name="doc_type" defaultValue={client.doc_type}>
                      <SelectTrigger id="doc_type" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(docTypes).map(([code, label]) => (
                          <SelectItem key={code} value={code}>
                            {code} - {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <InputError message={errors.doc_type} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="id_number">
                      Número de documento <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="id_number"
                      name="id_number"
                      type="number"
                      min={1}
                      defaultValue={client.id_number}
                    />
                    <InputError message={errors.id_number} />
                  </div>
                </CardContent>
              </Card>

              {/* Nombre completo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Nombre completo
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">
                      Primer nombre <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      defaultValue={client.first_name}
                    />
                    <InputError message={errors.first_name} />
                  </div>

                  {/* Segundo nombre */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Segundo nombre</label>
                    <input
                      type="text"
                      name="middle_name"
                      defaultValue={client.middle_name ?? ''}
                      className="w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                    />
                    <InputError message={errors.middle_name} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="first_last_name">
                      Primer apellido <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="first_last_name"
                      name="first_last_name"
                      defaultValue={client.first_last_name}
                    />
                    <InputError message={errors.first_last_name} />
                  </div>

                  {/* Segundo apellido */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Segundo apellido</label>
                    <input
                      type="text"
                      name="second_last_name"
                      defaultValue={client.second_last_name ?? ''}
                      className="w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                    />
                    <InputError message={errors.second_last_name} />
                  </div>

                  <div className="grid gap-2 sm:col-span-1">
                    <Label htmlFor="gender">Género</Label>
                    <Select name="gender" defaultValue={client.gender ?? ''}>
                      <SelectTrigger id="gender" className="w-full">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(genders).map(([code, label]) => (
                          <SelectItem key={code} value={code}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <InputError message={errors.gender} />
                  </div>
                </CardContent>
              </Card>

              {/* Datos de contacto */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Datos de contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Teléfono</label>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={client.phone ?? ''}
                      className="w-full rounded-md border border-sidebar-border bg-transparent px-3 py-2 text-sm"
                    />
                    <InputError message={errors.phone} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={client.email ?? ''}
                    />
                    <InputError message={errors.email} />
                  </div>

                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      name="address"
                      defaultValue={client.address ?? ''}
                    />
                    <InputError message={errors.address} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="birth_date">Fecha de nacimiento</Label>
                    <Input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      defaultValue={client.birth_date ?? ''}
                    />
                    <InputError message={errors.birth_date} />
                  </div>
                </CardContent>
              </Card>

              {/* Programa de lealtad y estado */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Programa de lealtad y estado
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="loyalty_pts">Puntos acumulados</Label>
                    <Input
                      id="loyalty_pts"
                      name="loyalty_pts"
                      type="number"
                      min={0}
                      defaultValue={client.loyalty_pts}
                    />
                    <InputError message={errors.loyalty_pts} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="is_active">Estado</Label>
                    <Select
                      name="is_active"
                      defaultValue={client.is_active ? '1' : '0'}
                    >
                      <SelectTrigger id="is_active" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Activo</SelectItem>
                        <SelectItem value="0">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.is_active} />
                  </div>
                </CardContent>
              </Card>

              {/* Acciones */}
              <div className="flex items-center gap-3 pb-2">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Guardando...' : 'Guardar cambios'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => history.back()}
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </>
  );
}

ClientEdit.layout = {
  breadcrumbs: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clientes', href: index() },
    { title: 'Editar cliente' },
  ],
};