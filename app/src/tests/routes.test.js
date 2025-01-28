const request = require('supertest');
const express = require('express');
const routes = require('../routes/items'); // Import your routes

const app = express();
app.use(express.json());
app.use('/', routes);

// Mock MongoDB data
const mockItems = [
    { name: 'apples', qty: 5, rating: 3 },
    { name: 'bananas', qty: 7, rating: 1 },
    { name: 'oranges', qty: 6, rating: 2 },
    { name: 'avocados', qty: 3, rating: 5 },
];

// Mock the Item model
jest.mock('../models/items', () => ({
    find: jest.fn(() => Promise.resolve(mockItems)),
    findOne: jest.fn((query) => {
        const name = query.name;
        return Promise.resolve(mockItems.find(item => item.name === name));
    }),
}));



describe('Test fruit routes', () => {
    it('should return the correct number of apples as emojis in the root route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        const appleCount = (response.text.match(/🍎/g) || []).length;
        const apples = mockItems.find(item => item.name === 'apples');
        expect(appleCount).toBe(apples.qty);
    });

    it('should return the correct number of apples when queried by name', async () => {
        const response = await request(app).get('/apples');
        expect(response.status).toBe(200);
        const appleCount = (response.text.match(/🍎/g) || []).length;
        const apples = mockItems.find(item => item.name === 'apples');
        expect(appleCount).toBe(apples.qty);
    });
});
