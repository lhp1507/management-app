<template>
  <div>
    <b-form-group
      :id="`input-group-${id}`"
      :label="label"
      :label-for="`input-${id}`"
    >
      <slot :id="`input-${id}`" :name="id"></slot>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
  },
};
</script>