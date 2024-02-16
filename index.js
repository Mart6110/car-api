const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Car = require('./car.model');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let cars = [];
let nextId = 1;

// Prefill some data
const prefillData = [
    { rank: 1, model: 'Skoda Enyaq', quantity: 1044, changeQuantityPercent: 284 },
    { rank: 2, model: 'Tesla Model Y', quantity: 989, changeQuantityPercent: 100 },
    { rank: 3, model: 'Polestar 2', quantity: 836, changeQuantityPercent: 1990 },
    { rank: 4, model: 'Audi Q4', quantity: 816, changeQuantityPercent: 586 },
    { rank: 5, model: 'Ford Mustang Mach-E', quantity: 659, changeQuantityPercent: 1333 },
    { rank: 6, model: 'Kia EV6', quantity: 520, changeQuantityPercent: 100 },
    { rank: 7, model: 'VW ID.4', quantity: 458, changeQuantityPercent: -61 },
    { rank: 8, model: 'Volvo XC40', quantity: 416, changeQuantityPercent: 100 },
    { rank: 9, model: 'Hyundai Ioniq 5', quantity: 365, changeQuantityPercent: 100 },
    { rank: 10, model: 'Hyundai Kona', quantity: 359, changeQuantityPercent: -24 },
    { rank: 11, model: 'Tesla Model 3', quantity: 350, changeQuantityPercent: -68 },
    { rank: 12, model: 'Kia Niro', quantity: 346, changeQuantityPercent: -16 },
    { rank: 13, model: 'Peugeot 208', quantity: 330, changeQuantityPercent: 131 },
    { rank: 14, model: 'VW ID.3', quantity: 329, changeQuantityPercent: -54 },
    { rank: 15, model: 'Cupra Born', quantity: 298, changeQuantityPercent: 100 },
    { rank: 16, model: 'Mercedes-Benz EQA', quantity: 289, changeQuantityPercent: 51 },
    { rank: 17, model: 'VW Up', quantity: 229, changeQuantityPercent: 332 },
    { rank: 18, model: 'VW ID.5', quantity: 226, changeQuantityPercent: 100 },
    { rank: 19, model: 'Mercedes-Benz EQB', quantity: 224, changeQuantityPercent: 100 },
    { rank: 20, model: 'Fiat 500', quantity: 202, changeQuantityPercent: -40 },
    { rank: 21, model: 'Renault Zoe', quantity: 185, changeQuantityPercent: -18 },
    { rank: 22, model: 'Peugeot 2008', quantity: 169, changeQuantityPercent: 42 },
    { rank: 23, model: 'Audi E-tron', quantity: 168, changeQuantityPercent: 25 },
    { rank: 24, model: 'Dacia Spring', quantity: 160, changeQuantityPercent: 5233 },
    { rank: 25, model: 'BMW i4', quantity: 142, changeQuantityPercent: 100 },
];

// Add prefill data to cars array
cars = prefillData.map(carData => new Car(nextId++, carData.rank, carData.model, carData.quantity, carData.changeQuantityPercent));


// GET all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// GET car by ID
app.get('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(car => car.id === id);
    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
});

// POST a new car
app.post('/cars', (req, res) => {
    const { rank, model, quantity, changeQuantityPercent } = req.body;
    const newCar = new Car(nextId++, rank, model, quantity, changeQuantityPercent);
    cars.push(newCar);
    res.status(201).json(newCar);
});

// PUT (update) an existing car
app.put('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { rank, model, quantity, changeQuantityPercent } = req.body;
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Car not found' });
    }
    cars[index] = new Car(id, rank, model, quantity, changeQuantityPercent);
    res.json(cars[index]);
});

// DELETE a car
app.delete('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    cars = cars.filter(car => car.id !== id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
