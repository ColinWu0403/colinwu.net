<!-- src/components/CursorTooltip.vue -->
<script setup>
import { ref } from "vue";

const props = defineProps({
  offsetX: { type: Number, default: 14 },
  offsetY: { type: Number, default: 18 },
  bordered: { type: Boolean, default: true },
  icon: { type: Boolean, default: true },
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
      class="fixed z-50 pointer-events-none rounded-xs font-semibold shadow-md whitespace-nowrap transition-opacity duration-150"
      :class="
        bordered
          ? 'text-xs px-3 py-1 border border-magenta/60 dark:border-tertiary/60 bg-light dark:bg-darker_slate text-magenta dark:text-tertiary'
          : 'text-sm px-4 py-1 bg-black/70 text-white'
      "
      :style="{ left: `${x}px`, top: `${y}px` }"
    >
      <span v-if="icon"><i class="fas fa-circle-info"></i></span>
      {{ text }}
    </div>
  </Teleport>
</template>
