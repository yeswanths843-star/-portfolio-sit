require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("../models/Project");

const sampleProjects = [
  {
    title: "Weather Dashboard",
    description: "A responsive weather app that pulls live data from a public API and displays forecasts by city.",
    techStack: ["JavaScript", "HTML", "CSS", "OpenWeather API"],
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    liveUrl: "https://your-weather-app.vercel.app",
    imageUrl: "/images/weather.png",
    featured: true,
  },
  {
    title: "Task Manager API",
    description: "A REST API for managing tasks with full CRUD support, built with Express and MongoDB.",
    techStack: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/yourusername/task-manager-api",
    liveUrl: "",
    imageUrl: "/images/taskmanager.png",
    featured: true,
  },
  {
    title: "Recipe Finder",
    description: "Search and save recipes from a third-party API, with a clean card-based UI.",
    techStack: ["React", "CSS", "Recipe API"],
    githubUrl: "https://github.com/yourusername/recipe-finder",
    liveUrl: "https://your-recipe-app.netlify.app",
    imageUrl: "/images/recipe.png",
    featured: false,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);
    console.log("Sample projects seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
};

seed();
