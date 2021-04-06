<template>
  <div>
    <p>== User组件 ==</p>
    <p>用 户 名：{{userInfo.userName}}</p>
    <p>用 户 id：{{userInfo.userId}}</p>
    <p>用户昵称：{{userInfo.nickName}}</p>
    <p>用户性别：{{userInfo.sex}}</p>
    <p>用户电话：{{userInfo.phone}}</p>
    <p>
      说明：
      注意这里sex和phone属性是与接口获取到的不同的！！
      此处使用了分层架构的思想，将module层与view层进行解耦。
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    user: String,
  },
  setup(props) {
    const { user } = toRefs(props) as any;
    let userInfo: any = ref("");

    watch(user, (newVal, oldVal) => {
      userInfo.value = newVal;
    });
    return {
      userInfo
    };
  },
});
</script>

<style scoped lang="scss">
</style>
