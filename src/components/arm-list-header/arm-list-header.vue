<template>
  <div>
    <b-row no-gutters class="pl-3 pr-3 align-items-center mb-4">
      <b-col class="col-6" style="font-size: 2rem">
        <slot name="list-title">{{ msgTitle }}</slot>
      </b-col>
      <b-col class="col-6 d-flex justify-content-end">
        <button
          class="btn btn-success w-auto"
          @click="handleCreate"
          :class="[isAdmin == 'true' ? 'd-block' : 'd-none']"
        >
          <slot name="list-create-btn">{{ msgBtn }}</slot>
        </button>
      </b-col>
    </b-row>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped="true"></style>
