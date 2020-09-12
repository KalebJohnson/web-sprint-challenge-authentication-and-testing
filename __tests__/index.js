const db = require('../database/dbConfig')
const request = require('supertest')
const server = require('../api/server')


beforeEach(async () => {
    await db.seed.run()
    //seed db
})


afterAll(async () => {
    await db.destroy()
    //anti-stall after test
})

// REGISTER
describe("register", () => {
    it('returns 201', async () => {
        const payload = { username: "user100", password: "password" }
        const res = await request(server)
            .post("/api/auth/register")
            .send(payload)
        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe("Welcome boi")
    })
    it('returns 409 on .unique constraint', async () => {
        const payload = { username: "test1", password: "password" }
        const res = await request(server)
            .post("/api/auth/register")
            .send(payload)
        expect(res.statusCode).toBe(409)
    })
})

// LOGIN
describe("login", () => {
    it('returns 200 on login', async () => {
        const payload = { username: "test1", password: "password" }
        const res = await request(server)
            .post("/api/auth/login")
            .send(payload)
        expect(res.statusCode).toBe(200)
    })
    it('returns 401 status if wrong credentials', async () => {
        const payload = { username: "waitIhaveToRegisterfirst", password: "wut" }
        const res = await request(server)
            .post("/api/auth/login")
            .send(payload)
        expect(res.statusCode).toBe(401)
    })
})



// JOKES route
describe('jokes route', () => {
    it('should return a 401 status if not logged in', async () => {
        const expected = 401
        const res = await request(server).get('/api/jokes')
        expect(res.status).toBe(expected)
    })
    it('returns 200 status with proper credentials', async () => {
        const payload = { username: "test1", password: "password" }
        const res = await request(server)
            .post("/api/auth/login")
            .send(payload)
            .then(await request(server)
            .get('/api/jokes')
            )
        expect(res.statusCode).toBe(200)
    })
})
