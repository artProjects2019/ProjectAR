<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label>Username</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label>E-mail</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
              ></span>
              Sign up
            </button>
          </div>
        </div>
      </Form>
      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
      <div id="link_container">
        <div id="link1">
          <router-link to="./login">
            <font-awesome-icon icon="sign-in-alt" /> Log in
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
          .string()
          .required("Username is required!")
          .min(4, "Must be at least 4 characters!")
          .max(15, "Must be maximum 15 characters!"),
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(64, "Must be maximum 64 characters!"),
      password: yup
          .string()
          .required("Password is required!")
          .min(8, "Must be at least 8 characters!")
          .max(20, "Must be maximum 20 characters!"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    created(){
      setTimeout( () => this.$router.push({ path: '/confirm'}), 5000);
    },

    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
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

<style>

:root{
  --primary: #4CAF50 !important;
}
.btn-primary {
  background-color: #4CAF50 !important;
  border-color: #4CAF50 !important;
}

.btn-primary:hover {
  background-color: #106900 !important;
  border-color: #106900 !important;
}

.alert {
  white-space: pre-wrap;
}

</style>