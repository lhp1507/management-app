<template>
  <div class="form-container">
    <b-form @submit="onSubmit" v-if="show">
      <!-- Tên đăng nhập - username -->
      <b-form-group
        id="input-group-username"
        label="Tên đăng nhập"
        label-for="input-username"
        class="text-success font-weight-bold col-lg-6 d-block pl-0"
      >
        <b-form-input
          id="input-username"
          v-model="form.username"
          placeholder="Nhập tên đăng nhập"
          autocomplete="off"
          :disabled="isEdit == 'true'"
          required
        ></b-form-input>
        <div
          v-if="isExisted && isEdit == 'false'"
          class="text-left text-danger font-weight-normal alert-danger p-1 mt-2"
        >
          Tên đăng nhập này đã được sử dụng.
        </div>
      </b-form-group>
      <!-- Tên nhân viên - firstname -->
      <b-form-group
        id="input-group-firstname"
        label="Tên nhân viên"
        label-for="input-firstname"
        class="text-success font-weight-bold col-lg-6 d-inline-block pl-0"
      >
        <b-form-input
          id="input-firstname"
          v-model="form.firstname"
          placeholder="Nhập tên"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>
      <!-- Họ nhân viên - lastname -->
      <b-form-group
        id="input-group-lastname"
        label="Họ nhân viên"
        label-for="input-lastname"
        class="text-success font-weight-bold col-lg-6 d-inline-block pr-0"
      >
        <b-form-input
          id="input-lastname"
          v-model="form.lastname"
          placeholder="Nhập họ"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-status">
        <b-form-checkbox
          id="checkbox-status"
          v-model="form.status"
          name="checkbox-status"
          value="1"
          unchecked-value="0"
        >
          Trạng thái
        </b-form-checkbox>
      </b-form-group>

      <div class="button-group text-right">
        <b-button
          v-if="isEdit == 'false'"
          type="submit"
          variant="success"
          style="width: 100px"
          class="mr-3"
          >Tạo</b-button
        >
        <b-button
          v-else
          type="submit"
          variant="success"
          style="width: 100px"
          class="mr-3"
          >Cập nhật</b-button
        >
        <b-button
          type="button"
          variant="success"
          @click.prevent="onCancel"
          style="width: 100px"
          >Hủy</b-button
        >
      </div>
    </b-form>
  </div>
</template>