const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employees');
var db = mongoose.connection;

var employeeSchema = new mongoose.Schema({

    name: String,
    hourlyRate: Number,
    totalHour: Number,
    eType: String,
    email:String,


})


var employee = mongoose.model('employee', employeeSchema);

module.exports = employee;
