const global_state ={
    
   doctors:[]
       
};
const reducer = (state = global_state, action) => {
    const newState = {
    doctors:state.doctors.slice()
    };
    
    if (action.type === 'existingDocs') {
        newState.doctors = action.data;
    }
        if(action.type === 'addnewdoc')
    {
        newState.doctors.push(action.data);
        localStorage.setItem("docsList", "");
        localStorage.setItem("docsList", JSON.stringify(newState.doctors));
    }

    if(action.type === 'editdoc')
    {
        newState.doctors.splice(action.id,1,action.data);
        localStorage.setItem("docsList", "");
        localStorage.setItem("docsList", JSON.stringify(newState.doctors));
    }
    if(action.type === 'removedoc')
    {
        newState.doctors.splice(action.id,1); 
    }
    return newState;
}

export default reducer;