const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  addMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  toggleMedicine
} = require('../controllers/medicineController')

router.post('/', protect, addMedicine)
router.get('/', protect, getMedicines)
router.get('/:id', protect, getMedicineById)
router.put('/:id', protect, updateMedicine)
router.delete('/:id', protect, deleteMedicine)
router.patch('/:id/toggle', protect, toggleMedicine)

module.exports = router