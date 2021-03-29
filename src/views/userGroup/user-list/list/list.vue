<template>
  <div class="list-container">
    <ArmListHeader
      msgTitle="Danh sách người dùng"
      msgBtn="Tạo người dùng"
      :handleCreate="handleCreate"
      :isAdmin="isAdmin"
    />
    <b-row no-gutters class="pl-3 pr-3">
      <b-col class="page-size col-2">
        <b-form-group class="mb-0">
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col class="spacer-col col-7"></b-col>
      <b-col class="search col-3">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Tìm kiếm"
            ></b-form-input>
            <b-input-group-append>
              <button
                class="btn btn-success"
                :disabled="!filter"
                @click="filter = ''"
              >
                Xóa
              </button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-alert v-if="error === 1" show variant="danger" class="mt-3 text-center">
      Không thể xóa tài khoản admin.
    </b-alert>
    <ArmListMain
      :items="getUsers"
      :fields="visibleFields"
      :currentPage="currentPage"
      :perPage="perPage"
      :filter="filter"
      :filterOn="filterOn"
      :onFiltered="onFiltered"
      pageOptions="pageOptions"
    >
      <template #cell(firstname)="row">
        {{ row.item.firstname }} {{ row.item.lastname }}
      </template>
      <template #cell(act)="data">
        <b-button
          size="sm"
          @click="viewCurrent(data.item)"
          class="mr-1"
          variant="primary"
        >
          Info
        </b-button>
        <b-button
          size="sm"
          @click="handleEdit(data.item)"
          class="mr-1"
          variant="warning"
        >
          Edit
        </b-button>
        <b-button size="sm" @click="deleteCurrent(data.item)" variant="danger">
          Delete
        </b-button>
      </template>
    </ArmListMain>

    <b-row no-gutters class="page-nav pr-3">
      <b-col class="col-3 pl-lg-3" align-self="center">
        Tổng số {{ totalRows }}
      </b-col>
      <b-col class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"
          class="mb-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped="true"></style>
