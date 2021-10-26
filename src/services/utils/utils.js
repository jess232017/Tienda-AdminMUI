export const fetchLocal = (_property, _default) =>{
    return localStorage.hasOwnProperty(_property) ? localStorage.getItem(_property) : _default;
}

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}