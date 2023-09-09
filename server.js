import { fastify } from "fastify";
import { DatabasePostgres } from "./database.js";

const PORT = process.env.PORT ?? 3333

const app = fastify()  
const database = new DatabasePostgres()  

app.get('/videos', async (req) => {
    const search = req.query.search
    const videos = await database.list(search)

    return videos
})

app.post('/videos', async (req, reply) => {
    const { title, description, duration } = req.body

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

app.put('/videos/:id', async (req, reply) => {
    const id = req.params.id 
    const { title, description, duration } = req.body

    await database.update(id, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

app.delete('/videos/:id', async (req, reply) => {
    const id = req.params.id

    await database.delete(id)

    return reply.status(204).send()
})

app.listen({
    port: PORT
}, () => {
    console.log(`>> HTTP Server listening on port ${PORT}`)
})