<template>
  <div class="home">
    <button @click="handleTestHttp">获取后端数据</button>
    <hr />
    <HelloWorld :user="userInfo"></HelloWorld>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import { getPeople } from "@/apis/user/user";
import User from "@/entities/user/user";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    const userInfo: any = ref({});

    const handleTestHttp = async () => {
      const res: any = await getPeople();
      console.log(new User(res));
      const user = new User(res).userInfo;
      userInfo.value = user;
    };

    return {
      userInfo,
      handleTestHttp,
    };
  },
});
</script>
