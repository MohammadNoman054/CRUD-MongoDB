const express = require('express');
const mongoose = require('mongoose');
const { newEmployee } = require('./Employee');
const Employee = require('./EmployeeModel');
const app = express();

app.use(express.json());


app.get('/api', (req, res) => {
    res.send('API');
});

app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        console.log('Error!'+error);
    }
});

app.get('/api/employees/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        console.log('Error!'+error);
    }
});

app.post('/employees', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(200).json(employee);
    } catch (error) {
        console.log('Error!'+error);
    }
});

app.put('/api/employees/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updateEmployee = await Employee.findByIdAndUpdate(id,req.body);
        if(!updateEmployee){
            res.status(404).send("Cannot Find Employee with that ID")
        }
        res.status(200).json(updateEmployee);
    } catch (error) {
        console.log('Error!'+error);
    }
});

app.delete("/api/employees/", async (req, res) => {
     await Employee.deleteMany();
    res.status(200).send("All Employees Deleted Successfully!");
  });

app.delete('/api/employees/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteEmployee = await Employee.findByIdAndDelete(id,req.body);
        if(!deleteEmployee){
            res.status(404).send("Cannot Find Employee with that ID")
        }
        res.status(200).send("Employee Successfully Deleted!");
    } catch (error) {
        console.log('Error!'+error);
    }
});




mongoose.connect('mongodb://localhost:27017/employees').then(async () => {
    console.log('Connected to Mongo DB!');

    app.listen(3000, () => {
        console.log('Running on port 3000!');
    });

}).catch(() => {
    console.log('Cannot Connect to MondoDB!');
});
