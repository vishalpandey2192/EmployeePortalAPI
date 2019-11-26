'use strict';

const express = require('express');
const router = express.Router();
const employee = require('../models/posts')
const helper = require('../models/helper')
const axios = require('axios')
var JSSoup = require('jssoup').default;

router.get('/', async (req, res) => {
    await employee.getEmployees()
        .then(employees => res.json(employees))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

router.get('/:id', helper.isInteger, async (req, res) => {
    const id = req.params.id
    await employee.getEmployee(id)
        .then(employee => res.json(employee))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

router.post('/', helper.validateFields, async (req, res) => {
    const getQuote = await axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
    var quote = getQuote['data'][0]

    const getJoke = await axios.get("https://icanhazdadjoke.com")
    var pTag = new JSSoup(getJoke['data']).find('p');
    var joke = pTag.nextElement['_text']

    await employee.insertEmployee(req.body, quote, joke)
        .then(employee => res.status(201).json({
            message: `The employee #${employee.id} has been created`,
            content: employee
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})


// router.put('/:id', async (req, res) {}

router.put('/:id', helper.isInteger, helper.validateFields, async (req, res) => {
    const id = req.params.id

    await employee.updateEmployee(id, req.body)
        .then(employee => res.json({
            message: `The employee #${id} has been updated`,
            content: employee
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

router.delete('/:id', helper.isInteger, async (req, res) => {
    const id = req.params.id

    await employee.deleteEmployee(id)
        .then(employee => res.json({
            message: `The employee #${id} has been deleted`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})


module.exports = router;
