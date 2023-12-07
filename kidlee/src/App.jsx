import TaskesList from "./components/TaskesList";
import TodoInputFeilds from "./components/TodoInputFeilds";
import Filters from "./components/FIlters";
import { useSelector } from "react-redux";

function App() {
  const { formData } = useSelector((store) => store.tasks);
  return (
    <>
      <TodoInputFeilds />
      {formData.length !== 0 && <Filters />}
      {formData.length !== 0 && <TaskesList />}
    </>
  );
}

export default App;
