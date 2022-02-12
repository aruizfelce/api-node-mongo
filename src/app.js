import express from "express";
import pkg from "../package.json"
import fileupload from "express-fileupload";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";
import { createRoles } from "./libs/initialSetup";


const app = express();
createRoles();

app.set('pkg',pkg);
app.use(express.json()); //para que acepte JSON
app.use(fileupload({
    createParentPath:true,
    limits: {
        fileSize: 1024 * 1024 // 1 MB
    },
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
    responseOnLimit: "El archivo no puede ser mayor de 1Mb"
}));


app.get('/',(req,res)=>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })

});

app.use('/api/products',productsRoutes);
app.use('/api/auth',authRoutes);
app.use("/api/users", usersRoutes);

export default app;