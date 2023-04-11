import { Router } from "express";
import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from "./app/controllers/ProductController";
import SessionController from "./app/controllers/SessionController";
import CategoryController from "./app/controllers/CategoryController";
import UserController from "./app/controllers/UserController";
import OrderController from "./app/controllers/OrderController";

import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig)

const routes = new Router()

routes.post("/users", UserController.store)

routes.post("/sessions", SessionController.store)

routes.use(authMiddleware)

routes.post("/create-product", upload.single('file'), ProductController.store)
routes.get("/products", ProductController.index)
routes.put("/update-product/:id", upload.single('file'), ProductController.update)

routes.post("/create-category", upload.single('file'), CategoryController.store)
routes.get("/categories", CategoryController.index)
routes.put("/update-category/:id", upload.single('file'), CategoryController.update)

routes.post("/create-order", OrderController.store)
routes.get("/orders", OrderController.index)
routes.put("/update-order/:id", OrderController.update)

export default routes
