<template>
  <div class="home">
    <button @click="handleTestHttp">测试http</button>
    <hr />
    <HelloWorld :msg="msg"></HelloWorld>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import { getPeople } from "@/apis/user/user";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup(props, context) {
    let msg: any = ref("");

    const handleTestHttp = async () => {
      let res: any = await getPeople();
      msg.value = res.userName;
    };

    return {
      msg,
      handleTestHttp,
    };
  },
});
</script>
