const router = require('express').Router()
const { Workout } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const workoutData = await Workout.find({})
        res.status(200).json(workoutData)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const workoutData = await Workout.findById(req.params.id)
        res.status(200).json(workoutData)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;