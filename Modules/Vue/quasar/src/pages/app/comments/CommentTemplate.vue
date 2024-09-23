<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import IndexManagement from "src/components/Index/Scripts/IndexManagement";
import FormManagement from "src/components/Forms/Scripts/FormManagement";

const $q = useQuasar();
const newComment = ref("");
const comments = ref([]);
const editIndex = ref(null);
const editComment = ref("");

const props = defineProps({
  id: Number,
  type: String,
});

const indexHooks = IndexManagement({
  title: "Comment",
  url: "custom-apps/comments",
});

indexHooks.hooksCycle.params.resolvedParams = (params) => {
  params.params["filter[resource_id]"] = props.id;
  params.params["filter[resource_type]"] = props.type;
  return params;
};

const formHooks = FormManagement({
  title: "Comment",
  url: "custom-apps/comments",
  initialValues: {
    comment: "",
  },
});

const { resetFetch, refresh, tableData, actions, loading } = indexHooks;

actions.pagination.update({
  rowsPerPage: 20,
  descending: false,
});

formHooks.hooksCycle.afterResolve = (fields) => {
  fields.resource_id = props.id;
  fields.resource_type = props.type;
  return fields;
};

function addComment() {
  formHooks.actions.form.create;
  formHooks.formData.value = {
    comment: newComment.value,
  };
  formHooks.onCreate({
    emit: (data) => {
      refresh();
      newComment.value = "";
    },
  });
}

function saveEdit(index, id) {
  formHooks.actions.formData.update({
    comment: editComment.value,
  });

  formHooks.onUpdate({
    id: id,
    emit: (data) => {
      refresh();
      editIndex.value = null;
      editComment.value = "";
    },
  });
}

function deleteComment(id) {
  indexHooks.deleteRecord(id);
}

function clearEdit() {
  editIndex.value = null;
  editComment.value = "";
}

const startEdit = (index, comment) => {
  editIndex.value = index;
  editComment.value = comment;
};

onMounted(() => {
  refresh();
});
</script>


<template>
  <q-card class="q-pa-sm q-gutter-md">
    <div class="header">
      <q-toolbar>
        <span class="text-h5 q-pa-sm text-bold"
          >Comments ({{ tableData.length }})</span
        >
        <!-- <q-toolbar-title>Comments ({{ tableData.length }})</q-toolbar-title> -->
      </q-toolbar>
    </div>
    <q-separator></q-separator>
    <q-list class="q-mb-md">
      <q-item
        v-for="({ comment, id }, index) in tableData"
        :key="index"
        class="comment-bubble"
      >
        <!-- <q-item-section avatar>
          <q-avatar>
            <img src="https://via.placeholder.com/50" alt="Profile Picture" />
          </q-avatar>
        </q-item-section> -->
        <q-item-section>
          <div v-if="editIndex === index">
            <q-input
              v-model="editComment"
              placeholder="Add a comment..."
              outlined
              @keyup.enter="saveEdit(index, id)"
              dense
            >
              <template v-slot:append>
                <q-icon
                  name="clear"
                  class="cursor-pointer"
                  @click="clearEdit()"
                />
                <q-icon
                  name="save"
                  class="cursor-pointer text-blue"
                  @click="saveEdit(index, id)"
                />
              </template>
            </q-input>
          </div>
          <div v-else>
            <div class="comment-header">
              <!-- <span class="comment-name">Comment:</span> -->
              <div>
                <!-- <q-icon
                  name="edit"
                  class="cursor-pointer q-ma-sm"
                  @click="startEdit(index, comment)"
                /> -->
              </div>
            </div>
            <div class="comment-text">{{ comment }}</div>
            <div class="comment-actions">
              <!-- <q-icon name="thumb_up" class="cursor-pointer" />
              <q-icon name="reply" class="cursor-pointer" />
              <q-icon name="more_vert" class="cursor-pointer" /> -->
              <q-icon
                name="edit"
                class="cursor-pointer"
                @click="startEdit(index, comment)"
              />
              <q-icon
                name="delete"
                class="cursor-pointer text-red"
                @click="deleteComment(id)"
              />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="comment-input">
      <q-input
        v-model="newComment"
        placeholder="Add a comment..."
        outlined
        @keydown.enter.exact.prevent="addComment"
        @keydown.enter.shift.exact.prevent="newComment += '\n'"
        dense
        type="textarea"
      >
        <template v-slot:append>
          <q-icon
            name="send"
            class="cursor-pointer text-blue"
            @click="addComment"
          />
        </template>
      </q-input>
    </div>
    <q-inner-loading :showing="loading">
      <q-spinner size="3em" :thickness="2" color="primary"></q-spinner>
      <span class="text-primary">Processing ...</span>
    </q-inner-loading>
  </q-card>
</template>
<style scoped>
.q-card {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

/* .header {
  margin-bottom: 16px;
} */

.comment-input {
  display: flex;
  flex-direction: column;
}

.comment-bubble {
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-name {
  font-weight: bold;
}

.comment-text {
  margin-top: 5px;
}

.comment-actions {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.cursor-pointer {
  cursor: pointer;
}

.text-blue {
  color: blue;
}
</style>