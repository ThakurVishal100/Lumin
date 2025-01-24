import { Course } from "../models/courseModel.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res
      .status(201)
      .json({ message: "Course created successfully", course });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Failed to create course" });
  }
};

export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ courses: [], message: "No course found " });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to get courses for this user" });
  }
};
