db = connect("mongodb://localhost:27017/test");

const data = [
    {
        "name": "bananas",
        "qty": 7,
        "rating": 1,
        "microsieverts": 0.1
    },
    {
        "name": "oranges",
        "qty": 6,
        "rating": 2
    },
    {
        "name": "avocados",
        "qty": 3,
        "rating": 5
    },
    {
        "name": "apples",
        "qty": 5,
        "rating": 3
    }
];

data.forEach(item => {
    db.items.updateOne(
        { name: item.name },  
        { $setOnInsert: item },  
        { upsert: true }  
    );
});

