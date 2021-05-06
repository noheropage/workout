const router = require('express').Router()
const { Workout } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const workoutData = await Workout.aggregate(
            [
                {$project: {"day": "$day", "exercises": "$exercises", "totalDuration":{$sum:"$exercises.duration"}}}
            ]
        )
        res.status(200).json(workoutData)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/range', async (req, res) => {
    try {
        // get last 7 workouts
        const workoutData = await Workout.aggregate(
            [
                {$sort:{day:-1}},
                {$limit: 7},
                
                {$project: {"day": "$day", "exercises": "$exercises", "totalDuration":{$sum:"$exercises.duration"}}}
            ]
        )
        res.status(200).json(workoutData)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const newWorkout = await Workout.create(req.body)
        res.status(200).json(newWorkout)
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

router.put('/:id', async (req, res) => {
    try {
        const workoutData = await Workout.findByIdAndUpdate(
            { _id: req.params.id },
            {$push: {exercises: req.body } },
            {new: true}
        )
        res.status(200).json(workoutData)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;