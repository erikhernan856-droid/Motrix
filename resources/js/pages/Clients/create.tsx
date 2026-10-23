import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { create, index } from '@/routes/clients';

type Props = { 
    docTypes?: Record<string, string>; 
    genders?: Record<string, string>; 
};

export default function ClientCreate({ docTypes = {}, genders = {} }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        doc_type: '',
        id_number: '',
        first_name: '',
        middle_name: '',
        first_last_name: '',
        second_last_name: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        birth_date: '',
        loyalty_pts: 0,
        is_active: '1',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/clients');
    };

    return (
        <>
            <Head title="Nuevo cliente" />

            <div className="flex flex-col gap-6 p-6">
                <Heading
                    title="Nuevo cliente"
                    description="Completa los datos del cliente para registrarlo."
                />

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Documento de identidad */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                Documento de identidad
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="grid gap-1.5">
                                <Label htmlFor="tipo_documento">
                                    Tipo de documento <span className="text-destructive">*</span>
                                </Label>
                                <Select 
                                    value={data.doc_type || undefined} 
                                    onValueChange={(val) => setData('doc_type', val)}
                                >
                                    <SelectTrigger id="tipo_documento" className={`w-full ${errors.doc_type ? 'border-destructive focus:ring-destructive' : ''}`}>
                                        <SelectValue placeholder="Seleccionar…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(docTypes).map(([code, label]) => (
                                            <SelectItem key={code} value={code}>
                                                {code} — {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.doc_type} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="id_number">
                                    Número de documento <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="id_number"
                                    type="text"
                                    placeholder="Ej. 1020304050"
                                    value={data.id_number}
                                    onChange={(e) => setData('id_number', e.target.value)}
                                    className={errors.id_number ? 'border-destructive focus-visible:ring-destructive' : ''}
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
                            <div className="grid gap-1.5">
                                <Label htmlFor="first_name">
                                    Primer nombre <span className="text-destructive">*</span>
                                </Label>
                                <Input 
                                    id="first_name" 
                                    placeholder="Primer nombre" 
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    className={errors.first_name ? 'border-destructive focus-visible:ring-destructive' : ''}
                                />
                                <InputError message={errors.first_name} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="middle_name">Segundo nombre</Label>
                                <Input 
                                    id="middle_name" 
                                    placeholder="Segundo nombre" 
                                    value={data.middle_name}
                                    onChange={(e) => setData('middle_name', e.target.value)}
                                    className={errors.middle_name ? 'border-destructive focus-visible:ring-destructive' : ''}
                                />
                                <InputError message={errors.middle_name} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="first_last_name">
                                    Primer apellido <span className="text-destructive">*</span>
                                </Label>
                                <Input 
                                    id="first_last_name" 
                                    placeholder="Primer apellido" 
                                    value={data.first_last_name}
                                    onChange={(e) => setData('first_last_name', e.target.value)}
                                    className={errors.first_last_name ? 'border-destructive focus-visible:ring-destructive' : ''}
                                />
                                <InputError message={errors.first_last_name} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="second_last_name">Segundo apellido</Label>
                                <Input 
                                    id="second_last_name" 
                                    placeholder="Segundo apellido" 
                                    value={data.second_last_name}
                                    onChange={(e) => setData('second_last_name', e.target.value)}
                                    className={errors.second_last_name ? 'border-destructive focus-visible:ring-destructive' : ''}
                                />
                                <InputError message={errors.second_last_name} />
                            </div>
                            <div className="grid gap-1.5 sm:col-span-2">
                                <Label htmlFor="gender">Género</Label>
                                <Select 
                                    value={data.gender || undefined} 
                                    onValueChange={(val) => setData('gender', val)}
                                >
                                    <SelectTrigger id="gender" className={`w-full ${errors.gender ? 'border-destructive focus:ring-destructive' : ''}`}>
                                        <SelectValue placeholder="Seleccionar género…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(genders).length > 0 ? (
                                            Object.entries(genders).map(([code, label]) => (
                                                <SelectItem key={code} value={code}>
                                                    {label}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <>
                                                <SelectItem value="M">Masculino</SelectItem>
                                                <SelectItem value="F">Femenino</SelectItem>
                                                <SelectItem value="O">Otro</SelectItem>
                                            </>
                                        )}
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
                            <div className="grid gap-1.5">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input 
                                    id="phone" 
                                    placeholder="Ej. 311-555-0101" 
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className={errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    placeholder="correo@ejemplo.com" 
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-1.5 sm:col-span-2">
                                <Label htmlFor="address">Dirección</Label>
                                <Input 
                                    id="address" 
                                    placeholder="Dirección de residencia" 
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className={errors.address ? 'border-destructive focus-visible:ring-destructive' : ''}
                                />
                                <InputError message={errors.address} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="birth_date">Fecha de nacimiento</Label>
                                <Input 
                                    id="birth_date" 
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    className={errors.birth_date ? 'border-destructive focus-visible:ring-destructive' : ''}
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
                            <div className="grid gap-1.5">
                                <Label htmlFor="loyalty_pts">Puntos acumulados</Label>
                                <Input 
                                    id="loyalty_pts" 
                                    type="number"
                                    value={data.loyalty_pts}
                                    onChange={(e) => setData('loyalty_pts', Number(e.target.value))}
                                    className={errors.loyalty_pts ? 'border-destructive focus-visible:ring-destructive' : ''}
                                />
                                <InputError message={errors.loyalty_pts} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="is_active">Estado</Label>
                                <Select 
                                    value={String(data.is_active)} 
                                    onValueChange={(val) => setData('is_active', val)}
                                >
                                    <SelectTrigger id="is_active" className={`w-full ${errors.is_active ? 'border-destructive focus:ring-destructive' : ''}`}>
                                        <SelectValue placeholder="Seleccionar estado…" />
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
                            {processing ? 'Guardando…' : 'Guardar cliente'}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => history.back()}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

ClientCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Clients', href: index() },
        { title: 'Nuevo cliente', href: create() },
    ],
};