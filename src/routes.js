import { Router } from "express"

const routes = new Router()

routes.get("/", (request, response) => {
    return response.json({message: "hello World"})
})

export default routes
