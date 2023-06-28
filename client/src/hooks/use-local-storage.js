const useLocalStorage = (key) => {
    const item = {
        value: localStorage.getItem(key),
        set: function (value) {
            localStorage.setItem(key, value);
        },
        remove: function () {
            localStorage.removeItem(key);
        },
    };
    return item;
};
export default useLocalStorage;
