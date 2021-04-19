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
        // const workoutData = await Workout
        //.find({}, null, {limit: 7, sort: {day: -1}})
        const workoutData = await Workout.aggregate(
            [
                {$sort:{day:-1}},
                {$limit: 7},
                // {$unwind: {"path":"$exercises", "preserveNullAndEmptyArrays": true }},
                // {$group: {"_id": null, "totalDuration":{$sum:"$exercises.duration"}}},
                {$project: {"day": "$day", "exercises": "$exercises", "totalDuration":{$sum:"$exercises.duration"}}}

            ]
        )
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