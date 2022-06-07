<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
      />
      <Form @submit="handleNewPassword" :validation-schema="schema">
        <div class="form-group">
          <label>New Password</label>
          <Field name="newPassword" type="password" class="form-control" />
          <ErrorMessage name="newPassword" class="error-feedback" />
        </div>
        <div class="form-group">
          <label>Repeat password</label>
          <Field name="repeatPassword" type="password" class="form-control" />
          <ErrorMessage name="repeatPassword" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
            ></span>
            <span>Change password</span>
          </button>
        </div>
      </Form>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>

      <div id="link_container">
        <div id="link1">
          <router-link to="./register">
            <font-awesome-icon icon="user-plus" /> Create new account
          </router-link>
        </div>

        <div id="link2">
          <router-link to="./">
            <font-awesome-icon icon="home" /> Back
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Change_password",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const errorMessage = "passwords are not identical";
    const schema = yup.object().shape({
      newPassword: yup.string()
          .required("New password is required!"),
      repeatPassword: yup.string()
          .required("Repeat password!")
          .oneOf([yup.ref('newPassword')], errorMessage),
      username: yup.string(),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    logged() {
      return this.$store.state.auth.user.username;
    },
  },
  methods: {
    created(){
      setTimeout( () => this.$router.push({ path: '/'}), 3000);
    },
    handleNewPassword(changePasswordRequest) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      changePasswordRequest.username = this.logged;
      this.$store.dispatch("auth/newPassword", changePasswordRequest).then(
          (data) => {
            this.message = (data.response &&
                    data.response.data &&
                    data.response.data.message) ||
                data.message ||
                data.toString();
            this.successful = true;
            this.loading = true;
            this.created();
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
          }
      );
    },
  },
};
</script>

<style scoped>

</style>