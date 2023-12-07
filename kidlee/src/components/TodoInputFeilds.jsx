import { useEffect, useRef, useState } from "react";
import { addTask, handelEdit } from "../redux/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import JoditEditor from "jodit-react";
export default function TodoInputFeilds() {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const config = {
    placeholder: "Task description",
    height: "10px",
  };
  const {
    editedTask,
    isEdited,
    formData: tasks,
  } = useSelector((store) => store.tasks);
  const [isEmpty, setIsEmpty] = useState({
    name: false,
    description: false,
    statut: false,
  });

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    statut: "",
    isCompleted: false,
    order: 0,
  });
  useEffect(() => {
    setFormData(editedTask);
  }, [editedTask]);

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      id: Date.now(),
    }));
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name != "" &&
      formData.description !== "" &&
      formData.statut !== ""
    ) {
      setIsEmpty({
        name: false,
        description: false,
        statut: false,
      });
      if (!isEdited) {
        dispatch(addTask(formData));
      } else if (isEdited) {
        dispatch(handelEdit({ id: editedTask.id, updatedTask: formData }));
      }
      setFormData((prev) => ({
        ...prev,
        id: "",
        name: "",
        description: "",
        statut: "",
        isCompleted: false,
        order: 0,
      }));
    } else {
      setIsEmpty((prev) => ({
        ...prev,
        name: formData.name == "" ? true : false,
        description: formData.description == "" ? true : false,
        statut: formData.statut == "" ? true : false,
      }));
    }

    console.log(isEmpty);
  };
  return (
    <section className="container m-auto text-center w-full sm:w-2/3 md:3/5 lg:1/2 p-6 ">
      <h1 className="text-3xl font-bold mb-4 text-primary_color">To do list</h1>
      <form className="flex flex-col  justify-center gap-6 border p-5 rounded">
        <div className="relative">
          <input
            value={formData.name}
            type="text"
            onChange={(e) => handleFormData(e)}
            name="name"
            className={`transition ease-in-out duration-500 py-3 px-4 ps-11 block w-full bg-gray-100 rounded-lg text-sm focus:border-primary_color focus:border   outline-none ${
              isEmpty.description ? "border border-red-400" : ""
            } `}
            placeholder="Task name"
          />
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
            <svg
              className="flex-shrink-0 w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <JoditEditor
            ref={editor}
            config={config}
            value={formData.description}
            onChange={(newContent) => {
              setFormData((prev) => ({ ...prev, description: newContent }));
            }}
          />
        </div>

        <div className=" w-full mx-auto max-w-2xl">
          <h4
            className={`w-fit text-gray-400 ${
              isEmpty.statut ? "text-red-400" : ""
            }`}
          >
            statut
          </h4>

          <div className="grid  grid-cols-1 sm:grid-cols-3 sm:gap-5">
            <label className="flex bg-gray-100  text-gray-400 rounded-md px-3 py-2 my-3 hover:bg-primary_color hover:text-white transition ease-in-out duration-500 cursor-pointer">
              <input
                onChange={(e) => handleFormData(e)}
                name="statut"
                type="radio"
                checked={formData.statut === "Ouverte"}
                value="Ouverte"
              />
              <i className="pl-2  ">Ouverte</i>
            </label>

            <label className="flex bg-gray-100   text-gray-400 rounded-md px-3 py-2 my-3 hover:bg-primary_color hover:text-white transition ease-in-out duration-500 cursor-pointer">
              <input
                onChange={(e) => handleFormData(e)}
                name="statut"
                type="radio"
                checked={formData.statut === "En cours"}
                value="En cours"
              />
              <i className="pl-2">En cours</i>
            </label>

            <label className="flex bg-gray-100   text-gray-400  rounded-md px-3 py-2 my-3 hover:bg-primary_color hover:text-white transition ease-in-out duration-500 cursor-pointer">
              <input
                onChange={(e) => handleFormData(e)}
                name="statut"
                type="radio"
                value="complétée"
                checked={formData.statut === "complétée"}
              />
              <i className="pl-2">complétée</i>
            </label>
          </div>
        </div>

        {isEdited ? (
          <div>
            {formData.order}
            <h4 className={`w-fit text-gray-400 `}>change the order</h4>
            <div className="grid  grid-cols-1 sm:grid-cols-3 sm:gap-5">
              {tasks.map((task, i) => {
                return (
                  <label
                    key={i}
                    className="flex bg-gray-100   text-gray-400  rounded-md px-3 py-2 my-3 hover:bg-primary_color hover:text-white transition ease-in-out duration-500 cursor-pointer"
                  >
                    <input
                      name="order"
                      value={i + 1}
                      onChange={(e) => handleFormData(e)}
                      type="radio"
                      checked={formData.order == i + 1}
                    />
                    <i className="pl-2">{i + 1}</i>
                  </label>
                );
              })}
            </div>
          </div>
        ) : null}
        <button
          onClick={(e) => handelSubmit(e)}
          className="hover:bg-transparent hover:border-primary_color hover:border hover:text-primary_color transition ease-in-out duration-500 font-semibold bg-primary_color px-7 py-2 text-white rounded-md border box-border"
        >
          {isEdited ? "Update task" : "Add task"}
        </button>
      </form>
    </section>
  );
}
