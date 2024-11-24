<template>
  <div class="input-item">
    <input :type="type" required class="inputDiy" v-model="val" />
    <span class="bar"></span>
    <label class="labelInput">{{ label }}</label>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    // 默认使用 modelValue 来接受传递的值
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})

const val = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])
watch(val, (newVal) => {
  emit('update:modelValue', newVal) // 向父组件发送更新的事件
})
watch(
  () => props.modelValue,
  (newVal) => {
    val.value = newVal // 更新本地 val 的值
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
// material文本框
.input-item {
  position: relative;
  width: 20rem;
  height: 2.6rem;
  border: none;
  transition: all 0.3s ease-in-out;
  .inputDiy {
    width: 20rem;
    height: 2.6rem;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    color: #333;
    outline: none;
    transition: all 0.3s ease-in-out;
  }
  .bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #575656;
    transition: all 0.3s ease-in-out;
  }
  .labelInput {
    position: absolute;
    left: 0;
    top: 0;
    height: 2.6rem;
    line-height: 2.6rem;
    color: #959191;
    font-size: 14px;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
  }
  .inputDiy:focus ~ .labelInput {
    transform: translateY(-1.4rem);
    color: #4b4a4a;
    font-size: 16px;
  }
  .inputDiy:focus ~ .bar {
    width: 100%;
  }
  .inputDiy:focus {
    border: none;
  }
  // required验证通过
  .inputDiy:valid ~ .labelInput {
    transform: translateY(-1.5rem);
    color: #282727;
    font-size: 16px;
  }
  .inputDiy:valid ~ .bar {
    width: 100%;
  }
  .inputDiy:valid {
    border: none;
  }
}
</style>