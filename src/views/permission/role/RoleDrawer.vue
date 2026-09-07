<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'name', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>

      <template #auth="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="authData"
          :fieldNames="{ title: 'name', key: 'id' }"
          checkable
          toolbar
          title="权限分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  import { createRole, editRole, addRoleMenu, getRoleMenu, deleteRoleMenu,
    getAuthList,
    addRoleAuth,
    getRoleAuthByRoleId,
  } from '/@/api/demo/system';
  import { getAllMenu } from '/@/api/sys/menu';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);
      const roleId = ref()
      const authData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = (await getAllMenu()) as any as TreeItem[];
        }

        if (unref(authData).length === 0) {
          authData.value = (await getAuthList()) as any as TreeItem[];
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          roleId.value = data.record.id

          const list = await getRoleMenu({ roleId: data.record.id })
          data.record.menu = list.map(item => item.menuId)

          const authList = await getRoleAuthByRoleId({ roleId: data.record.id })
          data.record.auth = authList.map(item => item.authId)

          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          
          const update = unref(isUpdate)

          let curRoleId = null
          // 角色本身内容update 
          if (update) {
            const res = await editRole({
              ...values,
              id:  roleId.value
            })
          } else {
            const res = await createRole(values)
            curRoleId = res.id
          }

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
        authData,
      };
    },
  });
</script>
