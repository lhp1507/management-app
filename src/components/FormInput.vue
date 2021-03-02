<template>
  <div>
    <!-- Form input group -->
    <b-form-group
      :id="`input-group-${id}`"
      :label="label"
      :label-for="$props.labelFor"
    >
      <slot :name="id"></slot>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    label: { type: String },
    labelFor: { type: String, required: true },
  },
};
</script>