<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Multi Tenant | Single MVC Framework | Virtual Column | Database Software For Prototyping Solutions

### Overview
Our software is designed to streamline the prototyping process by eliminating the need for extensive database planning upfront. By utilizing virtual columns, you gain unparalleled flexibility in shaping your software without compromising data integrity.

### Core Features
- Simplified Development:
Our single MVC architecture drastically reduces development time by eliminating the need for individual model, controller, validation, and view files for each resource. Navigation and routing intelligently determine the necessary database connections.

- Dynamic Data Structures:
Virtual columns empower you to create diverse data structures on-the-fly. Input data is preserved in its original form, ensuring data consistency.

- Advanced Data Management:
Our single MVC routing system offers robust control over data retrieval through query parameters. Easily sort, paginate, filter, and search your data to meet specific requirements.

- Multi-Tenancy:
Securely manage multiple prototyping databases within a single instance. Our multi-tenant technology and boilerplate code ensure data isolation and user access control.

### Focus on Front-End Development
This software is specifically engineered to accelerate front-end development. By handling the backend complexities, you can devote more time to crafting exceptional user experiences and prototyping front-end. Our reusable front-end logic components and customizable framework provide a solid foundation for efficient development.

### Modular and Scalable Architecture
Our domain-driven and modular approach promotes code organization and maintainability. Easily integrate new technologies or modify existing components without disrupting the core framework. Our service provider system allows for seamless addition or removal of functionalities.

#### In essence, our software provides a robust and efficient platform for rapid prototyping, enabling you to focus on innovation and user experience while we handle the underlying infrastructure.

### Tech Stack

This project contains various front-end solutions including boilerplate projects for React, Vue3, and Livewire.

You may find different project combinations. such as
- NextJS - React - Mantine
- Quasar - Vue3 -  - Laravel
- Filament - Livewire - Alpine JS
- Remix - Tailwind (Still on progress)
- Express JS (On progress)
- Flutter (Soon)
- Angular (Soon)

It utilizes popular state management
- Pinia
- Redux-Toolkit

Currently supported prototype software.
- CRM (Currently prototyped)
- Issue Tracking (Soon)
- Project Management (Soon)
- E-Commerce (Soon)
- CMS and Blog (Soon)
- ERP (Major Project - Soon)

Notable Technology used
...

Source:
- Multi-tenant(Filament Tenant Management Boilerplate): Modules/Multitenancy
- Vue3 - Quasar Front-end: Modules/Vue/quasar
- React - Mantine - Next Front-end: Modules/React/mantine
- Single MVC: Modules/CustomEntity
- Filament - Livewire: Modules/Filament | Modules/Multitenancy/app/Filament

### Multi-Tenant And Lemonshop CRM installation

1. Create central database and configure on env
DB_DATABASE=central_database
DB_USERNAME=root
DB_PASSWORD=

2. Run migration
- php artisan central:migrate [deprecated] or
- php artisan migrate -–path=Modules/Multitenancy/database/migrations [deprecated] or
- php artisan module:migrate Multitenancy [deprecated]

- Just make migration using <b>php artisan migrate</b>

3. Then create an admin user on your console
<br/><b>php artisan make:filament-user</b>

4. Add your central domain on env
<br/>CENTRAL_DOMAIN="central-domain.test|my-central-domain.com"

5. Create Tenant. Login your credentials on your central domain and create a tenant.
<br/><b>{central domain}/central/tenants/create</b>
- Set id as your tenant key
- Set database username and password to ensure seperate connection for your tenant databse.

6. Setup Domain following tenant
<br/><b>{central domain}/central/domains</b>
Subdomain format - test (sailosoft.test)
Domain format- test.sailosoft.test

7. setup your subdomain or domain pointing to the instance of this software.

8. Tenant Migration
 php artisan tenants:migrate --tenants={tenant id}

9. Seed users table seeder
- php artisan tenants:run “db:seed” –option=”class=UserTableSeeder” (if does not work on production try the command below)
- php artisan tenants:run db:seed

10. Go Login to tenant using seed accounts
<br/> <b>admin@lemoncrm.shop</b>
<br/> <b>0ZGGg3DoMM</b>

### Seed Custom Entity for CRM
11. Seed custom entity
- php artisan tenants:run "module:seed" --argument="module=CustomEntity" --option="class=CRMCustomEntitySeeder"

12. Install table. It creates a table based on custom entity.
- php artisan custom-entity:schema


13. Seeder example data for CRM
- Run php artisan tenants:run "module:seed" --argument="module=CustomEntity" --option="class=CRMCustomAppSeeder"

14. Enjoy! More features to come.
