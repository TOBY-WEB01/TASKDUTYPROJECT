import responseHandler from "../utils/responseHandler.js";
import Task from "../model/task.model.js";

export const createTask = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const { title, description, tags } = req.body;
    if (!title || !description || !tags) {
      return next(
        responseHandler.errorResponse("Please fill in all fields", 400),
      );
    }

    const newTask = await Task.create({
      userId,
      title,
      description,
      tags,
    });
    return responseHandler.successResponse(
      res,
      newTask,
      "Task created successfully",
      201,
    );
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  const userId = req.user.id;
  try {
    // const filter = { userId };
    const task = await Task.find({
      userId: userId,
    });

    return responseHandler.successResponse(res, {
      task,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteTask = async (req, res, next) => {
  const { id } = req.params; // Grabs the ID from the URL /task/delete/:id
  const userId = req.user.id; // Ensure the user owns the task they are deleting
  try {
    // 1. Find and delete the task, but ONLY if it belongs to the logged-in user
    const task = await Task.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    // 2. If no task was found (maybe wrong ID or unauthorized)
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or unauthorized",
      });
    }
    // 3. Return success using your existing response handler
    return responseHandler.successResponse(res, {
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};




// GET A SINGLE TASK (To fill the Edit Form)
export const getSingleTask = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ _id: id, userId: userId });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return responseHandler.successResponse(res, { task });
  } catch (error) {
    next(error);
  }
};

// UPDATE THE TASK
export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // findOneAndUpdate handles the "Find" and "Update" in one command
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: userId }, 
      { $set: req.body },         
      { new: true, runValidators: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found or unauthorized" });
    }

    return responseHandler.successResponse(res, { task: updatedTask });
  } catch (error) {
    next(error);
  }
};
