import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { deleteTask, completedHandler,editTask, deleteAllTasks, deleteCompleted } from "../redux/TaskSlice";

export default function TaskesList() {
  const dispatch = useDispatch();
  const { formData, filtredData } = useSelector((store) => store.tasks);
  const [showFullDescription, setShowFullDescription] = useState({});
  const toggleDescription = (taskId) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };
console.log(formData);

  return (
    <div className="container m-auto w-full sm:w-2/3 md:3/5 lg:1/2 p-6  flex flex-col gap-3 ">
      {filtredData.length == 0 ? (
        <h3 className="text-center font-bold text-xl text-gray-500">
          no items
        </h3>
      ) : (
        filtredData.map((task, i) => {
          const isLongDescription = task.description?.length > 30;
          const truncatedDescription = isLongDescription
            ? `${task.description.substring(0, 40)}...`
            : task.description;

          return (
            <div key={i} className="shadow shadow-gray-200 rounded-lg px-6 py-3 bg-gray-100 relative">
              <span className="absolute bg-primary_color text-white w-5 h-5 flex justify-center items-center rounded-full -top-2 -left-2 text-sm ">
                {i + 1}
              </span>
              <div className="flex justify-between">
                <div>
                  <h3
                    className={` ${
                      task.isCompleted ? "line-through" : ""
                    } text-sm  inline-block mr-8 text-gray-400`}
                  >
                    {task.name}
                  </h3>{" "}
                  <span className="text-sm text-primary_color">
                    {task.statut}
                  </span>
                  <p
                    className={`${
                      task.isCompleted ? "line-through" : ""
                    }  text-gray-600 text-lg`}
                  >
                    {showFullDescription[task.id]
                      ? task.description
                      : truncatedDescription}
                    {isLongDescription && (
                      <button
                        className="text-primary_color text-sm font-semibold"
                        onClick={() => toggleDescription(task.id)}
                      >
                        {showFullDescription[task.id] ? " Less" : " More"}
                      </button>
                    )}
                  </p>
                </div>
                <div className="flex gap-1 items-center justify-center">
               
                    <input
                      checked={task.isCompleted}
                      onChange={() => dispatch(completedHandler(task.id))}
                      type="checkbox"
                      className="h-4 w-4  sm:h-5 sm:w-5 rounded-md cursor-pointer  "
                    />
                 
                    <MdEdit
                      onClick={() => dispatch(editTask(task.id))}
                      className=" text-xl sm:text-2xl cursor-pointer  text-yellow-500"
                    />
                 
                    <AiFillDelete
                      onClick={() => dispatch(deleteTask(task.id))}
                      className="text-xl sm:text-2xl cursor-pointer text-red-700"
                    />
               
                </div>
              </div>
            </div>
          );
        })
      )}
      <div className="flex  gap-6 items-center py-4 ">
        <button
          onClick={() => dispatch(deleteAllTasks())}
          className="hover:bg-transparent flex-1 hover:border-red-600 hover:border hover:text-red-600 transition ease-in-out duration-500 font-semibold bg-red-600 px-7 py-2 text-white rounded-md border box-border"
        >
          Delete All Taskes
        </button>
        <button
          onClick={() => dispatch(deleteCompleted())}
          className="hover:bg-transparent flex-1  hover:border-red-600 hover:border hover:text-red-600 transition ease-in-out duration-500 font-semibold bg-red-600 px-7 py-2 text-white rounded-md border box-border"
        >
          Delete complétée Taskes
        </button>
      </div>
    </div>
  );
}
