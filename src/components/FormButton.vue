<template>
  <div>
    <!-- Form button group -->
    <b-button @click.prevent="onClick" :variant="variant" :type="typeBtn">
      <slot>Button</slot>
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
    },
    variant: {
      type: String,
    },
    typeBtn: {
      type: String,
    },
  },
};
</script>