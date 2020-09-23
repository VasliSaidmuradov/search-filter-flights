<template>
  <b-container class="main">
    <b-row class="main__row">
      <b-col cols="12" lg="3" md="12" class="main__filter">
        <Filters v-for="filter in filters" :key="filter.id" :filter="filter" class="main__filter-item" />
        <Btn class="main__filter-reset-btn" link>Сбросить все фильтры</Btn>
      </b-col>
      <b-col cols="12" lg="9" md="12" class="main__content">
        <Cart v-for="cart in 4" :key="cart" class="main__cart" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Filters from "@/components/common/Filter.vue";
import Btn from "@/components/buttons/Btn.vue";
import Cart from "@/components/common/Cart.vue";

export default {
  components: {
    Filters,
    Btn,
    Cart,
  },
  data() {
    return {
      filters: [
        {
          id: 1,
          title: "Опции тарифа",
          items: [
            { code: 0, name: "Только прямые" },
            { code: 1, name: "Только с багажом" },
            { code: 2, name: "Только возвратные" },
          ],
        },
        {
          id: 2,
          title: "Авиакомпании",
          items: [
            { code: "ALL", name: "Все" },
            { code: "KC", name: "Air Astana" },
            { code: "HY", name: "Uzbekistan Airways" },
            { code: "EK", name: "Emirates" },
            { code: "HR", name: "HR" },
            { code: "FZ", name: "Flydubai" },
            { code: "S7", name: "S7 Airlines" },
            { code: "LH", name: "Lufthansa" },
            { code: "BT", name: "Air Baltic" },
            { code: "CZ", name: "China Southern Airlines" },
            { code: "SU", name: "Aeroflot" },
            { code: "B2", name: "Belavia" },
            { code: "DV", name: "SCAT Airlines" },
            { code: "TK", name: "Turkish Airlines" },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  &__filter {
    margin: 42px 0;
  }
  &__content {
    margin: 42px 0;
    min-height: 100vh;
  }

  &__cart {
    margin-bottom: 12px;
  }
}
@media screen and (max-width: 992px) {
  .main {
    &__filter, &__content {
      margin: 14px 0;
    }
    &__filter {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      position: relative;
      
      &-item {
      width: 48%;
      }

      &-reset-btn {
        position: absolute;
        left: 27px;
        bottom: -15px;
      }
    }
  }
}
</style>
