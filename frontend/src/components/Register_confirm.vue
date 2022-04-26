<template>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="handleConfirmation" :validation-schema="schema">
        <div class="form-group">
          <label>Confirmation token</label>
          <Field name="token" type="text" class="form-control" />
          <ErrorMessage name="token" class="error-token" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
            ></span>
            <span>Confirm</span>
          </button>
        </div>
      </Form>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>


    </div>
  </div>
</template>

<script>
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register_confirm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      token: yup.string(),
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
      setTimeout( () => this.$router.push({ path: '/login'}), 3000);
    },

    handleConfirmation(token) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/confirm", token).then(
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
}
</script>