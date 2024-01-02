<script setup lang="ts">
import {computed} from "vue"

interface Props {
  modelValue: string,
  placeholder: string,
  maxLength?: number,
  error?: string,
}
const props = withDefaults(defineProps<Props>(), {
  maxLength: 200,
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
  <div class="custom-textarea">
    <label>
      <textarea :maxlength="props.maxLength" :placeholder="props.placeholder" v-model="value" required />
    </label>
    <Transition name="fade">
      <p v-if="existError" class="error-message">{{ props.error }}</p>
    </Transition>
  </div>
</template>
