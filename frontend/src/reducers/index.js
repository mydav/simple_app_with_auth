export default function (state={}, action) {
    switch(action.type){
        case "SET_USERBASE64":
            return {
                ...state,
                userToken: action.payload
            }
        default:
            return state
    }
}