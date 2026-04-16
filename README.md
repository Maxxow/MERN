# Gestión de Productos - Stack MERN

Este proyecto es una aplicación web completa desarrollada con el stack **MERN** (MongoDB, Express, React, Node.js) que permite gestionar un inventario de productos. Incluye funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) y la capacidad de generar reportes en formato PDF.

---

## 🚀 Tecnologías Utilizadas

- **Frontend:**
  - **React.js**: Biblioteca para construir la interfaz de usuario.
  - **Axios**: Cliente HTTP para realizar peticiones al backend.
  - **jsPDF**: Biblioteca para la generación dinámica de documentos PDF.
  - **CSS3 (Glassmorphism)**: Diseño moderno con efectos de desenfoque y transparencias.

- **Backend:**
  - **Node.js**: Entorno de ejecución para Javascript en el servidor.
  - **Express.js**: Framework para la gestión de rutas y servidores API.
  - **Mongoose**: Modelado de objetos para MongoDB.
  - **CORS**: Middleware para permitir peticiones entre diferentes dominios.

- **Base de Datos:**
  - **MongoDB**: Base de datos NoSQL documental.
  - **Docker**: Utilizado para desplegar la base de datos de manera aislada y rápida.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- **Node.js** (v14 o superior) e **npm**.
- **Docker** y **Docker Compose** (para la base de datos).

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd MERN
```

### 2. Configurar la Base de Datos
Inicia el contenedor de MongoDB utilizando el archivo `docker-compose.yml` proporcionado:
```bash
docker-compose up -d
```
Esto levantará una instancia de MongoDB en el puerto `27017`.

### 3. Configurar el Backend
1. Navega a la carpeta backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Revisa el archivo `.env` o asegúrate de que la variable `MONGODB_URI` apunte a `mongodb://localhost:27017/miBaseDatos`.
4. Inicia el servidor:
   ```bash
   npm start
   ```
   *El servidor correrá en `http://localhost:5000`.*

### 4. Configurar el Frontend
1. Abre una nueva terminal y navega a la carpeta frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación React:
   ```bash
   npm start
   ```
   *La aplicación se abrirá en `http://localhost:3000`.*

---

## 📖 Manual de Usuario

### 1. Agregar un Producto
- En la interfaz principal, verás dos campos de texto: **Nombre del producto** y **Precio**.
- Ingresa los datos correspondientes y haz clic en el botón **"Agregar"**.
- El producto aparecerá automáticamente en la lista inferior.

### 2. Editar un Producto
- En la lista de productos, localiza el producto que deseas modificar.
- Haz clic en el botón **"Editar"**.
- Los datos del producto se cargarán en los campos superiores.
- Modifica los valores y haz clic en **"Actualizar"** (o en "Cancelar" si decides no realizar cambios).

### 3. Eliminar un Producto
- Haz clic en el botón **"Eliminar"** junto al producto que desees borrar.
- Se mostrará una alerta de confirmación; acepta para eliminar permanentemente el registro.

### 4. Generar Reporte PDF
- Si hay productos en la lista, aparecerá un botón llamado **"Generar Reporte PDF"**.
- Al hacer clic, se descargará un archivo llamado `reporte_productos.pdf` que contiene la lista actual de productos con sus precios y la fecha de generación.

---

## 💻 Funcionamiento del Código

### Estructura de Proyecto
- **`/backend`**: Contiene la lógica del servidor.
  - `server.js`: Punto de entrada, configuración de middlewares y conexión a la base de datos.
  - `/models/Producto.js`: Definición del esquema de datos (nombre y precio) usando Mongoose.
  - `/routes/productos.js`: Definición de los endpoints de la API (GET, POST, PUT, DELETE).
- **`/frontend`**: Contiene la interfaz de usuario.
  - `src/App.js`: Componente principal que maneja el estado de la aplicación, las llamadas a la API y la lógica de generación del PDF.
  - `src/App.css`: Estilos visuales con un enfoque estético premium.

### Flujo de Datos
1. El **Usuario** interactúa con el frontend en React.
2. **React** utiliza **Axios** para enviar peticiones HTTP al servidor **Express**.
3. El servidor **Express** procesa la petición y se comunica con la base de datos **MongoDB** a través de **Mongoose**.
4. La respuesta de la base de datos regresa al servidor y luego al frontend, donde el estado de React se actualiza y refresca la interfaz visualmente.
