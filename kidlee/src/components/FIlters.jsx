import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { filter } from "../redux/TaskSlice";
export default function Filters() {
  const dispatch = useDispatch()
    const {
    formData
  } = useSelector((store) => store.tasks);
  const [filters, setFilters] = useState([
    { name: "toutes", active: true },
    { name: "Ouverte", active: false },
    { name: "En cours", active: false },
    { name: "complétée", active: false },
  ]);

 const handelFilter = (index) => {
   const updatedFilters = filters.map((filter, i) =>
     i === index ? { ...filter, active: true } : { ...filter, active: false }
   );
   setFilters(updatedFilters);
   dispatch(filter(updatedFilters));
   console.log(updatedFilters);
 };

  return (
    <>
      {formData.length == 0 ? (
        ''
      ) : (
        <section className="container m-auto w-full sm:w-2/3 md:3/5 lg:1/2 p-4 flex flex-col justify-center items-center gap-3 mt-6">
          <h1 className="text-3xl font-bold text-primary_color">Filters</h1>
          <div className="flex justify-between gap-2 sm:gap-4 items-center">
            {filters.map((filter, index) => (
              <button
                onClick={() => handelFilter(index)}
                className={`hover:bg-primary_color text-sm sm:text-md hover:border hover:border-transparent hover:text-white transition duration-300 font-semibold px-3 sm:px-7 py-2 rounded-md border box-border ${
                  filter.active
                    ? "text-white bg-primary_color border-transparent"
                    : "bg-transparent border border-primary_color text-primary_color"
                }`}
                key={index}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
