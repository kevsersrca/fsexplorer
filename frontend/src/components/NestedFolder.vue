<template>
  <ul>
    <li v-for="child in (node.children || [])" :key="child.fullPath">
      <div class="item-row">
        <!-- For folders -->
        <template v-if="!child.isFile">
          <span class="toggle-btn" @click="toggleFolder(child)">
            {{ child.open ? '▼' : '▶' }}
          </span>
          <span class="folder-name">
            <span class="icon">📁</span> {{ child.name }}
          </span>
          <!-- Folder delete and rename buttons are removed -->
          <NestedFolder
            v-if="child.open"
            :node="child"
            :renameMap="renameMap"
            @downloadFile="$emit('downloadFile', $event)"
            @deleteFile="$emit('deleteFile', $event)"
            @renameFile="$emit('renameFile', $event)"
          />
        </template>
        <!-- For files -->
        <template v-else>
          <span class="file-name">
            <span class="icon">📄</span> {{ child.name }}
          </span>
          <button @click="$emit('downloadFile', child.fullPath)">Download</button>
          <button @click="$emit('deleteFile', child.fullPath)">Delete</button>
          <template v-if="!child.renaming">
            <button @click="child.renaming = true">Rename</button>
          </template>
          <template v-else>
            <input
              type="text"
              v-model="renameMap[child.fullPath]"
              placeholder="New name"
              class="rename-input"
            />
            <button @click="renameItem(child)">Save</button>
            <button @click="child.renaming = false">Cancel</button>
          </template>
        </template>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NestedFolder',
  props: {
    node: {
      type: Object,
      required: true,
    },
    renameMap: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleFolder(folderNode) {
      folderNode.open = !folderNode.open;
    },
    renameItem(child) {
      this.$emit('renameFile', child.fullPath);
      child.renaming = false;
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding-left: 20px;
}
.item-row {
  display: block;
  margin: 5px 0;
}
.toggle-btn {
  cursor: pointer;
  margin-right: 6px;
  display: inline-block;
  width: 20px;
  text-align: center;
  margin-bottom: 4px;
}
.icon {
  margin-right: 4px;
}
.folder-name,
.file-name {
  display: inline-block;
  margin-right: 10px;
  white-space: nowrap;
  margin-bottom: 4px;
}
.rename-input {
  margin: 4px 5px 4px 0;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: #2b2b2b;
  color: #f0f0f0;
  width: 120px;
}
button {
  background-color: #333;
  color: #fff;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 2px;
  cursor: pointer;
  transition: background-color 0.2s;
}
button:hover {
  background-color: #555;
}
</style>
