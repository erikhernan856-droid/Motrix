<?php

namespace App\Http\Controllers;

use App\Models\client;
use App\Models\Vehicle;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $recentClients = Client::latest()
            ->take(5)
            ->get(['id', 'id_number', 'first_name', 'first_last_name', 'phone', 'address', 'email']);

        return Inertia::render('Dashboard', [
            'clients' => $recentClients
        ]);
    }
}