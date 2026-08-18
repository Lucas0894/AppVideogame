# 🎮 Videogame App

Aplicación web de videojuegos desarrollada con React, Redux, Node.js, Express, Sequelize y PostgreSQL.

Videogame App permite explorar videojuegos, buscar títulos por nombre, filtrar por género y origen, ordenar resultados, consultar información detallada y agregar nuevos videojuegos a la plataforma.

La aplicación combina información obtenida desde una API externa con videojuegos creados y almacenados en una base de datos propia.

---

## ✨ Funcionalidades

### 🏠 Inicio

- Landing page de presentación.
- Imagen representativa de la aplicación.
- Acceso directo al listado principal de videojuegos.

### 🔎 Búsqueda

- Búsqueda de videojuegos por nombre.
- Integración con RAWG API.
- Visualización de videojuegos provenientes de la API y de la base de datos.
- Manejo de búsquedas sin resultados.

### 🎮 Exploración de videojuegos

El listado principal permite visualizar información relevante de cada videojuego:

- Imagen.
- Nombre.
- Géneros.

Los videojuegos pueden provenir tanto de RAWG como de la base de datos propia.

### 🧩 Filtros

Los videojuegos pueden filtrarse según diferentes criterios:

- Género.
- Videojuegos provenientes de la API.
- Videojuegos creados dentro de la aplicación.

### ↕️ Ordenamiento

La aplicación permite ordenar los videojuegos según diferentes criterios:

- Nombre de A-Z.
- Nombre de Z-A.
- Rating de menor a mayor.
- Rating de mayor a menor.

### 📄 Paginación

Sistema de paginación para organizar los resultados y facilitar la navegación entre los diferentes videojuegos.

Cada página muestra un conjunto limitado de videojuegos para mejorar la experiencia de usuario y el rendimiento de la aplicación.

### 📖 Detalle de videojuego

Cada videojuego cuenta con una vista detallada que incluye:

- Imagen.
- Nombre.
- Géneros.
- Descripción.
- Fecha de lanzamiento.
- Rating.
- Plataformas.

### ➕ Crear videojuegos

Los usuarios pueden agregar nuevos videojuegos mediante un formulario controlado.

El formulario permite ingresar:

- Nombre.
- Descripción.
- Fecha de lanzamiento.
- Rating.
- Uno o varios géneros.
- Una o varias plataformas.

Los datos son validados mediante JavaScript antes de ser enviados al backend.

Los videojuegos creados quedan almacenados en PostgreSQL y posteriormente se muestran junto con los videojuegos obtenidos desde RAWG.

---

## 🌐 Integración con RAWG API

La aplicación utiliza [RAWG Video Games Database API](https://rawg.io/apidocs) para obtener información sobre videojuegos.

Los datos obtenidos son procesados dentro de la aplicación para implementar funcionalidades como:

- Búsqueda.
- Filtrado.
- Ordenamiento.
- Paginación.
- Consulta de detalles.

La aplicación combina los datos externos con los videojuegos almacenados en su propia base de datos.

---

## 🗄️ Base de datos

La aplicación utiliza PostgreSQL como sistema de almacenamiento y Sequelize como ORM.

### Videojuego

Cada videojuego almacena información como:

| Campo | Descripción |
|---|---|
| ID | Identificador del videojuego |
| Nombre | Nombre del videojuego |
| Descripción | Información del videojuego |
| Fecha de lanzamiento | Fecha de lanzamiento |
| Rating | Valoración del videojuego |
| Plataformas | Plataformas disponibles |

### Género

Cada género contiene:

| Campo | Descripción |
|---|---|
| ID | Identificador del género |
| Nombre | Nombre del género |

Los videojuegos y géneros mantienen una relación muchos a muchos, permitiendo que un videojuego pueda pertenecer a diferentes géneros.

Por ejemplo:

`Counter Strike → Shooter + Action`

---

## 🔌 Backend

El backend fue desarrollado con Node.js y Express mediante una API REST.

### Endpoints principales

| Método | Endpoint | Descripción |
|:---:|---|---|
| `GET` | `/videogames` | Obtiene el listado de videojuegos |
| `GET` | `/videogames?name=...` | Busca videojuegos por nombre |
| `GET` | `/videogame/:id` | Obtiene el detalle de un videojuego |
| `POST` | `/videogames` | Crea un nuevo videojuego |
| `GET` | `/genres` | Obtiene los géneros disponibles |

---

## ⚛️ Frontend

El frontend está desarrollado con React y Redux.

La aplicación cuenta con diferentes vistas:

- Landing Page.
- Home.
- Detalle de videojuego.
- Creación de videojuego.

Redux se utiliza para gestionar el estado global de la aplicación y facilitar el manejo de:

- Videojuegos.
- Búsquedas.
- Filtros.
- Ordenamientos.
- Géneros.
- Paginación.

---

## 🛠️ Tecnologías

### Frontend

- React
- Redux
- React Router
- JavaScript
- CSS

### Backend

- Node.js
- Express
- Sequelize
- PostgreSQL

### API

- RAWG API

### Herramientas

- Git
- GitHub
- Postman

### Testing

- Testing de componentes del frontend.
- Testing de rutas del backend.
- Testing de modelos de base de datos.

---

## 📂 Estructura del proyecto

```text
Videogame-App/
│
├── client/
│   └── src/
│       ├── components/
│       ├── views/
│       ├── redux/
│       └── ...
│
├── api/
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── models/
│       └── ...
│
└── README.md
```

---

## ⚙️ Instalación

### Requisitos

Antes de comenzar, asegurate de tener instalado:

- Node.js
- npm
- PostgreSQL

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

### 2. Ingresar al proyecto

```bash
cd Videogame-App
```

### 3. Instalar dependencias del backend

```bash
cd api
npm install
```

### 4. Instalar dependencias del frontend

```bash
cd ../client
npm install
```

### 5. Configurar la base de datos

Crear una base de datos PostgreSQL llamada:

```text
videogames
```

### 6. Configurar variables de entorno

Crear un archivo `.env` dentro de la carpeta `api`:

```env
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
DB_NAME=videogames
DB_PORT=5432

RAWG_API_KEY=tu_api_key
```

Reemplazá los valores correspondientes con tus credenciales de PostgreSQL y tu API Key de RAWG.

> El archivo `.env` contiene información sensible y no debe subirse al repositorio.

### 7. Ejecutar el backend

Desde la carpeta `api`:

```bash
npm start
```

### 8. Ejecutar el frontend

Abrí una nueva terminal y ejecutá:

```bash
cd client
npm start
```

La aplicación estará disponible en el puerto configurado por el servidor de desarrollo.

---

## 🧪 Testing

El proyecto incluye pruebas para diferentes partes de la aplicación:

- Componentes del frontend.
- Rutas del backend.
- Modelos de la base de datos.

---

## 🎯 Sobre el proyecto

Videogame App es un proyecto Full Stack que integra frontend, backend, base de datos y una API externa.

El proyecto combina React y Redux para construir una interfaz dinámica, Node.js y Express para desarrollar una API REST, Sequelize y PostgreSQL para la persistencia y las relaciones entre entidades, y RAWG API para obtener información sobre videojuegos.

Entre sus principales funcionalidades se encuentran la búsqueda de videojuegos, filtrado por género y origen, ordenamiento por nombre y rating, paginación, consulta de detalles y creación de nuevos videojuegos.
