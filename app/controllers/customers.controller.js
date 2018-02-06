var customers = require('../models/customers.model.js');

exports.create = function(req, res) {
    // Create and Save a new Note
    console.log(req.body);
    if (!req.body.address) {
        res.status(400).send({ message: "Note can not be empty" });
    }
    customers = new customers({ name: req.body.name || "Untitled Note", address: req.body.address });

    customers.save(function(err, data) {
        console.log(data);
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating the Note." });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    customers.find(function(err, customers) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving notes." });
        } else {
            res.send(customers);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single note with a noteId
    customers.findById(req.params.customerId, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve note with id " + req.params.customerId });
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request
    customers.findById(req.params.customerId, function(err, customer) {
        if (err) {
            res.status(500).send({ message: "Could not find a note with id " + req.params.customerId });
        }

        customer.name = req.body.name;
        customer.address = req.body.address;

        customer.save(function(err, data) {
            if (err) {
                res.status(500).send({ message: "Could not update note with id " + req.params.customerId });
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
    customers.remove({ _id: req.params.customerId }, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not delete note with id " + req.params.id });
        } else {
            res.send({ message: "Note deleted successfully!" })
        }
    });
};