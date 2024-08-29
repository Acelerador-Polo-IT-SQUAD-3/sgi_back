import express from 'express';
import indexRoutes from './routes/index.routes.js';
import userRoutes from './routes/user.routes.js';
import autenticationRoutes from './routes/autentication.routes.js';
import membersRoutes from './routes/members.routes.js';


const app = express();

// Middleware para parsear JSON debe ir antes de las rutas
app.use(express.json());

app.use(indexRoutes);
app.use('/user', userRoutes);
app.use('/auth', autenticationRoutes);
app.use('/memb', membersRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
