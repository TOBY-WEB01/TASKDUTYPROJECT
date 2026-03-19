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
  const { id } = req.params; 
  const userId = req.user.id; 

  try {
    // 1. Find and delete, ensuring the user owns the task
    const task = await Task.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    
    if (!task) {
      return next(
        responseHandler.notFoundResponse("Task not found or unauthorized")
      );
    }

  
    return responseHandler.successResponse(
      res, 
      null, 
      "Task deleted successfully"
    );
  } catch (error) {
   
    next(error);
  }
};





export const getSingleTask = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ _id: id, userId: userId });

    if (!task) {
    
      return next(
        responseHandler.notFoundResponse("Task not found or unauthorized")
      );
    }

    return responseHandler.successResponse(res, { task });
  } catch (error) {
    next(error);
  }
};


export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: userId }, 
      { $set: req.body },         
      { new: true, runValidators: true } 
    );

    if (!updatedTask) {
     
      return next(responseHandler.notFoundResponse("Task not found or unauthorized"));
    }

  
    return responseHandler.successResponse(res, { task: updatedTask }, "Task updated successfully");
  } catch (error) {
    next(error);
  }
};