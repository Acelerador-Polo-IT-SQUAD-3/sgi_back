import express from 'express';
import indexRoutes from './routes/index.routes.js';
import userRoutes from './routes/user.routes.js';
import autenticationRoutes from './routes/autentication.routes.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON debe ir antes de las rutas
app.use(express.json());

app.use(indexRoutes);
app.use('/user', userRoutes);
app.use('/auth', autenticationRoutes);

app.listen(PORT, () => {
    console.log('Server running on port '+ PORT);
});
