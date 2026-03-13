const Medicine = require('../models/Medicine')

// Add Medicine
const addMedicine = async (req, res) => {
  const { name, dosage, frequency, times, startDate, endDate, notes } = req.body

  // Validation
  if (!name || !dosage || !frequency || !times || !startDate) {
    return res.status(400).json({ message: 'Please fill all required fields' })
  }
  if (!Array.isArray(times) || times.length === 0) {
    return res.status(400).json({ message: 'At least one reminder time required' })
  }

  try {
    const medicine = await Medicine.create({
      userId: req.user._id,
      name: name.trim(),
      dosage: dosage.trim(),
      frequency,
      times,
      startDate,
      endDate: endDate || null,
      notes: notes ? notes.trim() : '',
      isTaken: false
    })

    res.status(201).json(medicine)
  } catch (error) {
    console.error('Add medicine error:', error)
    res.status(500).json({ message: 'Failed to add medicine' })
  }
}

// Get All Medicines for User
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.user._id })
      .sort({ createdAt: -1 })

    res.json(medicines)
  } catch (error) {
    console.error('Get medicines error:', error)
    res.status(500).json({ message: 'Failed to fetch medicines' })
  }
}

// Get Single Medicine
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' })
    }

    if (medicine.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    res.json(medicine)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch medicine' })
  }
}

// Update Medicine
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' })
    }

    if (medicine.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    )

    res.json(updated)
  } catch (error) {
    console.error('Update medicine error:', error)
    res.status(500).json({ message: 'Failed to update medicine' })
  }
}

// Delete Medicine
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' })
    }

    if (medicine.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    await medicine.deleteOne()
    res.json({ message: 'Medicine deleted successfully', id: req.params.id })
  } catch (error) {
    console.error('Delete medicine error:', error)
    res.status(500).json({ message: 'Failed to delete medicine' })
  }
}

// Toggle isTaken
const toggleMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' })
    }

    if (medicine.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    medicine.isTaken = !medicine.isTaken
    await medicine.save()

    res.json(medicine)
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle medicine' })
  }
}

module.exports = {
  addMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  toggleMedicine
}