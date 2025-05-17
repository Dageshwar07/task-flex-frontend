import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdAddTask } from "react-icons/md";
import toast from "react-hot-toast";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  // Function to handle adding attachments
  const handleAddOption = () => {
    if (option.trim() === "") {
      toast.error("Attachment can't be empty");
      return;
    }

    if (attachments.includes(option.trim())) {
      toast.error("Attachment already exists");
      return;
    }

    const newList = [...attachments, option.trim()];
    setAttachments(newList);
    setOption("");
    toast.success("Attachment added");
  };
  // Function to handle removing attachments
  const handleRemoveOption = (index) => {
    const updatedList = attachments.filter((_, i) => i !== index);
    setAttachments(updatedList);
    toast("Attachment removed", { icon: "🗑️" });
  };
  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex justify-between bg-gray-50 border border-gray-200 rounded-md py-2 px-3 shadow-sm mb-2"
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black">{item}</p>
          </div>

          <button
            className="cursor-pointer text-gray-400 hover:text-red-500"
            onClick={() => handleRemoveOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between gap-5 mt-4">
        <div className="flex-1 flex items-center gap-3  rounded-md px-3 ">
          <LuPaperclip className="text-gray-400" />

          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <MdAddTask className=" mr-1 text-lg" />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
