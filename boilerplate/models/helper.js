const fs = require('fs')
let employees = require('../data/input.json')

const getId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}


function findInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'ID not found',
                status: 404
            })
        }
        resolve(row)
    })
}

function writeToJSON(filename, content) {
    fs.writeFile(filename, JSON.stringify(content), (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function isInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function validateFields(req, res, next) {
    const { fname, lname, hireDate, role } = req.body
    const accept_role = ["CEO", "MANAGER", "VP", "LACKEY"]
    var curr = new Date();
    var recordDate = new Date(hireDate)
    // check date
    if (curr < recordDate) {
        res.status(400).json({ message: 'Date must be in past' })
    }
    // check role
    if(role){
        if(accept_role.indexOf(role.toUpperCase()) == -1){
            res.status(400).json({ message: 'Role must be ceo/manager/cp/lackey' })
        }

        // only 1 CEO allowed
       // Only do this check if its a post
    //    req.
        if (role.toUpperCase() == "CEO"){
            // check if CEO already exists
            const index = employees.findIndex(p => p.role == "CEO")
            console.log("index", index)
            if(index != -1 && employees[index].id != req.params.id){
                // a CEO already exists
                res.status(400).json({ message: 'CEO already exixts' })
            }
        }
    }else{
        res.status(400).json({ message: 'Role is a required field' })
    }
    
    if (fname && lname && hireDate && role) {
        next()
    } else {
        res.status(400).json({ message: 'Invalid Fields Passed' })
    }
}

module.exports = {
    getId,
    findInArray,
    writeToJSON,
    isInteger,
    validateFields
}