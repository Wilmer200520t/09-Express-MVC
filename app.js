import express  from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import taskControlers from "./controllers/taskControlers.js";
import error from "./controllers/error.js";

//especificar la ruta del proyecto con epmmmascript
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app=express();
const port=3000;

//uso de librerias de express
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));// para mostar en el log en modo dev

app.set("views",path.join(__dirname,"views"));//carpeta de vistas
app.set("view engine","pug");//define pug como motor de vistas
app.use(express.static(path.join(__dirname, "public"))); //pasarle url de la carpeta publica

app.use(express.json()); //los datos se ... en formato json
app.use(express.urlencoded({ extended:false}));

//trabaja como un switch
app.get("/",taskControlers.getAllTask)
app.get("/add",taskControlers.getAddTaskForm)
app.post("/add",taskControlers.addTask)
app.get("/edit/:id",taskControlers.geteditTaskForm)
app.post("/edit/:id",taskControlers.editTask)
app.get("/completed/:id",taskControlers.completedTask)
app.get("/uncompleted/:id",taskControlers.uncompletedTask)
app.get("/delete/:id",taskControlers.deleteTask)
//por eso los errores se definen al ultimo
app.use(error.error404)

//

app.listen(port,()=>{
    console.log(`Runnig App on port http://localhost:${port}`)
});

