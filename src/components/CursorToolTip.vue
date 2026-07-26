<!-- src/components/CursorTooltip.vue -->
<script setup>
import { ref } from "vue";

const props = defineProps({
  offsetX: { type: Number, default: 14 },
  offsetY: { type: Number, default: 18 },
});

const visible = ref(false);
const text = ref("");
const x = ref(0);
const y = ref(0);

function show(e, label) {
  text.value = label;
  visible.value = true;
  x.value = e.clientX + props.offsetX;
  y.value = e.clientY + props.offsetY;
}

function move(e) {
  x.value = e.clientX + props.offsetX;
  y.value = e.clientY + props.offsetY;
}

function hide() {
  visible.value = false;
}

defineExpose({ show, move, hide });
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed z-50 pointer-events-none px-3 py-1 rounded-xs border border-magenta/60 dark:border-tertiary/60 bg-light dark:bg-darker_slate text-xs font-semibold text-magenta dark:text-tertiary shadow-md whitespace-nowrap transition-opacity duration-150"
      :style="{ left: `${x}px`, top: `${y}px` }"
    >
      <i class="fas fa-circle-info"></i> {{ text }}
    </div>
  </Teleport>
</template>
