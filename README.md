<div align="center">

<img src="frontend/public/imagenes/logo.png" alt="Logo Aprendo Contigo" width="140" />

# 📚 Aprendo Contigo

**Plataforma de refuerzo académico personalizado para estudiantes de preescolar a octavo grado.**

Proyecto final del programa **Jóvenes Creativos**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)

</div>

---

## ✨ Sobre el proyecto

**Aprendo Contigo** es un emprendimiento educativo de Barranquilla que acompaña a cada estudiante con un proceso personalizado, dinámico y adaptado a sus necesidades. Este sitio web presenta la propuesta, sus servicios, beneficios, misión, visión y valores, y permite a los acudientes solicitar información directamente.

### Funcionalidades

- 🏠 **Landing page** con Hero, beneficios, nosotros, áreas académicas y testimonios.
- 📖 **Catálogo de servicios**, **promociones** y **reconocimientos** cargados desde la API.
- 🧮 **Plan personalizado**: el usuario arma su combinación de servicios y ve el total.
- 📩 **Formulario de contacto** con validaciones. Guarda la solicitud en MongoDB y la envía por correo con Formspree.
- 🔐 **Panel de administración** (`/admin`) con inicio de sesión JWT y CRUD de servicios, promociones y reconocimientos.
- 📱 Diseño **responsive** para celular, tablet y escritorio.

---

## 🛠️ Tecnologías

| Capa | Herramientas |
|------|--------------|
| Frontend | React 18, React Router, Vite |
| Backend | Node.js, Express 5, Mongoose, Zod |
| Base de datos | MongoDB |
| Autenticación | JSON Web Tokens + bcryptjs |
| Formularios | Formspree |

---

## 📁 Estructura

```
aprendo-contigo/
├── backend/
│   ├── controllers/     # Lógica de cada recurso
│   ├── middleware/      # Autenticación y permisos (JWT)
│   ├── modelos/         # Esquemas de Mongoose
│   ├── validators/      # Validaciones con Zod
│   ├── datos/           # Datos iniciales (servicios, promociones, reconocimientos)
│   ├── routes.js        # Rutas de la API (/api/...)
│   └── server.js        # Servidor Express
└── frontend/
    ├── public/          # Imágenes y estilos
    └── src/
        ├── api/         # Cliente HTTP
        ├── components/  # Secciones de la landing y del panel admin
        ├── context/     # Contexto de autenticación
        ├── hooks/       # Lógica reutilizable (formulario, CRUD, etc.)
        └── pages/       # LandingPage y AdminPage
```

---

## 🚀 Cómo correrlo

### Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- MongoDB local o en Atlas. Si tienes Docker, puedes levantar una local así:

  ```bash
  docker run -d --name aprendo-mongo -p 27017:27017 -v aprendo-mongo-data:/data/db mongo:7
  ```

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # y llena los valores
npm run dev
```

Variables de `backend/.env`:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `MONGO_URI` | Conexión a MongoDB | `mongodb://127.0.0.1:27017/aprendo_contigo` |
| `FRONTEND_URLS` | Orígenes permitidos por CORS (separados por coma) | `http://localhost:5173,http://localhost:3000` |
| `JWT_SECRET` | Clave para firmar los tokens | una cadena larga y aleatoria |

**Cargar datos iniciales** (servicios, promociones y reconocimientos):

```bash
node cargarServicios.js
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre 👉 **http://localhost:5173**

En desarrollo, Vite reenvía `/api` al backend en `http://localhost:3000`. Si tu backend corre en otro puerto:

```bash
API_PROXY_TARGET=http://localhost:3001 npm run dev
```

Variables opcionales de `frontend/.env`:

| Variable | Descripción | Por defecto |
|----------|-------------|-------------|
| `VITE_API_URL` | URL base de la API | `/api` (usa el proxy) |
| `VITE_FORMSPREE_URL` | Endpoint de Formspree del formulario | `https://formspree.io/f/mgojjywg` |

### 3. Producción

```bash
cd frontend && npm run build
cd ../backend && npm run dev
```

Express sirve el build de `frontend/dist` y la API en `/api` desde el mismo puerto.

---

## 🔌 API

Todas las rutas van con el prefijo `/api`. 🔒 = requiere token de administrador.

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/auth/login` | Iniciar sesión |
| `POST` | `/users` | Registrar usuario |
| `GET` | `/users` | Listar usuarios 🔒 |
| `GET` | `/products` | Listar servicios |
| `POST` `PUT` `DELETE` | `/products[/:id]` | Administrar servicios 🔒 |
| `GET` | `/promotions` | Listar promociones |
| `POST` `PUT` `DELETE` | `/promotions[/:id]` | Administrar promociones 🔒 |
| `GET` | `/recognitions` | Listar reconocimientos |
| `POST` `PUT` `DELETE` | `/recognitions[/:id]` | Administrar reconocimientos 🔒 |
| `POST` | `/contactos` | Registrar una solicitud de contacto |

> 💡 **Crear un administrador:** registra un usuario con `POST /api/users` y luego cambia su campo `rol` a `"admin"` en MongoDB.

---

## 📜 Historial de desarrollo

<details>
<summary><b>📌 Commit 1: Estructura inicial del proyecto</b></summary>

Se creó la estructura base del proyecto web "Aprendo Contigo".

Se desarrolló el archivo `index.html` con la estructura principal del sitio: el encabezado (Header) con el nombre del proyecto y el menú de navegación, la sección principal (Hero) con la presentación del servicio y botones de acción, la sección de beneficios y la sección "¿Quiénes somos?", donde se describe el proyecto y su fundadora. También se implementaron las secciones de misión, visión y valores.

Además, se organizó el proyecto en carpetas: imágenes (`img`), estilos (`css`) y scripts (`js`).

</details>

<details>
<summary><b>📌 Commit 2: Finalización y organización del contenido HTML</b></summary>

Se completó la estructura HTML con etiquetas semánticas (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) y una correcta indentación.

- Se finalizaron las secciones de **Áreas Académicas** y **Catálogo de Servicios**.
- Se agregaron las **clases individuales**, **paquetes de aprendizaje**, **servicios adicionales**, **reconocimientos** y **promociones**.
- Se incorporó la sección de **Testimonios**.
- Se añadió la sección del **Asistente IA**, preparada para su futura implementación.
- Se desarrolló la sección de **Contacto** con validaciones HTML (`required`, `pattern`, `maxlength`, `minlength`) y conexión con Formspree.
- Se creó la sección de **Iniciar sesión**.
- Se implementó el **Footer** con información institucional y redes sociales.
- Se integraron imágenes, el video institucional y demás recursos multimedia.

Con este commit se terminó la etapa de HTML.

</details>

<details>
<summary><b>📌 Commit 3: Diseño visual y estilos CSS</b></summary>

- Diseño del encabezado, menú de navegación y Hero.
- Estilos personalizados para todas las secciones.
- Tarjetas con sombras, bordes degradados, animaciones y efectos hover.
- Diseño de **Quiénes somos**, áreas académicas, catálogo de servicios y testimonios.
- Tipografía Poppins e identidad visual en morado, azul y verde.
- Fondo personalizado con marca de agua del logo.
- Adaptación responsive para diferentes dispositivos.

</details>

<details>
<summary><b>📌 Commit 4: Corrección responsive para tablet y celular</b></summary>

- Corrección y optimización de las media queries.
- Ajuste del rango responsive para iPad, iPad Pro, Galaxy Tab y otras tablets.
- Mejor distribución del menú de navegación.
- Corrección de imágenes y secciones que se recortaban.
- Ajustes de grid, flex, márgenes y paddings en pantallas medianas y pequeñas.

</details>

<details>
<summary><b>📌 Commit 5: Funcionalidades con JavaScript</b></summary>

- Menú hamburguesa responsive para celulares.
- Validación del formulario en tiempo real.
- Manipulación del DOM para crear y modificar elementos dinámicamente.
- Event listeners para clics, escritura y envío de formularios.

</details>

<details>
<summary><b>📌 Commit 6: Función básica en JavaScript</b></summary>

Práctica de la clase del 1 de agosto: una sección interactiva que permite agregar servicios académicos seleccionados por el usuario, actualizando automáticamente la lista y el valor total con manipulación del DOM y eventos.

</details>

<details>
<summary><b>📌 Commit 7: Backend y conexión con MongoDB</b></summary>

- Creación de la carpeta **Backend** separada del frontend.
- Servidor con **Node.js y Express**, conectado a **MongoDB** con **Mongoose**.
- Modelos para **servicios**, **promociones**, **reconocimientos** y **contactos**.
- Carga de datos iniciales de servicios, promociones y reconocimientos.
- Operaciones **GET, POST, PUT y DELETE** para servicios, promociones y reconocimientos.
- Rutas para registrar y consultar contactos, con estados **Pendiente**, **Contactado** y **Atendido**.
- Pruebas de las rutas y de la comunicación con la base de datos.

</details>

<details>
<summary><b>📌 Commit 8: Refactor del backend y conexión frontend ↔ backend</b></summary>

- Organización del backend en `controllers/` y un archivo de rutas, con prefijo `/api` siguiendo la notación REST.
- Autenticación con **JWT**, roles (`admin` / `user`) y validaciones con **Zod**.
- **Panel de administración** con operaciones CRUD.
- La página pública consume los recursos de la API sin necesidad de iniciar sesión.

</details>

<details>
<summary><b>📌 Commit 9: Migración a React</b></summary>

- Migración del frontend a **React + Vite**, con la landing dividida en componentes.
- Rutas con **React Router** (`/` y `/admin`).
- Lógica separada en hooks (`useContactForm`, `useCrud`, `useProducts`, `usePromotions`, etc.).
- Express sirve el build de producción del frontend.

</details>

---

<div align="center">

Hecho con 💜 para **Aprendo Contigo**: aprender acompañado es aprender mejor.

📧 [aprendocontigo.ace@gmail.com](mailto:aprendocontigo.ace@gmail.com) · 📱 [WhatsApp](https://wa.me/573125730724)

</div>
