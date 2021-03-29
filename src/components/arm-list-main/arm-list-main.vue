<template>
  <div>
    <b-row no-gutters class="user-table mt-3">
      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
        stacked="md"
        show-empty
        head-variant="light"
        ref="table"
      >
        <template
          v-for="slotName in Object.keys($scopedSlots)"
          v-slot:[slotName]="slotScope"
        >
          <slot :name="slotName" v-bind="slotScope"></slot>
        </template>
      </b-table>
    </b-row>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped="true"></style>
