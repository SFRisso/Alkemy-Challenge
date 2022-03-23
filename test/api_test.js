const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');



const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDgwNDU1NDN9.mjmdsVvDIXyP0MwNacCGe7TYiLuP7iBOq4wGwpsKr2o';

//Assertion Style
chai.should();
chai.use(chaiHttp);

//MOVIES
describe('Movies', () => {
    /**
     * Test the GET route
     */
    describe('GET /api/movies', () => {
        it('GET todas las peliculas y series', (done) => {
            chai.request(server)
                .get('/api/movies')
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(6);
                    done();
                });
        });

        it('NOT GET todas las peliculas y series', (done) => {
            chai.request(server)
                .get('/api/moviesss')
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    /**
     * Test the GET by genre ID
     */
    describe('GET /api/movies?genre=idGenero', () => {
        it('GET pelicula o serie por id de genero', (done) => {
            const idGenero = 5;
            chai.request(server)
                .get('/api/movies?genre=' + idGenero)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                    done();
                });
        });

        it('NOT GET pelicula o serie por id de genero que no existe', (done) => {
            const idGenero = 845;
            chai.request(server)
                .get('/api/movies?genre=' + idGenero)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
    /**
     * Test the POST route
     */
    describe('POST /api/movies', () => {
        it('POST pelicula o serie', (done) => {
            const peli = {
                imagen: 'img_buscando_a_nemo.jpg',
                titulo: 'Buscando a nemo',
                fecha_creacion: '03/07/2003',
                calif: 5
            };
            chai.request(server)
                .post('/api/movies')
                .auth(token, { type: 'bearer' })
                .send(peli)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('peli_serie_id');
                    res.body.should.have.property('imagen').eq('img_buscando_a_nemo.jpg');
                    res.body.should.have.property('titulo').eq('Buscando a nemo');
                    res.body.should.have.property('fecha_creacion');
                    res.body.should.have.property('calif').eq(5);
                    res.body.should.have.property('updatedAt');
                    res.body.should.have.property('createdAt');
                    done();
                });
        });

        it('NOT POST pelicula o serie (sin titulo)', (done) => {
            const peli = {
                //sin titulo
                imagen: 'img_buscando_a_nemo.jpg',
                fecha_creacion: '03/07/2003',
                calif: 5
            };
            chai.request(server)
                .post('/api/movies')
                .auth(token, { type: 'bearer' })
                .send(peli)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errores');
                    done();
                });
        });
    });
    /**
     * Test the PUT route
     */
    describe('PUT /api/movies/:id', () => {
        it('PUT pelicula o serie', (done) => {
            const peliId = 7;
            const peli = {
                imagen: 'img_buscando_a_dori.jpg',
                titulo: 'Buscando a nemo',
                fecha_creacion: '03/07/2016',
                calif: 2
            };
            chai.request(server)
                .put('/api/movies/' + peliId)
                .auth(token, { type: 'bearer' })
                .send(peli)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    done();
                });
        });

        it('NOT PUT pelicula o serie (fecha con formato incorrecto)', (done) => {
            const peliId = 7;
            //fecha con formato incorrecto
            const peli = {
                imagen: 'img_buscando_a_dori.jpg',
                titulo: 'Buscando a nemo',
                fecha_creacion: '03/07/20165487',
                calif: 2
            };
            chai.request(server)
                .put('/api/movies/' + peliId)
                .auth(token, { type: 'bearer' })
                .send(peli)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errores');
                    done();
                });
        });
    });

    /**
     * Test the DELETE route
     */
    describe('DELETE /api/movies/:id', () => {
        it('DELETE pelicula o serie', (done) => {
            const peliId = 7;
            chai.request(server)
                .delete('/api/movies/' + peliId)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    done();
                });
        });

        it('NOT DELETE pelicula o serie porque no se encuentra el a base de datos', (done) => {
            const peliId = 7555;
            chai.request(server)
                .delete('/api/movies/' + peliId)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
});

//CHARACTERS
describe('Characters', () => {
    /**
     * Test the GET route
     */
    describe('GET /api/characters', () => {
        it('GET todos los personajes', (done) => {
            chai.request(server)
                .get('/api/characters')
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(5);
                    done();
                });
        });

        it('NOT GET todos los personajes', (done) => {
            chai.request(server)
                .get('/api/characterssss')
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    /**
     * Test the GET by movie ID
     */
    describe('GET /api/characters?movie=idMovie', () => {
        it('GET personajes por id de peli o serie', (done) => {
            const idMovie = 5;
            chai.request(server)
                .get('/api/characters?movies=' + idMovie)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                });
        });

        it('NOT GET personajes por id de peli o serie que no existe', (done) => {
            const idMovie = 845;
            chai.request(server)
                .get('/api/characters?movies=' + idMovie)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
    /**
     * Test the POST route
     */
    describe('POST /api/characters', () => {
        it('POST personaje', (done) => {
            const pers = {
                imagen: 'img_legolas.jpg',
                nombre: 'Legolas',
                edad: 2931,
                peso: 70,
                historia: 'Legolas es un elfo sinda, hijo de Thranduil, el rey de los elfos silvanos del Bosque Negro.'
            };
            chai.request(server)
                .post('/api/characters')
                .auth(token, { type: 'bearer' })
                .send(pers)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('personaje_id');
                    res.body.should.have.property('imagen').eq('img_legolas.jpg');
                    res.body.should.have.property('nombre').eq('Legolas');
                    res.body.should.have.property('edad').eq(2931);
                    res.body.should.have.property('peso').eq(70);
                    res.body.should.have.property('historia')
                    res.body.should.have.property('updatedAt');
                    res.body.should.have.property('createdAt');
                    done();
                });
        });

        it('NOT POST personaje (sin nombre)', (done) => {
            const pers = {
                //sin nombre
                imagen: 'img_legolas.jpg',
                edad: 2931,
                peso: 70,
                historia: 'Legolas no es un elfo'
            };
            chai.request(server)
                .post('/api/characters')
                .auth(token, { type: 'bearer' })
                .send(pers)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errores');
                    done();
                });
        });
    });
    /**
     * Test the PUT route
     */
    describe('PUT /api/characters/:id', () => {
        it('PUT personaje', (done) => {
            const persId = 6;
            const pers = {
                nombre: 'LEbron JAmes',
                imagen: 'img_legolas_el_capo.jpg',
                edad: 2931,
                peso: 70,
                historia: 'Legolas es un elfo sinda, hijo de Thranduil, el rey de los elfos silvanos del Bosque Negro.'
            };
            chai.request(server)
                .put('/api/characters/' + persId)
                .auth(token, { type: 'bearer' })
                .send(pers)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    done();
                });
        });

        it('NOT PUT personaje ', (done) => {
            //imagen con formato incorrecto
            const persId = 6;
            const pers = {
                nombre: 'LEbron JAmes',
                imagen: 'img_legolas_el_capo.exe',
                edad: 2931,
                peso: 70,
                historia: 'Legolas es un elfo sinda, hijo de Thranduil, el rey de los elfos silvanos del Bosque Negro.'
            };
            chai.request(server)
                .put('/api/characters/' + persId)
                .auth(token, { type: 'bearer' })
                .send(pers)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errores');
                    done();
                });
        });
    });

    /**
     * Test the DELETE route
     */
    describe('DELETE /api/characters/:id', () => {
        it('DELETE personaje', (done) => {
            const persId = 6;
            chai.request(server)
                .delete('/api/characters/' + persId)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    done();
                });
        });

        it('NOT DELETE personaje porque no se encuentra el a base de datos', (done) => {
            const persId = 7555;
            chai.request(server)
                .delete('/api/characters/' + persId)
                .auth(token, { type: 'bearer' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
});