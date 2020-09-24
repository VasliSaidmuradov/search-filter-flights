<template>
  <b-container class="main">
    <pre>
      <!-- {{ flights[1].itineraries[0][0].arr_date }}
      {{ new Date(flights[1].itineraries[0][0].arr_date).getHours() }}
      {{ new Date(flights[1].itineraries[0][0].arr_date).getMinutes() }}
      {{ new Date(flights[1].itineraries[0][0].arr_date) }}
      {{ new Date(flights[1].itineraries[0][0].arr_date) }}
      {{ new Date(flights[1].itineraries[0][0].arr_date) }} -->
      <!-- {{ airlines }}  -->
    </pre>
    <b-row class="main__row">
      <b-col cols="12" lg="3" md="12" class="main__filter">
        <Filters v-for="filter in filterList" :key="filter.id" :filter="filter" class="main__filter-item" />
        <Btn class="main__filter-reset-btn" link>Сбросить все фильтры</Btn>
      </b-col>
      <b-col cols="12" lg="9" md="12" class="main__content">
        <Cart v-for="flight in flights" :key="flight.id" class="main__cart" :flight="flight" :airline="airlines[flight.validating_carrier]" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Filters from "@/components/common/Filter.vue";
import Btn from "@/components/buttons/Btn.vue";
import Cart from "@/components/common/Cart.vue";
import { mapGetters } from 'vuex'

export default {
  components: {
    Filters,
    Btn,
    Cart,
  },
  middleware: ['home'],
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
    };
  },
  mounted() { console.log(this.airlines)},
  computed: {
    ...mapGetters({
      airlines: 'GET_AIRLINES',
      flights: 'GET_FLIGHTS',
    }),
    filterList() {
      const filter = [...this.filters]
      const airlines = {...this.airlines}
      const items = [{ code: "ALL", name: "Все" }]
      for (const [key, value] of Object.entries(airlines)) {
        items.push({ code: key, name: value })
      }
      filter.push({ id: 2, title: "Авиакомпании", items })
      return filter
    }
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
