[1mdiff --git a/src/controllers/programs.js b/src/controllers/programs.js[m
[1mdeleted file mode 100644[m
[1mindex 7784a4c..0000000[m
[1m--- a/src/controllers/programs.js[m
[1m+++ /dev/null[m
[36m@@ -1,35 +0,0 @@[m
[31m-import {pool} from '../database.js'[m
[31m-[m
[31m-[m
[31m-export const getItems = async (req, res) => {[m
[31m-    // Lógica para obtener todos los elementos[m
[31m-    //devuelve todos los programas[m
[31m-    try {[m
[31m-        const [result] = await pool.query('SELECT id,name,description,state_id,start_date,end_date FROM programs');[m
[31m-        res.json(result);[m
[31m-    } catch (error) {[m
[31m-        console.error(error);[m
[31m-        res.status(500).json({ message: 'Error al obtener los programas' });[m
[31m-    }[m
[31m-};[m
[31m-[m
[31m-export const getItem = async (req, res) => {[m
[31m-    // Lógica para obtener un elemento[m
[31m-    //requiere id del programa[m
[31m-    //devuelve un programa[m
[31m-    try {[m
[31m-        const { id } = req.params;[m
[31m-        const [result] = await pool.query('SELECT id,name,description,state_id,start_date,end_date FROM programs WHERE id = ?', [id]);[m
[31m-[m
[31m-        if (result.length === 0) {[m
[31m-            return res.status(401).json({ message: 'Usuario no encontrado' });[m
[31m-        }[m
[31m-[m
[31m-        res.json(result[0]);[m
[31m-    } catch (error) {[m
[31m-        console.error(error);[m
[31m-        res.status(500).json({ message: 'Error al obtener el usuario' });[m
[31m-    }[m
[31m-};[m
[31m-[m
[31m-export default { getItems, getItem };[m
\ No newline at end of file[m
[1mdiff --git a/src/controllers/roles.js b/src/controllers/roles.js[m
[1mdeleted file mode 100644[m
[1mindex 0246e3a..0000000[m
[1m--- a/src/controllers/roles.js[m
[1m+++ /dev/null[m
[36m@@ -1,35 +0,0 @@[m
[31m-import {pool} from '../database.js'[m
[31m-[m
[31m-[m
[31m-export const getItems = async (req, res) => {[m
[31m-    // Lógica para obtener todos los elementos[m
[31m-    //devuelve todos los roles[m
[31m-    try {[m
[31m-        const [result] = await pool.query('SELECT id,name FROM roles');[m
[31m-        res.json(result);[m
[31m-    } catch (error) {[m
[31m-        console.error(error);[m
[31m-        res.status(500).json({ message: 'Error al obtener los roles' });[m
[31m-    }[m
[31m-};[m
[31m-[m
[31m-export const getItem = async (req, res) => {[m
[31m-    // Lógica para obtener un elemento[m
[31m-    //requiere id del rol[m
[31m-    //devuelve un rol[m
[31m-    try {[m
[31m-        const { id } = req.params;[m
[31m-        const [result] = await pool.query('SELECT id,name FROM roles WHERE id = ?', [id]);[m
[31m-[m
[31m-        if (result.length === 0) {[m
[31m-            return res.status(401).json({ message: 'rol no encontrado' });[m
[31m-        }[m
[31m-[m
[31m-        res.json(result[0]);[m
[31m-    } catch (error) {[m
[31m-        console.error(error);[m
[31m-        res.status(500).json({ message: 'Error al obtener el rol' });[m
[31m-    }[m
[31m-};[m
[31m-[m
[31m-export default { getItems, getItem };[m
\ No newline at end of file[m
[1mdiff --git a/src/controllers/technologies.js b/src/controllers/technologies.js[m
[1mdeleted file mode 100644[m
[1mindex 2113e2b..0000000[m
[1m--- a/src/controllers/technologies.js[m
[1m+++ /dev/null[m
[36m@@ -1,35 +0,0 @@[m
[31m-import {pool} from '../database.js'[m
[31m-[m
[31m-[m
[31m-export const getItems = async (req, res) => {[m
[31m-    // Lógica para obtener todos los elementos[m
[31m-    //devuelve todas las tecnologias[m
[31m-    try {[m
[31m-        const [result] = await pool.query('SELECT id,name FROM technologies');[m
[31m-        res.json(result);[m
[31m-    } catch (error) {[m
[31m-        console.error(error);[m
[31m-        res.status(500).json({ message: 'Error al obtener las tecnologias' });[m
[31m-    }[m
[31m-};[m
[31m-[m
[31m-export const getItem = async (req, res) => {[m
[31m-    // Lógica para obtener un elemento[m
[31m-    //requiere id de la tecnologia[m
[31m-    //devuelve una tecnologia[m
[31m-    try {[m
[31m-        const { id } = req.params;[m
[31m-        const [result] = await pool.query('SELECT id,name FROM technologies WHERE id = ?', [id]);[m
[31m-[m
[31m-        if (result.length === 0) {[m
[31m-            return res.status(401).json({ message: 'tecnologia no encontrada' });[m
[31m-        }[m
[31m-[m
[31m-        res.json(result[0]);[m
[31m-    } catch (error) {[m
[31m-        console.error(error);[m
[31m-        res.status(500).json({ message: 'Error al obtener la technologia' });[m
[31m-    }[m
[31m-};[m
[31m-[m
[31m-export default { getItems, getItem };[m
\ No newline at end of file[m
[1mdiff --git a/src/index.js b/src/index.js[m
[1mindex b3b4abd..55b3b60 100644[m
[1m--- a/src/index.js[m
[1m+++ b/src/index.js[m
[36m@@ -2,9 +2,6 @@[m [mimport express from 'express';[m
 import userRoutes from './routes/user.routes.js';[m
 import autenticationRoutes from './routes/autentication.routes.js';[m
 import membersRoutes from './routes/members.routes.js';[m
[31m-import Programs from './routes/programs.routes.js';[m
[31m-import Roles from './routes/roles.routes.js';[m
[31m-import technologies from './routes/technologies.routes.js';[m
 import cors from 'cors';[m
 [m
 const app = express();[m
[36m@@ -23,9 +20,7 @@[m [mapp.use(cors({[m
 app.use('/user', userRoutes);[m
 app.use('/auth', autenticationRoutes);[m
 app.use('/memb', membersRoutes);[m
[31m-app.use('/prog', Programs);[m
[31m-app.use('/roles', Roles);[m
[31m-app.use('/tech', technologies);[m
[32m+[m
 [m
 app.listen(PORT, () => {[m
     console.log('Server running on port '+ PORT);[m
[1mdiff --git a/src/routes/programs.routes.js b/src/routes/programs.routes.js[m
[1mdeleted file mode 100644[m
[1mindex c464528..0000000[m
[1m--- a/src/routes/programs.routes.js[m
[1m+++ /dev/null[m
[36m@@ -1,14 +0,0 @@[m
[31m-import { Router } from "express";[m
[31m-const router = Router()[m
[31m-import { getItems, getItem} from'../controllers/programs.js';[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-router.get(`/`, getItems)[m
[31m-[m
[31m-router.get(`/:id`, getItem);[m
[31m-[m
[31m-export default router[m
\ No newline at end of file[m
[1mdiff --git a/src/routes/roles.routes.js b/src/routes/roles.routes.js[m
[1mdeleted file mode 100644[m
[1mindex 7c3832e..0000000[m
[1m--- a/src/routes/roles.routes.js[m
[1m+++ /dev/null[m
[36m@@ -1,14 +0,0 @@[m
[31m-import { Router } from "express";[m
[31m-const router = Router()[m
[31m-import { getItems, getItem} from'../controllers/roles.js';[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-router.get(`/`, getItems)[m
[31m-[m
[31m-router.get(`/:id`, getItem);[m
[31m-[m
[31m-export default router[m
\ No newline at end of file[m
[1mdiff --git a/src/routes/technologies.routes.js b/src/routes/technologies.routes.js[m
[1mdeleted file mode 100644[m
[1mindex 3abce7c..0000000[m
[1m--- a/src/routes/technologies.routes.js[m
[1m+++ /dev/null[m
[36m@@ -1,14 +0,0 @@[m
[31m-import { Router } from "express";[m
[31m-const router = Router()[m
[31m-import { getItems, getItem} from'../controllers/technologies.js';[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-router.get(`/`, getItems)[m
[31m-[m
[31m-router.get(`/:id`, getItem);[m
[31m-[m
[31m-export default router[m
\ No newline at end of file[m
