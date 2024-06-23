const request = require('supertest')
const app = require('../app')

let directorId //declaracion de la variable

const director = {
    firstName: 'Pedro',
    lastName: 'Perez',
    nationality: 'Italiano',
    image: 'Lorem',
    birthday: '1991-04-12'
}

const BASE_URL = '/api/v1/directors'

test("POST -> 'BASE_URL', should return statusCode 201 and res.body.firstName === director.firstName", async () => {
    
    const res = await request(app)
        .post(BASE_URL) //RUTA
        .send(director) //variabe ruta
        
    directorId = res.body.id //asignacion de la variable 

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

test("GET -> 'BASE_URL', should return statusCode 200 and res.body to hav length = 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET -> 'BASE_URL/:id' should return statusCode 200 and res.body.firstName === director.firstName", async () => {

    const res = await request(app)
        .get(`${BASE_URL}/${directorId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

test("PUT -> 'BASE_URL/:id', should return statusCode 200 and res.body.firstName === directorUpdate.firstName", async () => {
    const directorUpdate = {
        firstName: 'Catalina'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
});

test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
})



