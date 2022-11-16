import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    console.log("阿三大苏打")
    count.value++
  }
  function count2() {
    count.value = count.value * 2
  }

  return { count, doubleCount, increment, count2 }
})

export const mainStore = defineStore('main', () => {
  const count = ref(0)
  const title = ref('哈哈')

  return {count, title}
})
