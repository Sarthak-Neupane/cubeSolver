<script setup>
import { useWindowSize, useDevicePixelRatio, useRafFn } from '@vueuse/core'
</script>

<template>
    <h1>hello</h1>
    <client-only>
        <three-background></three-background>
    </client-only>
</template>