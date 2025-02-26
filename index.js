
const express = require('express');
const fs = require('fs');

const app = express();


app.use(express.json())

app.listen(3000, () => {
    console.log("Servidor iniciado")
})

app.get("/", (req, res) =>{
    res.send("Tamara Zapata G")
});


app.get("/canciones", (req, res) => {
    let canciones = JSON.parse(fs.readFileSync('canciones.json', 'utf8'));
    res.json(canciones);
});

app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    canciones.push(cancion);
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send("Canción agregada con éxito!");
});

app.put("/canciones/:id", (req, res) => {
    const id  = req.params.id;
    const cancionAModificar = req.body;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));

    let indexCancionAModificar = canciones.findIndex(cancion => cancion.id == id);

    if (indexCancionAModificar === -1) {
        return res.status(404).send("Canción no encontrada");
    }

    canciones[indexCancionAModificar] = cancionAModificar;
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send("Canción Modificada con éxito!");

})

app.delete("/canciones/:id", (req, res) => {
    const id  = req.params.id;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    
    let indexCancionAEliminar = canciones.findIndex(cancion => cancion.id == id);

    canciones.splice(indexCancionAEliminar, 1)
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("Canción Eliminada con éxito!")
})