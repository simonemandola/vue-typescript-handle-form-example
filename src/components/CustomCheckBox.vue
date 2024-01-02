<script setup lang="ts">

import {computed} from "vue"

interface Props {
  modelValue: boolean,
  text?: string,
  checked?: boolean,
  error?: string,
}
const props = withDefaults(defineProps<Props>(), {
  text: "I agree to Terms and conditions and Privacy Policy",
  error: "",
})

const emit = defineEmits(["update:modelValue"])

const existError = computed(()=> {
  return props.error.length > 0
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  }
})

</script>

<template>
  <div class="custom-checkbox">
    <label>
      <input type="checkbox" v-model="value">
      <span>{{ props.text }}</span>
    </label>
    <Transition name="fade">
      <p v-if="existError" class="error-message">{{ props.error }}</p>
    </Transition>
  </div>
</template>
