<template>
  <fieldset>
    <legend>Delete Folder</legend>
    <div class="form-row">
      <input
        type="text"
        v-model="value"
        placeholder="Folder to delete"
        class="delete-folder-input"
      />
      <button type="button" @click="onDelete" :disabled="!value">
        Delete
      </button>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'FolderDeleteSection',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  methods: {
    onDelete() {
      this.$emit('deleteFolder');
    },
  },
};
</script>

<style scoped>
fieldset {
  border: 1px solid #555;
  margin-bottom: 20px;
  padding: 10px;
}
legend {
  padding: 0 5px;
  font-weight: bold;
}
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.delete-folder-input {
  margin-right: 10px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: #2b2b2b;
  color: #f0f0f0;
}
button {
  background-color: #333;
  color: #fff;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #555;
}
</style>
