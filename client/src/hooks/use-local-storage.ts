const useLocalStorage = (key: string) => {
  const item = {
    value: localStorage.getItem(key),

    set: function (value: string) {
      localStorage.setItem(key, value);
    },

    remove: function () {
      localStorage.removeItem(key);
    },
  };

  return item;
};

export default useLocalStorage;
