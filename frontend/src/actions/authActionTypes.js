// import ActionType from './src/ActionType';

/*
const AuthActionType = ActionType.getActionTypes([
    'LOGIN',
    'LOGOUT',
]);*/

const AuthActionType = {
    login: 'AUTH_LOGIN',
    logout: 'AUTH_LOGOUT',
    getUser: 'AUTH_GET_USER',
};

export { AuthActionType as default };