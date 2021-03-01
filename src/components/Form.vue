<template>
  <div class="form-container">
    <b-form @submit="onSubmit">
      <b-form-group

        class="text-success font-weight-bold col-lg-6 d-block pl-0"
        v-for="input in inputs"
        :key="input.id"
        v-slot:default="slotScope"
      >
        <slot :name="slotName" v-bind="slotScope"></slot>
      </b-form-group>
    </b-form>
  </div>
</template>