const router = require("express").Router();
const task = require("../models/task");


// CRUD operations

// Create list (post)
router.post("/", (req, res) => {
    data = req.body;

    list.insertMany(data)
        .then(data => {
            res.send(data);
            console.log(data[0]._id.toString());
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
});

// Read all lists (get)
router.get("/", (req, res) => {
    list.find()
        .then(data => {

            res.send(mapArray(data));
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
});

//Additional routes
//Query all lists based on status
/*router.get("/instock/:status", (req, res) => {
    list.find({ inStock: req.params.status })
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

    list.find({ price: filterExpr })
        .then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
});


*/
//Read specific list based on id (get)
router.get("/:id", (req, res) => {
    list.findById(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })


});

// Update specific list (put)
router.put("/:id", (req, res) => {

    const id = req.params.id;
    list.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update list with id=" + id + ". Maybe the list was not found!" });
            }
            else {
                res.send({ message: "list was successfully updated." });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating list with id=" + id })
        })
});

// Delete specific list (delete)
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    list.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete list with id=" + id + ". Maybe the list was not found!" });
            }
            else {
                res.send({ message: "list was successfully deleted." });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error deleting list with id=" + id })
        })
});

function mapArray(arr) {

    let outputArr = arr.map(element => (
        {
            id: element._id,
            task: element.task,
            uri: "/api/lists/" + element._id,
        }
    ));

    return outputArr;
}
module.exports = router;