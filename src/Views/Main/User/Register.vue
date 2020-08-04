<template>
    <div class="auth__page content">
        <vue-headful
        title="Авторизация | Zinderland"
        />
        <form class="form" @submit.prevent="regForm()">

            <div class="danger-alert" v-if="Errors.length">
                <h3>Ошибка регистрации</h3>
                <li style="list-style: disc;" v-for="(error, index) in Errors" :key="index">
                    {{ error.error_message }}
                </li>
            </div>

            <div class="form__control">
                <label for="email">Введите e-mail</label>
                <input type="email" id="email" name="email" v-model="userEmail" placeholder="Email.." class="form__control-input">
            </div>
            <div class="form__control">
                <label for="login">Введите логин</label>
                <input type="text" id="login" name="login" v-model="userLogin" placeholder="Логин.." class="form__control-input">
            </div>
            <div class="form__control">
                <label for="pass">Введите пароль</label>
                <input type="password" id="pass" name="pass" v-model="userPass" placeholder="Пароль.." class="form__control-input">
            </div>
            <div class="form__control">
                <label for="checkPass">Повторите пароль</label>
                <input type="password" id="checkPass" name="checkPass" v-model="userCheckPass" placeholder="Повторите пароль.." class="form__control-input">
            </div>
            <div class="form__control">
                <label for="checkbox">Регистрируясь, я соглашаюсь с политикой конфиденциальности</label>
                <input type="checkbox" id="checkbox" name="checkbox" v-model="checkbox" class="form__control-input">
            </div>
            <div class="form__control form__bottom-link">
                <ul class="bottom-link__list">
                    <router-link to="/register" class="bottom-link__item">Автоизация</router-link>
                </ul>
                <input type="submit" id="submit" name="submit" value="Войти" class="form__control-btn">
            </div>

        </form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Register",
        data() {
            return {
                userEmail: '',
                userLogin: '',
                userPass: '',
                userCheckPass: '',
                checkbox: false,
                authDone: false,
                Errors: []
            }
        },
        computed: mapGetters(['GetUserAuthStatus', 'GetUserAuthError']),
        methods: {
            regForm: function () {
                if (this.checkbox) {
                    let Email = this.userEmail,
                    Login = this.userLogin,
                    Pass = this.userPass,
                    CheckPass = this.userCheckPass;
                    this.$store.dispatch('UserReg', [Email, Login, Pass, CheckPass]);
                    
                    if (!this.GetUserAuthError) {
                        this.authDone = true;
                        this.$router.go(-1);
                    } else {
                        this.authDone = false;
                    }
                } else {
                    this.Errors.push({'error_message': 'Чекбокс обязательно выделить'});
                }
            }
        },
    }
</script>
