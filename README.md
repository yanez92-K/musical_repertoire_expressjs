## Musical Repertoire API

### Descripción
Esta es una aplicación web simple desarrollada con **Node.js** y **Express.js** que permite administrar un repertorio musical. Proporciona una API REST para agregar, editar, eliminar y listar canciones, junto con una interfaz de usuario sencilla para gestionar el repertorio.

### Tecnologías utilizadas
- **Node.js**
- **Express.js**
- **CORS**
- **Axios** (frontend)
- **Bootstrap** (frontend)

### Instalación y ejecución
#### 1. Clonar el repositorio
```sh
 git clone https://github.com/tamarazapata/musical_repertoire_expressjs.git
 cd musical_repertoire_expressjs
```
#### 2. Instalar dependencias
sh
 npm install
#### 3. Ejecutar la aplicación
Para correr el servidor en modo desarrollo:

```sh
 npm run dev
```
Para correr en modo producción:

```sh
 npm start
```
El servidor se ejecutará en http://localhost:3000.

## Endpoints de la API
Obtener todas las canciones

GET ``` /canciones ```
```json
{
  "id": "9999",
  "titulo": "Song Name",
  "artista": "Artist Name",
  "tono": "C"
}
```

Agregar una nueva canción

POST ```/canciones```
```json
{
  "id": "9999",
  "titulo": "Song Name",
  "artista": "Artist Name",
  "tono": "C"
}
```
Editar una canción existente

PUT ```/canciones/:id```
```json
{
  "titulo": "Updated Song Name",
  "artista": "Updated Artist Name",
  "tono": "G"
}
```
Eliminar una canción

DELETE ```/canciones/:id```

## Interfaz de usuario

El frontend se sirve desde ```public/index.html```, permitiendo la gestión del repertorio mediante formularios y botones para agregar, editar y eliminar canciones.

## Autoras
* Pamela Yáñez y Tamara Zapata

