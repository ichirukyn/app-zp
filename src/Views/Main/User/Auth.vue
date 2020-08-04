<template>
    <div class="auth__page content">
        <vue-headful
        title="Авторизация | Zinderland"
        />
        <form class="form" @submit.prevent="authForm()">

            <div class="danger-alert" v-if="this.GetUserAuthError">
                <h3>Ошибка авторизации</h3>
                <p>Логин или пароль введены неверно!</p>
            </div>

            <div class="form__control">
                <label for="login">Введите логин</label>
                <input type="text" id="login" name="login" v-model="userLogin" placeholder="Логин.." class="form__control-input">
            </div>
            <div class="form__control">
                <label for="pass">Введите пароль</label>
                <input type="password" id="pass" name="pass" v-model="userPass" placeholder="Пароль.." class="form__control-input">
            </div>
            <div class="form__control form__bottom-link">
                <ul class="bottom-link__list">
                    <router-link to="/register" class="bottom-link__item">Регистрация</router-link>
                    <router-link to="" class="bottom-link__item">Забыли пароль?</router-link>
                </ul>
                <input type="submit" id="submit" name="submit" value="Войти" class="form__control-btn">
            </div>

        </form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Auth",
        data() {
            return {
                userLogin: '',
                userPass: '',
                authDone: false
            }
        },
        computed: mapGetters(['GetUserAuthStatus', 'GetUserAuthError']),
        methods: {
            authForm: function () {
                let Login = this.userLogin,
                Pass = this.userPass;
                this.$store.dispatch('UserAuth', [Login, Pass]);
                
                if (!this.GetUserAuthError) {
                    this.authDone = true;
                    this.$router.go(-1);
                } else {
                    this.authDone = false;
                }
            }
        },
    }
</script>
