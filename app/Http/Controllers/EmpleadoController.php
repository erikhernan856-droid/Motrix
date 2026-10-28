<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmpleadoRequest;
use App\Http\Requests\UpdateEmpleadoRequest;
use App\Models\Agency;
use App\Models\Empleados;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmpleadoController extends Controller
{
    public function index(Request $request): Response
    {
        $empleados = Empleados::query()
            ->with('agencia.city:city_id,province')
            ->when($request->string('search')->toString(), fn ($q, $s) => $q->search($s))
            ->orderBy('apellido')
            ->orderBy('nombre')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('empleados/index', [
            'empleados' => $empleados,
            'filters'   => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('empleados/create', [
            'agencias' => $this->agenciaOptions(),
        ]);
    }

    public function store(StoreEmpleadoRequest $request): RedirectResponse
    {
        Empleados::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Empleado creado correctamente.']);

        return to_route('empleados.index');
    }

    public function edit(Empleados $empleado): Response
    {
        return Inertia::render('empleados/edit', [
            'empleado' => $empleado,
            'agencias' => $this->agenciaOptions(),
        ]);
    }

    public function update(UpdateEmpleadoRequest $request, Empleados $empleado): RedirectResponse
    {
        $empleado->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Empleado actualizado correctamente.']);

        return to_route('empleados.index');
    }

    public function destroy(Empleados $empleado): RedirectResponse
    {
        $empleado->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Empleado eliminado correctamente.']);

        return to_route('empleados.index');
    }

    private function agenciaOptions()
    {
        return Agency::with('city:city_id,province')
            ->orderBy('id_direc')
            ->get(['agencia_id', 'id_direc', 'city_id']);
    }
}