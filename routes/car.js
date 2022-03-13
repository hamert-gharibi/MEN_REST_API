const router = require("express").Router();
const car = require("../models/car");

// CRUD operations

// Create car (post)
router.post("/", (req, res) => {
    data = req.body;

    car.insertMany(data)
        .then(data => {
            res.send(data);
            console.log(data[0]._id.toString());
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
});

// Read all cars (get)
router.get("/", (req, res) => {
    car.find()
        .then(data => {

            res.send(mapArray(data));
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
});

//Additional routes
//Query all cars based on stock status
router.get("/instock/:status", (req, res) => {
    car.find({ inStock: req.params.status })
        .then(data => {
            res.send(mapArray(data));
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
});



router.get("/price/:operator/:price", (req, res) => {

    const operator = req.params.operator;
    const price = req.params.price;

    let filterExpr = { $lte: req.params.price };

    if (operator == "gt") {
        filterExpr = { $gte: req.params.price };
    }

    car.find({ price: filterExpr })
        .then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
});



//Read specific car based on id (get)
router.get("/:id", (req, res) => {
    car.findById(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })


});

// Update specific car (put)
router.put("/:id", (req, res) => {

    const id = req.params.id;
    car.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update car with id=" + id + ". Maybe the car was not found!" });
            }
            else {
                res.send({ message: "car was successfully updated." });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating car with id=" + id })
        })
});

// Delete specific car (delete)
router.delete("/:id", (req, res) => {
    x$
    const id = req.params.id;
    car.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete car with id=" + id + ". Maybe the car was not found!" });
            }
            else {
                res.send({ message: "car was successfully deleted." });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error deleting car with id=" + id })
        })
});


function mapArray(arr) {

    let outputArr = arr.map(element => (
        {
            id: element._id,
            name: element.name,
            description: element.description,
            price: element.price,
            inStock: element.inStock,
            //link urln
            uri: "/api/cars/" + element._id,
        }
    ));

    return outputArr;
}


module.exports = router;