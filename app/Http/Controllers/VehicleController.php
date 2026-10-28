<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Models\Client;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(Request $request): Response
    {
        $vehicles = Vehicle::query()
            ->with('client:client_id,first_name,first_last_name')
            ->when($request->string('search')->toString(), fn ($q, $s) => $q->search($s))
            ->orderBy('plate')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('vehicles/index', [
            'vehicles' => $vehicles,
            'filters'  => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('vehicles/create', [
            'clients' => $this->clientOptions(),
        ]);
    }

    public function store(StoreVehicleRequest $request): RedirectResponse
    {
        Vehicle::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Vehículo creado correctamente.']);

        return to_route('vehicles.index');
    }

    public function edit(Vehicle $vehicle): Response
    {
        return Inertia::render('vehicles/edit', [
            'vehicle' => $vehicle,
            'clients' => $this->clientOptions(),
        ]);
    }

    public function update(UpdateVehicleRequest $request, Vehicle $vehicle): RedirectResponse
    {
        $vehicle->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Vehículo actualizado correctamente.']);

        return to_route('vehicles.index');
    }

    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        $vehicle->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Vehículo eliminado correctamente.']);

        return to_route('vehicles.index');
    }

    private function clientOptions()
    {
        return Client::select('client_id', 'first_name', 'first_last_name')
            ->orderBy('first_last_name')
            ->get();
    }
}