<script setup lang="ts">
import {ref} from "vue"
import CustomInput from "./components/CustomInput.vue"
import CustomTextArea from "@/components/CustomTextArea.vue"
import CustomCheckBox from "@/components/CustomCheckBox.vue"
import {validateForm} from "@/lib/validations.ts"
import type {Errors} from "@/lib/validations.model.ts"

const name = ref("")
const surname = ref("")
const email = ref("")
const phone = ref("")
const message = ref("")
const terms = ref(false)
const errors: Errors = ref({})

function resetForm(): void {
  name.value = ""
  surname.value = ""
  email.value = ""
  phone.value = ""
  message.value = ""
  terms.value = false
  errors.value = {}
}

function submitForm(): void {
  const resultValidation = validateForm(
      name.value,
      surname.value,
      email.value,
      phone.value,
      message.value,
      terms.value,
  )

  if (resultValidation.result) {
    alert("Form sent!")
    resetForm()
  } else {
    errors.value = resultValidation.errors
  }

}
</script>

<template>
  <h1>Contact form</h1>
  <p>Fill out the form below to contact us.</p>
  <form class="form" @submit.prevent>
    <div class="form__row">
      <CustomInput
          placeholder="Name"
          v-model="name"
          :error="errors.name"
      />
      <CustomInput
          placeholder="Surname"
          v-model="surname"
          :error="errors.surname"
      />
    </div>
    <div class="form__row">
      <CustomInput
          type="email"
          placeholder="e-mail"
          v-model="email"
          :error="errors.email"
      />
      <CustomInput
          type="tel"
          placeholder="12345678"
          v-model="phone"
          :error="errors.phone"
      />
    </div>
    <CustomTextArea v-model="message" placeholder="Write a message." :error="errors.message" />
    <CustomCheckBox v-model="terms" :error="errors.terms" />
    <button type="submit" @click.prevent="submitForm">Send</button>
  </form>
</template>