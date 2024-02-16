const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Car = require('./car.model');

const app = express(); // Creating an instance of the Express application
const port = 3000; // Port number for the server to listen on

app.use(bodyParser.json()); // Using bodyParser middleware to parse JSON request bodies
app.use(cors()); // Using cors middleware to enable CORS

let cars = []; // Array to store car data
let nextId = 1; // Variable to track the next available ID for new cars

// Predefined data for cars
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


// GET car by ID endpoint
app.get('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get car ID from request parameters
    const car = cars.find(car => car.id === id); // Find car with matching ID
    if (!car) {
        return res.status(404).json({ error: 'Car not found' }); // Return 404 if car not found
    }
    res.json(car); // Return JSON response with car data
});

// POST a new car endpoint
app.post('/cars', (req, res) => {
    const { rank, model, quantity, changeQuantityPercent } = req.body; // Extract car data from request body
    const newCar = new Car(nextId++, rank, model, quantity, changeQuantityPercent); // Create a new Car instance
    cars.push(newCar); // Add new car to the cars array
    res.status(201).json(newCar); // Return JSON response with the newly created car
});

// PUT (update) an existing car endpoint
app.put('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get car ID from request parameters
    const { rank, model, quantity, changeQuantityPercent } = req.body; // Extract updated car data from request body
    const index = cars.findIndex(car => car.id === id); // Find index of car with matching ID
    if (index === -1) {
        return res.status(404).json({ error: 'Car not found' }); // Return 404 if car not found
    }
    cars[index] = new Car(id, rank, model, quantity, changeQuantityPercent); // Update car data
    res.json(cars[index]); // Return JSON response with updated car data
});

// DELETE a car endpoint
app.delete('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get car ID from request parameters
    cars = cars.filter(car => car.id !== id); // Remove car with matching ID from cars array
    res.sendStatus(204); // Return 204 No Content status
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); // Log a message indicating that the server is running
});