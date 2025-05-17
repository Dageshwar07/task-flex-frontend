import React, { useState } from 'react';
import { LuUser } from 'react-icons/lu';
import clsx from 'clsx'; // For cleaner class name management

const ProfileImage = ({
  src,
  alt = "Profile",
  size = "medium",
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-20 h-20',
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const combinedClassNames = clsx(
    sizeClasses[size],
    className,
    'rounded-full object-cover'
  );

  if (imageError || !src) {
    return (
      <div className={clsx(combinedClassNames, 'bg-gray-100 flex items-center justify-center')}>
        <LuUser className={`${size === 'large' ? 'text-4xl' : 'text-xl'} text-gray-400`} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleImageError}
      className={combinedClassNames}
    />
  );
};

export default ProfileImage;
