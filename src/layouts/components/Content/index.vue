<template>
  <router-view :key="$route.fullPath" v-slot="{ Component, route }">
    <a-layout-content class="m-4 bg-white">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </a-layout-content>
  </router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
