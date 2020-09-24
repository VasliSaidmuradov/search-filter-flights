<template>
  <b-container class="main">
    <!-- <pre>
      {{ airlines }} 
      {{ flights }}
    </pre> -->
    <b-row class="main__row">
      <b-col cols="12" lg="3" md="12" class="main__filter">
        <Filters
          v-for="filter in filterList"
          :key="filter.id"
          :filter="filter"
          @filter-fields="filtering"
          ref="filter"
          class="main__filter-item"
        />
        <Btn @click.native="clearFilters" class="main__filter-reset-btn" link
          >Сбросить все фильтры</Btn
        >
      </b-col>
      <b-col cols="12" lg="9" md="12" class="main__content">
        <!-- <p v-if="!flightList.length">{{ message }}</p> -->
        <Cart
          v-for="flight in flightList"
          :key="flight.id"
          class="main__cart"
          :flight="flight"
          :airline="airlines[flight.validating_carrier]"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Filters from "@/components/common/Filter.vue";
import Btn from "@/components/buttons/Btn.vue";
import Cart from "@/components/common/Cart.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Filters,
    Btn,
    Cart,
  },
  middleware: ["home"],
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
      ],
      flightList: [],
      message: "",
    };
  },
  beforeMount() {
    this.flightList = [...this.flights];
    this.message = "По заданному фильтру ничего не найдено.";
  },
  computed: {
    ...mapGetters({
      airlines: "GET_AIRLINES",
      flights: "GET_FLIGHTS",
    }),
    filterList() {
      const filter = [...this.filters];
      const airlines = { ...this.airlines };
      const items = [{ code: "ALL", name: "Все" }];
      for (const [key, value] of Object.entries(airlines)) {
        items.push({ code: key, name: value });
      }
      filter.push({ id: 2, title: "Авиакомпании", items });
      return filter;
    },
  },
  methods: {
    filtering(fields) {
      let res = [];
      const data = [...this.flights];

      for (let key of fields) {
        res = [...res, ...data.filter((el) => el.validating_carrier == key)];
      }

      this.flightList = [...res];
    },
    clearFilters() {
      this.$refs.filter.forEach((el) => el.clear());
    },
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
    &__filter,
    &__content {
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
