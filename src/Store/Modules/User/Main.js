import axios from 'axios'
import qs from 'qs';

const API_Url = 'https://zinder.ml/';

export default {
    actions: {
        UserAuth({commit}, [UserLogin, UserPass]) {
            let data = {
                'user_login':UserLogin, 
                'user_pass': UserPass
            };
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url: API_Url + 'user.auth'
            };
            axios(options)
            .then(res => {
                const UserID = res.data.response.user_id;
                const UserToken = res.data.response.user_token;
                commit('SetUserAuth', {UserID, UserToken});
            })
            .catch(error => {
                if(error.response){
                    const AuthError = error.response.data.error;
                    commit('SetUserAuthError', AuthError);
                }
            });
        },

        UserReg({commit}, [UserEmail, UserLogin, UserPass, UserCheckPass]) {
            let data = {
                'user_email':UserEmail, 
                'user_login': UserLogin,
                'user_pass':UserPass, 
                'user_check_pass': UserCheckPass
            };
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url: API_Url + 'user.register'
            };
            axios(options)
            .then(res => {
                const UserID = res.data.response.user_id;
                const UserToken = res.data.response.user_token;
                commit('SetUserAuth', {UserID, UserToken});
            })
            .catch(error => {
                if(error.response){
                    const AuthError = error.response.data.error;
                    commit('SetUserAuthError', AuthError);
                }
            });
        },

        UserExit({commit}, [UserID, UserToken]) {
            axios.get(API_Url + 'user.exit?user_id=' + UserID + '&user_token=' + UserToken)
            .then(commit('SetUserExitRes'))
            .catch(error => {
                if(error.response){
                    const AuthError = error.response.data.error;
                    commit('SetUserAuthError', AuthError);
                }
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
            state.UserAuth.AuthError = null;
            state.UserAuth.AuthRes.UserAuthStatus = true;
            state.UserAuth.AuthRes.UserID = UserID;
            state.UserAuth.AuthRes.UserToken = UserToken;
            localStorage.setItem('UserAuth', true);
            localStorage.setItem('UserID', UserID);
            localStorage.setItem('UserToken', UserToken);
        },
        SetUserAuthError(state, AuthError) {
            state.UserAuth.AuthError = AuthError;
        },

        SetUserExitRes(state) {
            state.UserAuth.AuthRes.UserAuthStatus = false;
            localStorage.removeItem("UserAuth");
            localStorage.removeItem("UserID");
            localStorage.removeItem("UserToken");
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
        UserAuth: {
            AuthError: null,
            AuthRes: {
                UserAuthStatus: localStorage.getItem('UserAuth'),
                UserID: null,
                UserToken: null,
            }
        },
        GetUserError: '',
        AllUsers: {},
        User: {
            UserID: null,
            UserLogin: null,
            UserEmail: null,
            UserRegDate: null,
            UserStatus: null,
        }
    },
    getters: {
        /**
        * @return {boolean}
        */
        GetUserAuthStatus(state) {
            return state.UserAuth.AuthRes.UserAuthStatus;
        },
        /**
        * @return {null}
        */
        GetUserAuthError(state) {
            return state.UserAuth.AuthError;
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
