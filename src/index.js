import express from 'express';
import userRoutes from './routes/user.routes.js';
import autenticationRoutes from './routes/autentication.routes.js';
import membersRoutes from './routes/members.routes.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON debe ir antes de las rutas
app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', autenticationRoutes);
app.use('/memb', membersRoutes);



app.listen(PORT, () => {
    console.log('Server running on port 3000');
});
