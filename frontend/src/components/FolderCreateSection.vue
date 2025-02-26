<template>
  <fieldset>
    <legend>Create Folder</legend>
    <div class="form-row">
      <input
        type="text"
        v-model="folderName"
        placeholder="Folder name"
        class="folder-name-input"
      />
      <button type="button" @click="$emit('createFolder')" :disabled="!folderName">
        Create
      </button>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'FolderCreateSection',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  computed: {
    folderName: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
        this.$emit('folderNameChange', value);
      },
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
.folder-name-input {
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
