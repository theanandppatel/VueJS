import { ref, computed, watch } from 'vue';

export default function useSearch(searchItem, searchProps) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(function () {
    let filteredItems = [];
    if (activeSearchTerm.value) {
        filteredItems = searchItem.value.filter((usr) =>
        usr[searchProps].includes(activeSearchTerm.value)
      );
    } else if (searchItem.value) {
        filteredItems = searchItem.value;
    }
    return filteredItems;
  });

  watch(enteredSearchTerm, function (newValue) {
    setTimeout(() => {
      if (newValue === enteredSearchTerm.value) {
        activeSearchTerm.value = newValue;
      }
    }, 300);
  });

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }

  return {
    enteredSearchTerm,
    availableItems,
    updateSearch
  }
}
