<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            HCMUE - Công nghệ Web ❤️
          </v-list-item-title>
          <v-list-item-subtitle>
            MEVN Stack App
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <a href="https://hcmue.edu.vn/vi/"><img class="img-hcmue-app" src="https://hcmue.edu.vn/images/106116969_306361297423538_2421300353161578289_n.png"/></a>
        </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'TRANG CHỦ', icon: 'mdi-home', link: '/' },
        { title: 'TẠO MỚI', icon: 'mdi-note-plus', link: '/add-post' },
        { title: 'LIÊN HỆ', icon: 'mdi-contacts', link: '/contact' },
        { title: 'LỊCH', icon: 'mdi-calendar', link: '/calendar' },
        { title: 'GIỚI THIỆU', icon: 'mdi-help-box', link: '/about' },
      ], 
    }),
  }
</script>
<style>
.img-hcmue-app{
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 130px;
  height:40px;
}
</style>