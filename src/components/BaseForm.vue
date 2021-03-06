<template>
  <div>
    <div v-for="(item, name) in layout" :key="name">
      <template v-if="name === 'input'">
        <b-form-row>
          <b-col
            no-gutters
            :cols="value.ui.cols"
            v-for="(value, key) in item"
            :key="key"
          >
            <b-form-group
              :id="key"
              :label="value.ui.label"
              :label-for="key"
              :style="value.ui.styleObj"
              :class="value.ui.classObj"
            >
              <b-form-input
                v-if="value.type === 'text'"
                :id="key"
                :placeholder="value.ui.placeholder"
                :autocomplete="value.ui.autocomplete"
                :disabled="value.ui.disabled"
              ></b-form-input>

              <b-form-checkbox
                v-else-if="value.type === 'checkbox'"
                :value="value.checkedValue"
                :unchecked-value="value.uncheckedValue"
                :style="value.ui.styleObj"
                :class="value.ui.classObj"
              >
                {{ value.ui.msg }}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>

      <template v-else-if="name === 'buttons'">
        <div class="d-flex justify-content-end">
          <b-button
            v-for="(value, key) in item"
            :key="key"
            :type="value.type"
            :variant="value.ui.variant"
            :style="value.ui.styleObj"
            :class="value.ui.classObj"
            @click="value.onClick"
          >
            {{ value.ui.msg }}
          </b-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    layout: { type: Object },
  },
};
</script>

<style>
</style>