const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors({ origin: "*" }));

app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Servir el frontend en la ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rutas de la API
app.get("/canciones", (req, res) => {
  let canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const cancion = req.body;
  let canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

  // Generar un ID autoincremental
  const newId =
    canciones.length > 0 ? canciones[canciones.length - 1].id + 1 : 1;
  const newSong = { id: newId, ...cancion };

  canciones.push(newSong);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));

  res
    .status(201)
    .json({ message: "Canción agregada con éxito!", cancion: newSong });
});

app.put("/canciones/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    let canciones = JSON.parse(fs.readFileSync("repertorio.json"));

    const index = canciones.findIndex((cancion) => Number(cancion.id) === id);
    if (index === -1) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    canciones[index] = { ...canciones[index], ...req.body };
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));
    res.json({
      message: "Canción actualizada con éxito",
      cancion: canciones[index],
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la canción" });
  }
});

app.delete("/canciones/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    let canciones = JSON.parse(fs.readFileSync("repertorio.json"));

    const nuevasCanciones = canciones.filter(
      (cancion) => Number(cancion.id) !== id
    );

    if (canciones.length === nuevasCanciones.length) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    fs.writeFileSync(
      "repertorio.json",
      JSON.stringify(nuevasCanciones, null, 2)
    );
    res.send("Canción eliminada con éxito!");
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la canción" });
  }
});

// Iniciar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
