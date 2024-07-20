import axios from 'axios';

export const callSignup = async (user) => {
  try {
    const response = await axios.post("http://localhost:1234/signup", user); // Change port to 1234
    return response.data;
  } catch (err) {
    console.error('Error during signup:', err);
    // Return a more informative error message
    return { error: err.response ? err.response.data.error : 'Network Error: Unable to connect to the server.' };
  }
};

// Other service functions remain unchanged


export const callSignin = async (user) => {
  try {
    const response = await axios.post("http://localhost:1111/signin", user);
    if (response.data.user) {
      sessionStorage.setItem('logged', response.data.user.username);
      window.location.assign("/home");
    }
  } catch (err) {
    console.error(err);
    return "An error occurred while signing in.";
  }
};

export const callGet = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;  // Ensure only the data part is returned
  } catch (err) {
    console.error(err);
    return "An error occurred while fetching data.";
  }
};



export const callDelete = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (err) {
    console.error(err);
    return "An error occurred while deleting data.";
  }
};

export const callPost = async (url, object) => {
  try {
    const response = await axios.post(url, object);
    return response;  // Return the whole response object
  } catch (err) {
    console.error(err);
    return "An error occurred while posting data.";
  }
};


export const callFetchOne = async (url, id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return "An error occurred while fetching data.";
  }
};


export const callUpdate = async (url, object) => {
  try {
    const response = await axios.put(url, object);
    return response.data;
  } catch (err) {
    console.error(err);
    return "An error occurred while updating data.";
  }
};
