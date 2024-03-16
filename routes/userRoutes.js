const express = require('express');
const { sendAllData, getAllData, updateData, deleteData } = require('../controller/userController');

const router = express.Router()

router.post('/send', sendAllData)
router.get('/get', getAllData)

router.put('/update/:id', updateData)

router.delete('/delete/:id', deleteData)


module.exports = router;