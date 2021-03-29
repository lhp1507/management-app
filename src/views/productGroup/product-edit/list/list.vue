<template>
  <div class="form-container">
    <!-- Component -->
    <b-form @submit="onSubmit" @reset="onCancel">
      <ArmForm :layout="layout" v-model="form" />
    </b-form>
    <!-- Component -->
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped="true"></style>
