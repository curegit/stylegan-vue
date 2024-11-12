<script setup lang="ts">
import { ref, useId } from "vue";

interface Props {
  color?: string;
  activeColor?: string;
  tabRadius?: string;
  tabRadiusConcave?: string;
  customTitles?: Record<string, string>;
}

const { color, activeColor, tabRadius, tabRadiusConcave, customTitles = {} } = defineProps<Props>();

const slots = defineSlots<{ [key: string]: (props: { title: string }) => any }>();

const activatedTabKey = ref<null | string>(null);

function isActive(key: string): boolean {
  const keys = Object.keys(slots);
  if (keys.length === 0) {
    return false;
  } else if (activatedTabKey.value === null || !keys.includes(activatedTabKey.value)) {
    return keys[0] === key;
  } else {
    return activatedTabKey.value === key;
  }
}

const clipPathLeftId = `clip-path-left-${useId()}`;
const clipPathRightId = `clip-path-right-${useId()}`;
</script>

<template>
  <div v-if="Object.keys($slots).length" class="tab-stack">
    <svg aria-hidden="true">
      <defs>
        <clipPath :id="clipPathLeftId" clipPathUnits="objectBoundingBox"><path d="M1,0 A1,1,0,0,1,0,1 L1,1"></path></clipPath>
        <clipPath :id="clipPathRightId" clipPathUnits="objectBoundingBox"><path d="M0,0 A1,1,0,0,0,1,1 L0,1"></path></clipPath>
      </defs>
    </svg>
    <nav class="tab-bar">
      <ul class="tabs">
        <li v-for="(_, key) in $slots" :key="key" :class="['tab', { active: isActive(key.toString()) }]">
          <a class="tab-label" @click="activatedTabKey = key.toString()">{{ customTitles[key] ?? key }}</a>
        </li>
      </ul>
    </nav>
    <div class="tab-contents">
      <div v-for="(_, key) in $slots" v-show="isActive(key.toString())" :key="key" class="tab-pane">
        <slot :name="key" :title="customTitles[key] ?? key"></slot>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --tab-radius-default: 18px;
  --tab-radius-concave-default: 18px;
  --tab-color-default: #ddc385;
  --tab-active-color-default: #fff;
}

.tab-label {
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<style scoped>
svg {
  position: absolute;
  width: 0;
  height: 0;
}

.tab-stack * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.tab-bar {
  --radius: v-bind("tabRadius ?? 'var(--tab-radius-default)'");
  --radius-concave: v-bind("tabRadiusConcave ?? 'var(--tab-radius-concave-default)'");
  --tab-color: v-bind("color ?? 'var(--tab-color-default)'");
  --active-tab-color: v-bind("activeColor ?? 'var(--tab-active-color-default)'");
}

.tabs {
  display: flex;
  flex-flow: row wrap;
}

.tabs li {
  display: block;
  position: relative;

  a {
    display: block;
    padding: 6px 24px;
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
    background: var(--tab-color);
    text-decoration: none;
    cursor: pointer;
  }

  a:before {
    content: "";
    position: absolute;
    width: var(--radius-concave);
    height: var(--radius-concave);
    bottom: 0;
    left: calc(-1 * var(--radius-concave));
    background: var(--tab-color);
    clip-path: v-bind("`url('#${clipPathLeftId}')`");
    pointer-events: none;
  }

  a:after {
    content: "";
    position: absolute;
    width: var(--radius-concave);
    height: var(--radius-concave);
    bottom: 0;
    right: calc(-1 * var(--radius-concave));
    background: var(--tab-color);
    clip-path: v-bind("`url('#${clipPathRightId}')`");
    pointer-events: none;
  }
}

.tabs .active {
  z-index: 10;

  a {
    background: var(--active-tab-color);
    cursor: auto;
  }

  a:before {
    background: var(--active-tab-color);
    pointer-events: revert;
    cursor: auto;
  }

  a:after {
    background: var(--active-tab-color);
    pointer-events: revert;
    cursor: auto;
  }
}
</style>
