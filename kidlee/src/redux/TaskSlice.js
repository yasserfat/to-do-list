import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    formData: JSON.parse(localStorage.getItem('formData')) ? JSON.parse(localStorage.getItem('formData')) : [],
    editedTask: {
        id: "",
        name: "",
        description: "",
        statut: "",
        isCompleted: false,
        order: 0
    },
    isEdited: false,
    filtredData: JSON.parse(localStorage.getItem('formData')) ? JSON.parse(localStorage.getItem('formData')) : [],
}

const TaskSlice = createSlice({
    name: 'to do list',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.formData.push(action.payload)
            state.formData.reverse()
            state.formData = state.formData.map((item, i) => ({ ...item, order: i + 1 }))
            localStorage.setItem("formData", JSON.stringify(state.formData))
            state.editedTask = {
                id: "",
                name: "",
                description: "",
                statut: "",
                isCompleted: false,
                order: 0
            }
            state.isEdited = false
            state.filtredData = state.formData
        },
        deleteTask: (state, action) => {
            state.formData = state.formData.filter(task => task.id !== action.payload)
            state.filtredData = state.formData

            localStorage.setItem("formData", JSON.stringify(state.formData))

        },
        completedHandler: (state, action) => {
            const updatedFormData = state.formData.map(task => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        isCompleted: !task.isCompleted,
                        statut: !task.isCompleted ? "complétée" : "En cours"
                    };
                } else {
                    return task;
                }
            });
            state.formData = updatedFormData;
            state.filtredData = state.formData

            localStorage.setItem("formData", JSON.stringify(state.formData))
        },
        editTask: (state, action) => {
            const taskIndex = state.formData.findIndex((task) => task.id === action.payload)
            if (taskIndex !== -1) {
                state.editedTask = state.formData[taskIndex];
                state.isEdited = true
                state.order = taskIndex

            }
        },
        handelEdit: (state, action) => {
            const { id, updatedTask } = action.payload;
            const taskIndex = state.formData.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
                state.formData[taskIndex] = updatedTask;
                const taskToMove = state.formData.splice(taskIndex, 1)[0];
                const insertIndex = updatedTask.order - 1;
                state.formData.splice(insertIndex, 0, taskToMove);
            }
            localStorage.setItem("formData", JSON.stringify(state.formData));
            state.editedTask = {
                id: "",
                name: "",
                description: "",
                statut: "",
                isCompleted: false,
            };
            state.isEdited = false;
            state.filtredData = state.formData

        },
        filter: (state, action) => {
            const statut = action.payload.find(task => task.active == true)
            console.log(statut)
            if (statut.name !== "toutes") {
                state.filtredData = state.formData.filter(task => task.statut == statut.name)
            }
            else {
                state.filtredData = state.formData
            }
        },
        deleteAllTasks :(state) => {
            state.formData = []
            localStorage.clear()
        },
        deleteCompleted:(state) => {
            state.formData = state.formData.filter(task => task.statut != "complétée")
            state.filtredData = state.formData
            localStorage.setItem("formData", JSON.stringify(state.formData));

        }

    }
});

export const { addTask, deleteTask, completedHandler, editTask, handelEdit, filter, deleteAllTasks, deleteCompleted } = TaskSlice.actions

export default TaskSlice.reducer