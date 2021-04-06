<template>
  <div>
    <p>== HelloWorld组件 ==</p>
    {{info}}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    const { msg } = toRefs(props) as any;
    let info: any = ref("");

    watch(msg, (newVal, oldVal) => {
      info.value = newVal;
    });
    return {
      info
    };
  },
});
</script>

<style scoped lang="scss">
</style>
