const express = require('express');
const { createPractice, getAllPractices, getPracticeById, updatePractice, deletePractice } = require('../controllers/practiceController');

const router = express.Router();

// Rutas CRUD para prácticas
router.post('/create', createPractice);
router.get('/all', getAllPractices);
router.get('/:id', getPracticeById);
router.put('/update/:id', updatePractice);
router.delete('/delete/:id', deletePractice);

module.exports = router;
