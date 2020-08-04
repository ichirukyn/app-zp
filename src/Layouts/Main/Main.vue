<template>
  <div class="main">
    <vue-headful title="Главная | Zinderland" />
    <header class="main__header">
      <div class="header-section first-section">
        <div class="header__first-section">
          <router-link class="first-section_item" to="/register" v-if="!GetUserAuthStatus">Регистрация</router-link>
          <router-link class="first-section_item" to="/auth" v-if="!GetUserAuthStatus">Вход</router-link>
          <li @click="userExit" class="first-section_item" to="" v-if="GetUserAuthStatus">Выйти</li>
          <router-link class="first-section_item" to="">Помощь</router-link>
          <router-link class="first-section_item" to="">О нас</router-link>
          <router-link class="first-section_item" to="">FAQ</router-link>
        </div>
      </div>
      <div class="header-section second-section">
        <div class="header__second-section">
          <div class="logo_wrapper">
            <i class="fas fa-infinity logo-img"></i>
            <router-link class="logotype" to="/">Zinderland</router-link>
          </div>
          <div class="second-navbar">
            <router-link class="second-section_item" to="/" exact-active-class="header-active__link">Главная</router-link>
            <router-link class="second-section_item" to="/news" exact-active-class="header-active__link">Новости</router-link>
            <router-link class="second-section_item" to="/wiki" exact-active-class="header-active__link">Вики</router-link>
            <router-link class="second-section_item" to="/people" exact-active-class="header-active__link">Сообщество</router-link>
            <router-link class="second-section_item" to="/something" exact-active-class="header-active__link">Что-то</router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="main__body">
      <router-view />
    </div>
    <div class="main__footer">
      <div class="footer-section">
        <div class="footer__column footer__brand">
          <div class="logo_wrapper">
            <i class="fas fa-infinity logo-img"></i>
            <router-link class="logotype" to="/">Zinderland</router-link>
          </div>
          <span class="small copyright">©Zinderland 2019-2020</span>
          <!--        <ul class="our-social-contacts">-->
            <!--          <li class="social-contact-item"><router-linkto=""><img src="../img/social/VK.svg" alt=""></router-link></li>-->
            <!--        </ul>-->
          </div>

          <ul class="footer__column">
            <li class="column__title-item"><span>Игра</span></li>
            <li class="column__item"><router-link to="">История мира</router-link></li>
            <li class="column__item"><router-link to="">Перснонажи</router-link></li>
            <li class="column__item"><router-link to="">Предметы</router-link></li>
            <li class="column__item"><router-link to="">Помощь в начале</router-link></li>
          </ul>

          <ul class="footer__column">
            <li class="column__title-item"><span>Проект</span></li>
            <li class="column__item"><router-link to="">О нас</router-link></li>
            <li class="column__item"><router-link to="">Набор в команду</router-link></li>
            <li class="column__item"><router-link to="">Политика конфиденциальности</router-link></li>
            <li class="column__item"><router-link to="">Правила и условия</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </template>

  <script>
    import {mapGetters} from 'vuex';

    export default {
      name: "MainLayout",
      computed: mapGetters(['GetUserAuthStatus', 'GetUserAuthError']),
      methods: {
        userExit: function () {
          let UserID = localStorage.getItem('UserID'),
          UserToken = localStorage.getItem('UserToken');
          this.$store.dispatch('UserExit', [UserID, UserToken]);

          if (!this.GetUserAuthError) {
            this.authDone = true;
            this.$router.go('/');
          } else {
            this.authDone = false;
          }
        },
      },
    };
  </script>

  <style>
  @import "../../assets/land_main.css";
</style>
