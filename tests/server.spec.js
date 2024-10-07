const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    afterAll((done) => {
        server.close(() => {
          console.log("Servidor cerrado correctamente.");
          done();
        });
    });
    
    //test para la ruta GET /cafes
    describe("GET /cafes", () => {
      it("Debe devolver un status code 200 y un array de objetos.", async () => {
        const response = await request(server).get("/cafes");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toBeInstanceOf(Object);
      });
    });
    
    //test eliminar cafe que no existe (id erroneo)
    describe("DELETE /cafes/:id", () => {
        it("Debe devolver un código 404 al intentar eliminar un café con un ID que no existe.", async () => {
          const response = await request(server).delete("/cafes/999");
          expect(response.statusCode).toBe(404);
        });
      });
    
    //teste agrega un nuevo cafe
    describe("POST /cafes", () => {
        it("Debe agregar un nuevo café y devolver un código 201.", async () => {
          const nuevoCafe = {
            id: Math.floor(Math.random() * 999) + 5,
            nombre: "Latte"
          };
          const response = await request(server).post("/cafes").send(nuevoCafe);
          expect(response.statusCode).toBe(201);
          expect(response.body).toContainEqual(nuevoCafe);
        });
      });
    
    //test actualizar cafe con id diferente del payload
      describe("PUT /cafes/:id", () => {
        it("Debe devolver un status code 400 si el ID del parámetro es diferente al ID del payload.", async () => {
          const cafeActualizado = {
            id: 1,
            nombre: "Espresso Modificado"
          };
          const response = await request(server).put("/cafes/2").send(cafeActualizado);
          expect(response.statusCode).toBe(400);
        });
      });
});
