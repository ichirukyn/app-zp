import Vue from 'vue'
import Vuex from 'vuex'
import UserModules from './Modules/User/Main'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        UserModules,
    }
})
