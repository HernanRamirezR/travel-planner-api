# Travel Planner API

Backend desarrollado con NestJS, MongoDB y Mongoose para la gestión de planes de viaje y el almacenamiento en caché de información de países obtenida desde la API externa RestCountries.

---

# Tecnologías utilizadas

* NestJS
* MongoDB
* Mongoose
* Docker
* TypeScript
* Axios / HttpModule
* class-validator

---

# Instalación del proyecto

## 1. Clonar el repositorio


git clone <https://github.com/HernanRamirezR/travel-planner-api.git>
cd travel-planner-api


---

## 2. Instalar dependencias


npm install


---

# Configuración de MongoDB

El proyecto utiliza MongoDB ejecutándose localmente mediante Docker.



## 1. Crear el contenedor


docker run -d \
  --name mongo-travel-planner \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  mongo


---

## 2. Verificar que el contenedor esté ejecutándose


docker ps


---

# Ejecución del proyecto

## Ejecutar el proyecto


npm run start


El servidor quedará disponible en:

http://localhost:3000


---

# Arquitectura interna

El proyecto está dividido en dos módulos principales:

## CountriesModule

Responsable de:

* Consultar la API externa RestCountries.
* Almacenar países localmente en MongoDB.
* Implementar el sistema de caché.
* Exponer internamente CountriesService.

### Componentes principales

#### RestCountriesProvider

Provider especializado encargado únicamente de consumir la API externa RestCountries.

#### CountriesService

Contiene la lógica de caché:

1. Busca el país en MongoDB.
2. Si existe, retorna el país almacenado localmente.
3. Si no existe, consulta RestCountries.
4. Guarda el resultado en MongoDB.
5. Retorna el país almacenado.

---

## TravelPlansModule

Responsable de:

* Crear planes de viaje.
* Consultar planes almacenados.
* Eliminar planes.
* Validar que el país destino exista utilizando CountriesService.

### Componentes principales

#### TravelPlansController

Define los endpoints HTTP.

#### TravelPlansService

Contiene la lógica de negocio relacionada con los planes de viaje.

#### DTOs

Se utilizan DTOs con class-validator para validar automáticamente:

* Strings vacíos.
* Fechas inválidas.
* Códigos Alpha-3 inválidos.

---

# Flujo de caché de países

El sistema utiliza un patrón cache-aside.

## Primera consulta de un país

TravelPlansService
        ↓
CountriesService
        ↓
MongoDB (miss)
        ↓
RestCountries API
        ↓
Guardar país en MongoDB
        ↓
Retornar país


---

## Consultas posteriores

TravelPlansService
        ↓
CountriesService
        ↓
MongoDB (hit)
        ↓
Retornar país desde caché


En este caso ya no se realiza una petición a la API externa.

---

# Endpoints disponibles

## Crear plan de viaje

POST /travel-plans


---

## Obtener todos los planes

GET /travel-plans


---

## Obtener un plan por ID

GET /travel-plans/:id


---

## Eliminar un plan

DELETE /travel-plans/:id


---

# Ejemplos de peticiones JSON

## Crear plan de viaje

### Request

POST http://localhost:3000/travel-plans


### Body JSON

{
  "title": "Viaje a Colombia",
  "startDate": "2026-06-01",
  "endDate": "2026-06-10",
  "countryCode": "COL"
}


---

## Crear otro plan

### Body JSON


{
  "title": "Viaje a Estados Unidos",
  "startDate": "2026-07-15",
  "endDate": "2026-07-30",
  "countryCode": "USA"
}


---
En caso de querer conocer el id de un plan, sería necesario primero ejecutar la consulta para obtener todos los planes y consultarlo alli directamente. Esto puede ser usado para el endpoint de consultar un plan en detalle y de eliminar. 

## Eliminar un plan


### Request


DELETE http://localhost:3000/travel-plans/<ID>



Ejemplo:

DELETE http://localhost:3000/travel-plans/6824f0cbb6d1f6c6b5d4d123


---

# Estructura general del proyecto


src/
│
├── countries/
│   ├── providers/
|   |    └── restcountries
|   |         └── restcountries.provider.ts
│   ├── schemas/
|   |    └── country.schema.ts
│   ├── countries.module.ts
│   └── countries.service.ts
│
├── travel-plans/
│   ├── dto/
|   |    └── create-travel-plan.dto.ts
│   ├── schemas/
|   |    └── travel-plan.schema.ts
│   ├── travel-plans.controller.ts
│   ├── travel-plans.module.ts
│   └── travel-plans.service.ts
│
├── app.module.ts
└── main.ts


---

# Notas adicionales

* MongoDB Compass puede utilizarse para visualizar las colecciones y documentos almacenados.
* El proyecto utiliza validación automática mediante ValidationPipe.
* Los países se almacenan localmente únicamente la primera vez que son consultados.
