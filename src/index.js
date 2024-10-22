import express from 'express';
import userRoutes from './routes/user.routes.js';
import autenticationRoutes from './routes/autentication.routes.js';
import membersRoutes from './routes/members.routes.js';
import ProgramsRoutes from './routes/programs.routes.js';
import RolesRoutes from './routes/roles.routes.js';
import technologiesRoutes from './routes/technologies.routes.js';
import menusRoutes from './routes/menus.routes.js';
import teamsRoutes from './routes/teams.routes.js';
import organizationsRoutes from './routes/organizations.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const allowedOrigins = process.env.CORS_ORIGIN.split(',');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware para parsear JSON debe ir antes de las rutas
app.use(express.json());

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


app.use('/user', userRoutes);
app.use('/auth', autenticationRoutes);
app.use('/memb', membersRoutes);
app.use('/prog', ProgramsRoutes);
app.use('/roles', RolesRoutes);
app.use('/tech', technologiesRoutes);
app.use('/menus', menusRoutes);
app.use('/teams', teamsRoutes);
app.use('/orgs', organizationsRoutes);


app.listen(PORT, () => {
    console.log('Server running on port '+ PORT);
});
