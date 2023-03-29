import { Router } from "express";
import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from "./app/controllers/ProductController";
import SessionController from "./app/controllers/SessionController";
import CategoryController from "./app/controllers/CategoryController";
import UserController from "./app/controllers/UserController";

import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig)

const routes = new Router()

routes.post("/users", UserController.store)

routes.post("/sessions", SessionController.store)

routes.use(authMiddleware)

routes.post("/create-product", upload.single('file'), ProductController.store)
routes.get("/products", ProductController.index)

routes.post("/create-category", CategoryController.store)
routes.get("/categories", CategoryController.index)

export default routes
