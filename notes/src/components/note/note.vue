<template>
    <div id="note">
        <toolbar></toolbar>
        <note-list></note-list>
        <editor></editor>
    </div>
</template>

<script>
import Toolbar from './Toolbar'
import NoteList from './NoteList'
import Editor from './Editor'
export default {
  name: 'note',
  components: {
    Toolbar,
    NoteList,
    Editor 
  }
}
</script>

<style lang="less">
  #note {
    flex: auto;
    display: flex;
    justify-content: space-between;
  }
</style>