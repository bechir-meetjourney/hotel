<?php

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tenant>
 */
class TenantFactory extends Factory
{
    protected $model = Tenant::class;

    public function definition(): array
    {
        $name = fake()->company();
        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . Str::random(4),
            'domain' => null,
            'subdomain' => Str::slug($name),
            'template' => fake()->randomElement(['riyadh', 'madina']),
            'email' => fake()->companyEmail(),
            'phone' => fake()->phoneNumber(),
            'plan' => 'basic',
            'subscription_starts_at' => now(),
            'subscription_ends_at' => now()->addYear(),
            'is_active' => true,
            'settings' => null,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn () => ['is_active' => false]);
    }

    public function expired(): static
    {
        return $this->state(fn () => [
            'subscription_ends_at' => now()->subDay(),
        ]);
    }
}
