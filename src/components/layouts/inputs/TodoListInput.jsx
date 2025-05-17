import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdAddTask } from "react-icons/md";
import toast from "react-hot-toast";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim() === "") {
      toast.error("Checklist item can't be empty");
      return;
    }

    if (todoList.includes(option.trim())) {
      toast.error("Item already exists");
      return;
    }

    const newList = [...todoList, option.trim()];
    setTodoList(newList);
    setOption("");
    toast.success("Checklist item added");
  };

  const handleRemoveOption = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
    toast("Item removed", { icon: "🗑️" });
  };

  return (
    <div>
      {todoList.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex justify-between bg-gray-50 border border-gray-200 rounded-md py-2 px-3 shadow-sm mb-2"
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-medium mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>
          <button
            className="cursor-pointer text-gray-400 hover:text-red-500"
            onClick={() => handleRemoveOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex items-center justify-between gap-5 mt-4">
        <input
          type="text"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          placeholder="Enter Task"
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={handleAddOption}
          className="card-btn text-nowrap"
        >
          <MdAddTask className="text-lg mr-1" />
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
