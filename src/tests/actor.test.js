const request = require('supertest')
const app = require('../app')

let actorId //declaracion de la variable

const actor = {
    firstName: 'Juan',
    lastName: 'Lopez',
    nationality: 'Colombian',
    image: 'Lorem',
    birthday: '2012-02-10'
}

const BASE_URL= '/api/v1/actors'

test("POST -> 'BASE_URL', should return statusCode 201 and res.body.firstName === actor.firstName", async () => {

    const res = await request(app)
        .post(BASE_URL) //Ruta
        .send(actor) //variable actor

    actorId = res.body.id //asignacion de la variable 
        
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

test("GET -> 'BASE_URL', should return statusCode 200 and res.body to hav length = 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET -> 'BASE_URL/:id', should return statusCode 200 and res.body.firstName === actor.firstName", async () => {
    
    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

test("PUT -> 'BASE_URL/:id', should return statusCode 200 and res.body.firstName === actorUpdate.firstName", async () => {
    const actorUpdate = {
        firstName: 'Diego'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});

test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
});