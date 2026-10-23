<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $clients = Client::query()
            ->when($request->string('search'), fn ($q, $search) => $q->search($search))
            ->orderBy('first_last_name')
            ->orderBy('first_name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('clients/index', [
            'clients' => $clients,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('clients/create', [
            'docTypes' => Client::DOC_TYPES,
            'genders' => Client::GENDERS,
        ]);
    }

    public function store(StoreClientRequest $request): RedirectResponse
    {
        Client::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Cliente creado correctamente.']);

        return to_route('clients.index');
    }

    public function edit(Client $client): Response
    {
        return Inertia::render('clients/edit', [
            'client' => $client,
            'docTypes' => Client::DOC_TYPES,
            'genders' => Client::GENDERS,
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        $client->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Cliente actualizado correctamente.']);

        return to_route('clients.index');
    }

    public function destroy(Client $client): RedirectResponse
    {
        $client->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Cliente eliminado correctamente.']);

        return to_route('clients.index');
    }
}