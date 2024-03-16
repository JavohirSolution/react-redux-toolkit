export const setItem = (key, item) => {
    try {
        localStorage.setItem(key, item);
    } catch (error) {
        console.log("Error: " + error);
    }
}

export const getItem = key => {
    try {
        return localStorage.getItem(key)
    } catch (error) {
        console.log('Error getting data')
    }
}

export const removeItem = (key) => {
    try {
        return localStorage.removeItem(key);
    } catch (error) {
        console.log("Error removing item");
    }
}