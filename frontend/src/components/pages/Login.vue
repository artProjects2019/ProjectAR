<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label>Username</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
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
            <span>Log in</span>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    handleLogin(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
          (data) => {
            this.message = (data.response &&
                    data.response.data &&
                    data.response.data.message) ||
                data.message ||
                data.toString();
            this.successful = true;
            this.loading = true;
            this.$router.push("/");
          },
          (error) => {
            this.message = error.response.data;
            this.successful = false;
            this.loading = false;
          }
      );
    },
  },
};
</script>
