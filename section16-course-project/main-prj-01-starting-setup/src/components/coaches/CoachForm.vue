<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.valid }">
      <label for="firstname">First Name</label>
      <input
        @blur="clearError('firstName')"
        type="text"
        name="firstname"
        id="firstname"
        v-model.trim="firstName.value"
      />
      <p class="error" v-if="!firstName.valid">
        First Name is a required field.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.valid }">
      <label for="lastname">Last Name</label>
      <input
        @blur="clearError('lastName')"
        type="text"
        name="lastname"
        id="lastname"
        v-model.trim="lastName.value"
      />
      <p class="error" v-if="!lastName.valid">Last Name is a required field.</p>
    </div>
    <div class="form-control" :class="{ invalid: !desc.valid }">
      <label for="description">Description</label>
      <textarea
        @blur="clearError('desc')"
        name="description"
        id="description"
        row="5"
        v-model.trim="desc.value"
      />
      <p class="error" v-if="!desc.valid">Description is a required field.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.valid }">
      <label for="rate">Hourly Rate</label>
      <input
        @blur="clearError('rate')"
        type="number"
        name="rate"
        id="rate"
        v-model.number="rate.value"
      />
      <p class="error" v-if="!rate.valid">Hourly Rate is a required field.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.valid }">
      <h3>Areas of expertises</h3>
      <div>
        <input
          @blur="clearError('areas')"
          type="checkbox"
          id="frontend"
          name="frontend"
          value="frontend"
          v-model="areas.value"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          @blur="clearError('areas')"
          type="checkbox"
          id="backend"
          name="backend"
          value="backend"
          v-model="areas.value"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          @blur="clearError('areas')"
          type="checkbox"
          id="career"
          name="career"
          value="career"
          v-model="areas.value"
        />
        <label for="career">Career</label>
      </div>
      <p class="error" v-if="!areas.valid">
        Please select at least one area you are proficient in.
      </p>
    </div>
    <p class="error" v-if="!formIsValid">
      Errors detected. Please check the form and try again.
    </p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: { value: '', valid: true },
      lastName: { value: '', valid: true },
      desc: { value: '', valid: true },
      rate: { value: null, valid: true },
      areas: { value: [], valid: true },
      formIsValid: true,
    };
  },
  methods: {
    clearError(input) {
      if (this[input].value !== '') {
        this[input].valid = true;
      } else {
        this[input].valid = false;
      }
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.value === '') {
        this.firstName.valid = false;
        this.formIsValid = false;
      }
      if (this.lastName.value === '') {
        this.lastName.valid = false;
        this.formIsValid = false;
      }
      if (this.desc.value === '') {
        this.desc.valid = false;
        this.formIsValid = false;
      }
      if (this.rate.value < 0 || !this.rate.value) {
        this.rate.valid = false;
        this.formIsValid = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.valid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.desc.value,
        hourlyRate: this.rate.value,
        areas: this.areas.value,
      };
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped lang="css" src="../../styles/coach-form.css"/>