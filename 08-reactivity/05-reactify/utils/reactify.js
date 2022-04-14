import { computed, isRef } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  // ...
  return (...args) => computed(() => {
    let newArgs = args.map((elem)=>{
      if ( isRef(elem) ) {
        return elem.value;
      }
      return elem;
    });  

    return func(...newArgs);
  });
}
