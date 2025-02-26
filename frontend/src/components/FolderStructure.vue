<template>
  <div class="folder-structure">
    <NestedFolder
      :node="tree"
      :renameMap="renameMap"
      @downloadFile="$emit('downloadFile', $event)"
      @deleteFile="$emit('deleteFile', $event)"
      @renameFile="$emit('renameFile', $event)"
    />
  </div>
</template>

<script>
import NestedFolder from './NestedFolder.vue';
export default {
  name: 'FolderStructure',
  props: {
    tree: {
      type: Object,
      required: true,
    },
    renameMap: {
      type: Object,
      required: true,
    },
  },
  components: { NestedFolder },
};
</script>

<style scoped>
.folder-structure {
  margin-top: 20px;
}
</style>
