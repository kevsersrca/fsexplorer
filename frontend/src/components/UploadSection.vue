<template>
  <div class="upload-section">
    <label class="file-input-label">
      <span>Select File</span>
      <input type="file" @change="onFileChange" />
    </label>
    <input
      type="text"
      v-model="uploadPath"
      placeholder="Upload path (e.g. folder1/folder2)"
      class="upload-path-input"
    />
    <button type="button" @click="onUploadClick" :disabled="!selectedFile">
      Upload
    </button>
  </div>
</template>

<script>
export default {
  name: 'UploadSection',
  data() {
    return {
      selectedFile: null,
      uploadPath: '',
    };
  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0] || null;
    },
    onUploadClick() {
      this.$emit('upload', {
        file: this.selectedFile,
        path: this.uploadPath,
      });
    },
  },
};
</script>

<style scoped>
.upload-section {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.file-input-label {
  display: inline-block;
  background-color: #444;
  padding: 6px 12px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  color: #f0f0f0;
  transition: background-color 0.2s;
}
.file-input-label:hover {
  background-color: #555;
}
.file-input-label input[type="file"] {
  display: none;
}
.upload-path-input {
  margin-bottom: 10px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: #2b2b2b;
  color: #f0f0f0;
  width: 200px;
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
