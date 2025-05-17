import axiosInstance from './axiosInstance';
import { API_PATHS } from './apiPaths';

const uploadImage = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
      throw new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed');
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', 'profile');

    // Get the authentication token from localStorage (or wherever it's stored)
    const token = localStorage.getItem('token');

    // If no token is found, throw an error
    if (!token) {
      throw new Error('You must be logged in to upload an image');
    }

    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, // Add the token in the header
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Upload progress:', percentCompleted);
      },
    });

    if (!response.data?.imageUrl) {
      throw new Error('Invalid response from server');
    }

    return response.data;
  } catch (error) {
    console.error('Image upload error:', error);

    // Handle error more gracefully by providing fallback messages
    const errorMessage = error.response?.data?.message || error.message || 'Failed to upload image';
    throw new Error(errorMessage);
  }
};

export default uploadImage;
