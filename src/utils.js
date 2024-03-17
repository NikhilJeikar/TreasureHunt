export const SetCookies = (key,value) => {
  localStorage.setItem(key, value);
};

export const readCookies = (key) => {
    const value = localStorage.getItem(key)
    return value
    
  }
