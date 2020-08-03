<template>
    <div class="">
        <vue-headful
            title="Авторизация | Zinderland"
        />
        <form class="form">
            <div class="form__control">
                <label for="login">Введите логин</label>
                <input type="text" id="login" name="login" v-model="login" placeholder="Логин..">
            </div>
                <div class="form__control">
                    <label for="pass">Введите пароль</label>
                    <input type="text" id="pass" name="pass" v-model="pass" placeholder="Пароль..">
                </div>
                    <div class="form__control">
                        <input type="submit" id="submit" name="submit" value="Войти">
                    </div>

        </form>
    </div>
</template>

<script>
    export default {
        name: "NotFoundPage"
    }
</script>
