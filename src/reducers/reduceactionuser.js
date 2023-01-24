export default (state,action) => {
    switch(action.type) {
        case "email":
            return {
                verified: action.payload
            };
        default:
            return state;
    }
};