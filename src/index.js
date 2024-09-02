import express from 'express';
import userRoutes from './routes/user.routes.js';
import autenticationRoutes from './routes/autentication.routes.js';
import membersRoutes from './routes/members.routes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON debe ir antes de las rutas
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8100/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


app.use('/user', userRoutes);
app.use('/auth', autenticationRoutes);
app.use('/memb', membersRoutes);

<<<<<<< HEAD

app.listen(PORT, () => {
    console.log('Server running on port '+ PORT);
});
=======
app.listen(PORT, () => {
    console.log('Server running on port '+ PORT);
});
>>>>>>> da9ab5ad54a5fe78aea84b40632a875727befa31
