import React, { useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import { useRef, useState } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the image state
      setImage(file);

      //Generate a preview URL from file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
      inputRef.current.click();
    
  };

  useEffect(() => {
    // Cleanup function to revoke the object URL when component unmounts or preview changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />
      {!image ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center group">
            <LuUser className="text-4xl text-purple-800" />
            <button
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center bg-purple-800 text-white rounded-full shadow-lg hover:bg-purple-900 transition-colors"
              onClick={onChooseFile}
            >
              <LuUpload className="text-sm" />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-28 h-28">
          <img
            src={previewUrl || URL.createObjectURL(image)}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-purple-800"
          />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-purple-800 text-white rounded-full shadow-lg hover:bg-purple-900 transition-colors"
            onClick={handleRemoveImage}
          >
            <LuTrash className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
