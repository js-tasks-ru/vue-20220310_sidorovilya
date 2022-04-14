import { ref, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {  
  const history = ref([]);
  watch(source, (newValue) => {
    history.value.push(newValue);
  }, {
    immediate: true,
    flush: 'sync'
  });
  return { history };    
}
