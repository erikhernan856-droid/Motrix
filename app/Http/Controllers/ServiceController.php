<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::latest()->paginate(10);

        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('Services/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'is_active'   => 'boolean',
        ]);

        Service::create([
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price'       => $validated['price'],
            'is_active'   => $request->has('is_active') ? $request->is_active : true,
        ]);

        return redirect()->route('services.index')->with('success', 'Servicio creado correctamente.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Services/Edit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'is_active'   => 'boolean',
        ]);

        $service->update([
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price'       => $validated['price'],
            'is_active'   => $request->has('is_active') ? $request->is_active : $service->is_active,
        ]);

        return redirect()->route('services.index')->with('success', 'Servicio actualizado correctamente.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->back()->with('success', 'Servicio eliminado correctamente.');
    }
}