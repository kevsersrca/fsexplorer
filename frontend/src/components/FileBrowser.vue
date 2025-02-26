<template>
  <div class="browser-container">
    <div class="left-panel">
      <h1>File Explorer</h1>

      <UploadSection @upload="onUpload" />

      <FolderCreateSection v-model="newFolder" @createFolder="createFolder" />

      <FolderDeleteSection
        v-model="folderToDelete"
        @deleteFolder="onDeleteFolder"
      />
    </div>
    <div class="right-panel">
      <h2>Folder Structure</h2>
      <FolderStructure
        v-if="tree"
        :tree="tree"
        :renameMap="renameMap"
        @downloadFile="downloadFile"
        @deleteFile="deleteFile"
        @renameFile="renameFile"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UploadSection from './UploadSection.vue';
import FolderCreateSection from './FolderCreateSection.vue';
import FolderDeleteSection from './FolderDeleteSection.vue';
import FolderStructure from './FolderStructure.vue';

const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default {
  name: 'FileBrowser',
  components: { UploadSection, FolderCreateSection, FolderDeleteSection, FolderStructure },
  data() {
    return {
      files: [],
      newFolder: '',
      renameMap: {},
      tree: null,
      folderToDelete: '',
    };
  },
  mounted() {
    this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await axios.get(`${BASE_URL}/files`);
        this.files = response.data || [];
        this.tree = this.buildFolderTree(this.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    },
    async onUpload({ file, path }) {
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', path);
      try {
        await axios.post(`${BASE_URL}/files/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.fetchFiles();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    async createFolder() {
      if (!this.newFolder) return;
      try {
        await axios.post(`${BASE_URL}/files/create-folder`, {
          folderName: this.newFolder,
        });
        this.fetchFiles();
        this.newFolder = '';
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    },
    async onDeleteFolder() {
      try {
        await axios.delete(`${BASE_URL}/files/folder/${encodeURIComponent(this.folderToDelete)}`);
        this.fetchFiles();
        this.folderToDelete = '';
      } catch (error) {
        console.error('Error deleting folder:', error);
      }
    },
    downloadFile(fullPath) {
      const url = `${BASE_URL}/files/download/${encodeURIComponent(fullPath)}`;
      window.open(url, '_blank');
    },
    async deleteFile(fullPath) {
      try {
        await axios.delete(`${BASE_URL}/files/${encodeURIComponent(fullPath)}`);
        this.fetchFiles();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    },
    async renameFile(oldKey) {
      const newKey = this.renameMap[oldKey];
      if (!newKey) {
        alert('Enter a new name');
        return;
      }
      try {
        await axios.post(`${BASE_URL}/files/rename`, { oldKey, newKey });
        this.fetchFiles();
        this.$set(this.renameMap, oldKey, '');
      } catch (error) {
        console.error('Error renaming file:', error);
      }
    },
    buildFolderTree(files) {
      const root = {
        name: '',
        fullPath: '',
        isFile: false,
        children: [],
        open: true,
      };
      for (const file of files) {
        const key = file.Key;
        const parts = key.split('/');
        let currentNode = root;
        let currentPath = '';
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          currentPath = currentPath ? `${currentPath}/${part}` : part;
          let child = currentNode.children.find((c) => c.name === part);
          if (!child) {
            child = {
              name: part,
              fullPath: currentPath,
              children: [],
              isFile: false,
              open: false,
              renaming: false,
            };
            currentNode.children.push(child);
          }
          if (i === parts.length - 1 && !key.endsWith('/')) {
            child.isFile = true;
          }
          currentNode = child;
        }
      }
      return root;
    },
  },
};
</script>

<style scoped>
.browser-container {
  display: flex;
  flex-direction: row;
  width: 1800px;
  margin: 0 auto;
  height: 100%;
  background-color: #1e1e1e;
  color: #f0f0f0;
  box-sizing: border-box;
}

.left-panel {
  width: 500px;
  border-right: 1px solid #444;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.right-panel {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

/* Form stili */
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
  margin-bottom: 10px;
}

.file-input-label input[type="file"] {
  display: none;
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

.delete-folder-input {
  margin-right: 10px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: #2b2b2b;
  color: #f0f0f0;
}

/* Responsive (mobil) */
@media (max-width: 768px) {
  .browser-container {
    width: 100%;
    flex-direction: column;
  }
  .left-panel {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #444;
  }
  .right-panel {
    width: 100%;
  }
}
</style>
