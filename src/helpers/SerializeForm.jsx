export const SerializeForm = (form) => {
    const formData = new FormData(form);
    const object = {};
    for(let [name, value] of formData){
        object[name] = value;
    }
    return object;
    
}
