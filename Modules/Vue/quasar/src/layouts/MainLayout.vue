
<script setup>
import { ref } from "vue";
import SidebarComponent from "components/Drawers/SidebarComponent.vue";
import { sidebarLink } from "layouts/data/sidebar/sidebarList";

defineOptions({
  name: "MainLayout",
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<!-- <sidebar-component :items="linksList"></sidebar-component> -->
<template>
  <q-layout view="lHh lpR fFf">
    <q-header bordered class="bg-orange-9 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://www.svgrepo.com/show/227265/lemon.svg" />
          </q-avatar>
          Lemonshop CRM
        </q-toolbar-title>
        <q-space />

        <q-btn round flat>
          <q-avatar size="26px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-tooltip>Account</q-tooltip>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <!-- <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
              </div>

              <q-separator vertical inset class="q-mx-lg" /> -->

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  href="/v2/logout"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :overlay="false"
    >
      <!-- drawer content -->
      <sidebar-component :items="sidebarLink"></sidebar-component>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.path" />
    </q-page-container>
  </q-layout>
</template>
