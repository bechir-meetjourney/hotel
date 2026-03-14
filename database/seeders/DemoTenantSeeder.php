<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoTenantSeeder extends Seeder
{
    public function run(): void
    {
        $tenant = Tenant::updateOrCreate(
            ['slug' => 'grand-hotel'],
            [
                'name' => 'Grand Hotel Riyadh',
                'subdomain' => 'grand',
                'template' => 'madina',
                'email' => 'info@grandhotel.sa',
                'phone' => '+966500000000',
                'plan' => 'professional',
                'subscription_starts_at' => now(),
                'subscription_ends_at' => now()->addYear(),
                'is_active' => true,
            ]
        );

        User::updateOrCreate(
            ['email' => 'hotel@grandhotel.sa'],
            [
                'name' => 'Hotel Admin',
                'password' => bcrypt('password'),
                'role' => 'client_admin',
                'tenant_id' => $tenant->id,
                'email_verified_at' => now(),
            ]
        );

        // Default site sections
        $sections = ['hero', 'rooms', 'services', 'gallery', 'testimonials', 'partners', 'contact'];
        foreach ($sections as $i => $section) {
            $tenant->siteSections()->updateOrCreate(
                ['section_name' => $section],
                ['is_active' => true, 'sort_order' => $i]
            );
        }

        // Default hotel settings
        $tenant->hotelSettings()->updateOrCreate(
            ['tenant_id' => $tenant->id],
            [
                'hotel_name_ar' => 'فندق جراند الرياض',
                'hotel_name_en' => 'Grand Hotel Riyadh',
                'description_ar' => 'فندق فاخر في قلب الرياض',
                'description_en' => 'A luxury hotel in the heart of Riyadh',
                'star_rating' => 5,
                'currency' => 'SAR',
                'timezone' => 'Asia/Riyadh',
            ]
        );

        // Default contact settings
        $tenant->contactSettings()->updateOrCreate(
            ['tenant_id' => $tenant->id],
            [
                'whatsapp' => '+966500000000',
                'phone' => '+966500000000',
                'email' => 'info@grandhotel.sa',
                'address_ar' => 'الرياض، المملكة العربية السعودية',
                'address_en' => 'Riyadh, Saudi Arabia',
            ]
        );
    }
}
