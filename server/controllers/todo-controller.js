import { ObjectId } from "mongodb";
import { getToDosCollection } from "../config/db.js";

export const getToDos = async (req, res) => {
  try {
    const toDosCollection = await getToDosCollection();
    const allToDos = await toDosCollection.find().toArray();

    if (!allToDos?.length > 0)
      return res
        .status(404)
        .json({ success: false, message: "ToDos not found." });

    return res.status(200).json({ success: true, data: allToDos });
  } catch (error) {
    console.error(error.stack || error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    throw error;
  }
};

export const insertToDo = async (req, res) => {
  const { task, description } = req.body;
  try {
    const toDosCollection = await getToDosCollection();

    // Validate required fields in request body
    if (!task?.trim() || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task/Description cannot be empty.",
      });
    }

    const taskObject = {
      task,
      description,
      completed: false,
    };

    const { acknowledged, insertedId } = await toDosCollection.insertOne(
      taskObject
    );

    if (!acknowledged)
      return res
        .status(500)
        .json({ success: false, message: "Error adding task" });

    return res
      .status(201)
      .json({ success: true, message: "Task added.", insertedId });
  } catch (error) {
    console.error(error.stack || error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    throw error;
  }
};

export const getToDo = async (req, res) => {
  const { id } = req.params;
  try {
    const toDosCollection = await getToDosCollection();

    if (!ObjectId.isValid(id))
      return res.status(400).json({
        success: false,
        message: "Invalid ID format.",
      });

    const getToDoById = await toDosCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!getToDoById)
      return res
        .status(404)
        .json({ success: false, message: "To-Do not found" });

    return res.status(200).json({ success: true, data: getToDoById });
  } catch (error) {
    console.error(error.stack || error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    throw error;
  }
};

export const updateToDo = async (req, res) => {
  const updateObject = req.body;
  const { id } = req.params;

  try {
    const toDosCollection = await getToDosCollection();

    if (!ObjectId.isValid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });

    if (Object.keys(updateObject).length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No fields provided for update" });

    const { matchedCount, modifiedCount } = await toDosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateObject }
    );

    if (!matchedCount)
      return res
        .status(404)
        .json({ success: false, message: "To-Do not found" });

    if (!modifiedCount)
      return res.status(400).json({
        success: false,
        message: "An error occured while updating to-do",
      });

    return res.status(200).json({ success: true, message: "Task updated." });
  } catch (error) {
    console.error(error.stack || error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    throw error;
  }
};

export const deleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID Format" });

    const toDosCollection = await getToDosCollection();
    const { deletedCount } = await toDosCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (!deletedCount)
      return res
        .status(404)
        .json({ success: false, message: "To-Do not found" });

    return res.status(200).json({ success: true, message: "To-Do deleted." });
  } catch (error) {
    console.error(error.stack || error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
    throw error;
  }
};
