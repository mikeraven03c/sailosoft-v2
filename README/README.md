The purpose of this software is to make prototyping much easier without the actual database planning. It provides flexibility in prototyping software using virtual columns.

It uses a single MVC approach. You do not need to create a Model, controller, validation files, and views for each resource. It uses navigation and routing to identify which database table it needs to connect. Utilizing a virtual column any entity can have any form depending on what data you inputted and it is the same data you get when you fetch it.

Single MVC routing is flexible in that you can manage the result of data through query parameters of routing. You can sort, paginate, filter data by search, and filter by column data based on what you need.


Multi-Tenant - this utilization of multi-tenant technology and boilerplate for maintaining tenants and domain. With a single instance, you can accommodate multiple access to different prototyping databases and accommodate a handful of users on each of their domains isolating their data with each database.


Database Software for Prototype Solutions - The primary purpose of this software is to seamlessly prototype software so that you can focus more on designing the front end. Front-end solutions provide a reusable logic wrap in classes and functions that can be reused in different components. The front end is highly customizable and manageable through wrap logic.

This software follows domain domain-driven and modular approach. It is utilized to segregate logic, components, and purpose. It can easily port new technology and logic without major changes to the framework. You can port in and remove the services you don't want to use or will be removed in the future by removing the registration of the service provider for each module. routes, migrations, databases, and views are removed.

The version is much easier to upgrade the framework.

This project contains various front-end solutions including boilerplate projects for React, Vue3, and Livewire.

You may find different project combinations. such as
## NextJS - React - Mantine
## Quasar - Vue3 -  - Laravel
## Filament - Livewire - Alpine JS
## Remix - Tailwind (Still on progress)
## Express JS (On progress)
## Flutter (Soon)
## Angular (Soon)


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
Laravel Multitenancy


Setup and installation:

## Installation
> Create central database and configure on env

> Run migration
[deprecated]
Run php artisan central:migrate or
php artisan migrate -–path=Modules/Multitenancy/database/migrations
Or  php artisan module:migrate Multitenancy –force

Just make migration using php artisan migrate

> Then Create a admin user
php artisan make:filament-user

> Add CENTRAL_DOMAIN on env
CENTRAL_DOMAIN="sailosoft-v2.test"

> Create Tenant
/central/tenants/create
Set id as tenant key
Set database username and password

> Setup Domain following tenant
Subdomain - test(sailosoft.test)
Domain - test.sailosoft.test

> setup domain look up on your server

> Tenant Migration
 php artisan tenants:migrate --tenants={tenant name}

> Seeding
php artisan tenants:run “db:seed” –option=”class=UserTableSeeder” (if does not work on production)
Php artisan tenants:run db:seed


> Login to tenant using seed accounts
admin@lemoncrm.shop
0ZGGg3DoMM
> Seed custom entity
 php artisan tenants:run "module:seed" --argument="module=CustomEntity" --option="class=CRMCustomEntitySeeder"

> Install table. It create table scheba in database
Run php artisan custom-entity:schema


> Seeder example data for CRM
Run php artisan tenants:run "module:seed" --argument="module=CustomEntity" --option="class=CRMCustomAppSeeder"





