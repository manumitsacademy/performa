const initialState= {
    user:{
        
    },
    subjects:[]
}
const Reducer = (state=initialState,action)=>{
    if(action.type==='UPDATEUSER'){
        return {...state,user:action.payload}
    }
    if(action.type==='UPDATESUBJECTS'){
        return {...state,subjects:action.payload}
    }
    return state;
}
export default Reducer;