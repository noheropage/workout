const mongoose = require("mongoose");
// const { Exercise } = require('./Exercise')

const Schema = mongoose.Schema;

const Exercise = new Schema({
    name: {
      type: String,
      trim: true,
      required: "Enter the name of the exercise",
    },
    type: {
      type: String,
      trim: true,
      require: "Please enter what type of exercise (i.e. resistance or cardio)",
    },
    weight: Number,
    sets: Number,
    reps: Number,
    duration: Number,
    distance: Number,
  });

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [Exercise]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
