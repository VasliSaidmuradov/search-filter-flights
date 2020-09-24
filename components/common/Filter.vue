<template>
  <div class="filter">
    <h3 class="filter__title">{{ filter.title }}</h3>
    <div class="filter__items">
      <label
        class="filter__checkbox"
        v-for="item in filter.items"
        :key="item.code"
      >
        <input
          type="checkbox"
          :value="item.id"
          @change="addFields(item.code)"
          :checked="filterFields.includes(item.code)"
          class="filter__checkbox-input"
        />
        <div class="filter__checkmark"></div>
        <p class="filter__checkbox-name">{{ item.name }}</p>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      filterFields: [],
    };
  },
  computed: {},
  methods: {
    addFields(f) {
      if (typeof f === "number") return; // для фильтра "опции тарифа"
      if (f === "ALL" && !this.filterFields.includes("ALL")) {
        this.filterFields = [];
        this.filter.items.forEach((el) => {
          this.filterFields.push(el.code);
        });
        this.$emit("filter-fields", this.filterFields);
        return;
      }
      if (f === "ALL" && this.filterFields.includes("ALL")) {
        this.filterFields = [];
        this.$emit("filter-fields", this.filterFields);
        return;
      }
      if (this.filterFields.includes(f)) {
        this.filterFields = this.filterFields.filter((el) => el !== f);
        this.$emit("filter-fields", this.filterFields);
        return;
      }
      this.filterFields.push(f);
      this.$emit("filter-fields", this.filterFields);
    },
    clear() {
      this.filterFields = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  background-color: var(--bg2);
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  &__items {
    max-height: 290px;
    overflow: auto;
  }
  &__title {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 12px;
  }
  &__checkbox {
    display: flex;
    align-items: center;
    padding: 6px 0;
    cursor: pointer;

    &-input {
      display: none;
      &:checked {
        & ~ .filter__checkmark {
          background: url("/icons/checkmark.svg") center no-repeat;
          background-size: 80%;
          background-color: var(--green);
          border-color: var(--green);
        }
      }
    }
    &-name {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      user-select: none;
    }
  }
  &__checkmark {
    width: 12px;
    height: 12px;
    margin-right: 12px;
    border-radius: 2px;
    border: 1px solid var(--gray);
    background-color: var(--white);
  }
}

::-webkit-scrollbar {
  width: 8px;
  border-radius: 2px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px 10px var(--bg2);
  border: solid 2px transparent;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px 10px var(--middle-gray);
  border: solid 2px transparent;
  border-radius: 2px;
}

@media screen and (max-width: 992px) {
  .filter {
    &__items {
      max-height: 100px;
    }
  }
}
</style>