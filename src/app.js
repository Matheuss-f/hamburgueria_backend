import express from 'express';
import routes from './routes';
import { resolve } from 'path';

import './dataBase';
class App {
  constructor () {
    this.app = express()

    this.middlwares()
    this.routes()
  }

  middlwares () {
    this.app.use(express.json())
    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')))
    this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')))
  }

  routes () {
    this.app.use(routes)
  }
}

export default new App().app
