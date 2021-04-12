<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your Email</label>
      <input @blur="clearEmailError" type="email" id="email" v-model.trim="email.value"/>
      <p class="errors" v-if="!email.valid">
        You must enter a valid email address.
      </p>
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea @blur="clearMsgError" rows="5" id="message" v-model.trim="msg.value"/>
      <p class="errors" v-if="!msg.valid">
        You must enter a message to the coach.
      </p>
    </div>
    <div>
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      email: {
        value: '',
        valid: true,
      },
      msg: {
        value: '',
        valid: true,
      },
      formValid: true,
    };
  },
  methods: {
    ...mapActions('requests', {
        addRequest: 'addRequest'
    }),
    clearMsgError() {
      if (this.msg.value !== '') {
        this.msg.valid = true;
      } else {
        this.msg.valid = false;
      }
    },
    clearEmailError() {
      if (this.email.value === '' | !this.email.value.includes('@')) {
        this.email.valid = false;
      } else {
        this.email.valid = true;
      }
      console.log("email val:",this.email.value,"state:",this.email.valid)
    },
    submitForm() {
      this.formValid = true;
      if ((this.email.value === '') | !this.email.value.includes('@')) {
        this.email.valid = false;
        this.formIsValid = false;
        return;
      }
      if (this.msg.value === '') {
        this.msg.valid = false;
        this.formIsValid = false;
        return;
      }
      let formData = {
          msg: this.msg.value,
          email: this.email.value,
          coachId: this.$route.params.id
      }
      this.addRequest(formData);

      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped lang="css" src="../../styles/contact-coach.css"/>