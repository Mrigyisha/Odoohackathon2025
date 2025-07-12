const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
export const uploadToImgBB = async (file: File): Promise<string> => {
  const API_KEY = IMGBB_API_KEY; 
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!data.success) throw new Error("Image upload failed");

  return data.data.url;
};
