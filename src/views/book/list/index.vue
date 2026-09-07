<template>
  <PageWrapper :class="prefixCls" title="图书列表">
    <template #headerContent>
      <BasicForm
        :class="`${prefixCls}__header-form`"
        :labelWidth="100"
        :schemas="schemas"
        @submit="handleSearch"
      />
    </template>

    <div :class="`${prefixCls}__container`">
      <a-list>
        <template v-for="item in list" :key="item.id">
          <a-list-item>
             <template #extra>
              <img
                width="110"
                alt="logo"
                :src="`https://www.youbaobao.xyz/book/res/img/${item.cover}`"
              />
            </template>
            <a-list-item-meta>
              <template #description>
                <div :class="`${prefixCls}__content`">
                  {{ item.content }}
                </div>
                <div :class="`${prefixCls}__action`">
                  {{ item.author }}
                </div>
              </template>
              <template #title>
                <p :class="`${prefixCls}__title`">
                  {{ item.title }}
                </p>
                <div>
                  <template v-for="tag in item.description" :key="tag">
                    <Tag class="mb-2">
                      {{ tag }}
                    </Tag>
                  </template>
                </div>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>

      <a-pagination @change="handleSearch" v-model:current="current" :total="total" show-less-items />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { Tag, List, Pagination } from 'ant-design-vue';
  import { defineComponent, ref, onMounted } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { BasicForm } from '/@/components/Form/index';
  import { actions, searchList, schemas } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { getBookList } from '@/api/book/menu'

  export default defineComponent({
    components: {
      Icon,
      Tag,
      BasicForm,
      PageWrapper,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      [Pagination.name]: Pagination,
    },
    setup() {
      const list = ref()
      const current = ref(1)
      const total = ref(0)

      const handleSearch = (inputData = {}) => {
        const { title, author } = inputData
        const params = {
          pageNum: current.value,
          pageSize: 10,
          title: title || '',
          author: author || '',
        }
        getBookList(params).then((res) => {
          list.value = res.data
          total.value = res.total
        })
      }

      onMounted(() => handleSearch())

      return {
        list,
        current,
        total,
        handleSearch,

        prefixCls: 'list-search',
        actions,
        schemas,
      };
    },
  });
</script>
<style lang="less" scoped>
  .list-search {
    &__header {
      &-form {
        margin-bottom: -16px;
      }
    }

    &__container {
      padding: 12px;
      background-color: @component-background;
    }

    &__title {
      margin-bottom: 12px;
      font-size: 18px;
    }

    &__content {
      color: @text-color-secondary;
    }

    &__action {
      margin-top: 10px;

      &-item {
        display: inline-block;
        padding: 0 16px;
        color: @text-color-secondary;

        &:nth-child(1) {
          padding-left: 0;
        }

        &:nth-child(1),
        &:nth-child(2) {
          border-right: 1px solid @border-color-base;
        }
      }

      &-icon {
        margin-right: 3px;
      }
    }

    &__time {
      position: absolute;
      right: 20px;
      color: rgb(0 0 0 / 45%);
    }
  }
</style>
