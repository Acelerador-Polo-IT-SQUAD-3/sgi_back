import express from 'express';
import userRoutes from './routes/user.routes.js';
import autenticationRoutes from './routes/autentication.routes.js';
import membersRoutes from './routes/members.routes.js';
import Programs from './routes/programs.routes.js';
import Roles from './routes/roles.routes.js';
import technologies from './routes/technologies.routes.js';
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
app.use('/prog', Programs);
app.use('/roles', Roles);
app.use('/tech', technologies);

app.listen(PORT, () => {
    console.log('Server running on port '+ PORT);
});
