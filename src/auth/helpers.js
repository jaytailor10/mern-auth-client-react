//npm i js-cookie
//what is a callback function
import cookie from "js-cookie";
//set in cookie, key is withwhat name you wanna store the cookie// value is like what this key holds eg "enwnen4nerjnf"
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//remove from cookie

export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

//get from cookie such as stored cookie
//will be useful when we need to make request to server with token

export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

//set in localstorage// it is important to save info in localstorage as JSON
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove from localstorage

export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

//authenticate user by passing data to cookie and localstorage during signin

export const authenticate = (response, next) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
//access user info from localstorage

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

export const updateUser = (response, next) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
};
