import { toast } from "react-toastify";

const myFetch = async (url: string) => {
  try {
    const response = await fetch(url);
    const res = await response.json();
    return res;
  } catch (error) {
  toast.error("error fetch");
  }
  return false;
};

export { myFetch };
