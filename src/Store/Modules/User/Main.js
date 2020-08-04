import axios from 'axios'

const API_Url = 'https://zinder.ml/';

export default {
    actions: {
        UserAuth({commit}, [UserLogin, UserPass]) {
            axios.post(API_Url + 'user.auth?user_login=' + UserLogin + '&user_pass=' + UserPass)
                .then(res => {
                    const UserID = res.data.response.user_id;
                    const UserToken = res.data.response.user_token;
                    commit('SetUserAuth', {UserID, UserToken});
                })
                .catch(error => {
                    const AuthError = error.message;
                    commit('SetUserAuthError', AuthError)
                });
        },


        GetAllUsers({commit}) {
            axios.get(API_Url + 'user.get')
                .then((response) => {
                    const userRes = response.data.response;
                    commit('GetAllUsers', userRes)
                })
                .catch(error => {
                    const Error = error.message;
                    commit('GetUserError', Error)
                });
        },
        GetUserByID({commit}, userID) {
            axios.get(API_Url + 'user.get?user_id=' + userID)
                .then((response) => {
                    const userRes = response.data.response;
                    commit('GetUserByID', userRes)
                })
                .catch(error => {
                    const Error = error.message;
                    commit('GetUserError', Error)
                });
        },
    },
    mutations: {
        SetUserAuth(state, {UserID, UserToken}) {
            state.User.UserAuthStatus = true;
            state.User.UserID = UserID;
            state.User.UserToken = UserToken;
            localStorage.setItem('user_auth', true);
            localStorage.setItem('user_id', UserID);
            localStorage.setItem('user_token', UserToken);
        },
        SetUserAuthError(state, AuthError) {
            state.Auth.AuthError = AuthError;
        },

        GetAllUsers (state, userRes) {
            state.AllUsers = userRes;
        },
        GetUserByID (state, userRes) {
            state.UserByID = userRes;
        },


        GetUserError (state, Error) {
            state.GetUserError = Error;
        },
    },
    state: {
        Auth: {
            AuthError: null,
            AuthRes: false
        },
        AllUsers: [],
        UserByID: [],
        GetUserError: '',
        User: {
            UserAuthStatus: null,
            UserID: null,
            UserToken: null,
        }
        // users: []
    },
    getters: {
        /**
         * @return {boolean}
         */
        GetUserAuthStatus(state) {
            return state.User.UserAuthStatus;
        },
        /**
         * @return {null}
         */
        GetUserAuthError(state) {
            return state.Auth.AuthError;
        },

        GetAllUsers(state) {
            return state.AllUsers;
        },
        GetUserByID(state) {
            return state.UserByID;
        },
        GetUserError(state) {
            return state.GetUserError;
        },

    }
}
