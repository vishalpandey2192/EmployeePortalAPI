let employees = require('../data/input.json')
const filename = './data/input.json'
const helper = require('./helper.js')
const fs = require('fs');


function getEmployees() {
    return new Promise((resolve, reject) => {
        if (employees.length === 0) {
            reject({
                message: 'No employees available',
                status: 202
            })
        }
        resolve(employees)
    })
}

function getEmployee(id) {
    return new Promise((resolve, reject) => {
        helper.findInArray(employees, id)
        .then(employee => resolve(employee))
        .catch(err => reject(err))
    })
}

function insertEmployee(newEmployee, quote,joke) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getId(employees) }
        var new_fields = {"quote": quote, "joke": joke}   
        newEmployee = { ...id, ...newEmployee, ...new_fields }
        employees.push(newEmployee)
        helper.writeToJSON(filename, employees)
        resolve(newEmployee)
    })
}

function updateEmployee(id, newEmployee) {
    return new Promise((resolve, reject) => {
        helper.findInArray(employees, id)
        .then(employee => {
            const index = employees.findIndex(p => p.id == employee.id)
            id = { id: employee.id }        
            fields = {"quote": employee.quote, "joke": employee.joke}
            employees[index] = { ...id, ...newEmployee, ...fields }
            helper.writeToJSON(filename, employees)
            resolve(employees[index])
        })
        .catch(err => reject(err))
    })
}

function deleteEmployee(id) {
    return new Promise((resolve, reject) => {
        helper.findInArray(employees, id)
        .then(() => {             
            employees = employees.filter(p => p.id != id)
            helper.writeToJSON(filename, employees)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertEmployee,
    getEmployees,
    getEmployee, 
    updateEmployee,
    deleteEmployee
}