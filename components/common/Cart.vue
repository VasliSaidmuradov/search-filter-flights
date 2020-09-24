<template>
  <div class="cart">
    <div class="cart__main">
      <header class="d-flex">
        <div class="cart__airline">
          <img
            class="cart__airline-logo"
            :src="`https://aviata.kz/static/airline-logos/80x80/${flight.validating_carrier}.png`"
            alt="logo"
          />
          <span class="cart__airline-name">{{ airline }}</span>
        </div>
        <div class="cart__dep-arr --dep">
          <p class="cart__dep-arr-date">{{ origin.dep_time.slice(0, 10) }}</p>
          <p class="cart__dep-arr-time">{{ origin.dep_time.slice(-5) }}</p>
        </div>
        <div class="cart__flight-info">
          <div class="cart__flight">
            <span class="cart__flight-from">{{ origin.origin_code }}</span>
            <span class="cart__flight-duration">4 ч 20 м</span>
            <span class="cart__flight-to">{{ dest.dest_code }}</span>
            <div class="cart__flight-dot"></div>
          </div>
          <p class="cart__flight-stops">
            {{ layover ? `через ${layover}` : "прямой" }}
          </p>
        </div>
        <div class="cart__dep-arr --arr">
          <p class="cart__dep-arr-date">{{ dest.arr_time.slice(0, 10) }}</p>
          <p class="cart__dep-arr-time">
            {{
              dest.arr_time
                .match(/([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/g)
                .join("")
            }}
          </p>
        </div>
      </header>
      <footer class="d-flex">
        <Btn link class="cart__footer-link">Детали перелета</Btn>
        <Btn link class="cart__footer-link">Условия тарифа</Btn>
        <p v-if="!flight.refundable" class="cart__footer-info-text">
          <NonRefundeble class="cart__footer-info-icon" /><span class="--web"
            >невозвратный</span
          >
        </p>
      </footer>
    </div>
    <div class="cart__aside">
      <div class="cart__total-cost">
        {{ flight.price }} {{ currency[flight.currency] }}
      </div>
      <Btn class="cart__order-btn">Выбрать</Btn>
      <p class="cart__cost-info --web">Цена за всех пассажиров</p>
      <div class="cart__luggage">
        <span class="cart__luggage-info">Нет багажа</span>
        <button class="cart__luggage-add">+ Добавить багаж</button>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from "@/components/buttons/Btn.vue";
import NonRefundeble from "@/static/icons/non-refundeble.svg";

export default {
  components: {
    Btn,
    NonRefundeble,
  },
  props: {
    flight: Object,
    airline: String,
  },
  data() {
    return {
      currency: {
        KZT: "₸",
        USD: "$",
        EUR: "€",
      },
    };
  },
  computed: {
    itineraries() {
      const itineraries = this.flight.itineraries.flat()[0];
      return itineraries;
    },
    origin() {
      const origin = this.itineraries.segments[0];
      return origin;
    },
    dest() {
      const dest = this.itineraries.segments[
        this.itineraries.segments.length - 1
      ];
      return dest;
    },
    layover() {
      let res = null;
      const segments = [...this.itineraries.segments];
      if (segments.length === 1) return res;
      if (segments.length === 2) return (res = segments[0].dest);
      return segments
        .slice(0, -1)
        .map((el) => el.dest)
        .join(",");
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  width: 100%;
  min-height: 168px;
  display: flex;
  background-color: var(--white);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  overflow: hidden;

  &__main {
    width: 70%;
    padding: 44px 44px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__airline {
    display: flex;
    align-items: center;
    margin-right: 14px;
    min-width: 130px;

    &-logo {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }

    &-name {
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
    }
  }

  &__dep-arr {
    &-date {
      font-size: 12px;
    }

    &-time {
      font-weight: 600;
      font-size: 24px;
    }
  }

  &__flight-info {
    min-width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 24px;
    padding: 2px 0 4px;
  }

  &__flight {
    display: flex;
    justify-content: space-between;
    height: 50%;
    border-bottom: 1px solid var(--gray);
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      bottom: -2.5px;
      border-radius: 50%;
      border: 1px solid var(--gray);
      background-color: var(--white);
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
    &-dot {
      position: absolute;
      width: 5px;
      height: 5px;
      left: calc(50% - 2.5px);
      bottom: -2.5px;
      border-radius: 50%;
      border: 1px solid var(--gray);
      background-color: var(--white);
    }

    &-from,
    &-to {
      font-size: 10px;
      color: var(--gray);
    }
    &-duration {
      font-size: 12px;
    }
    &-stops {
      font-size: 12px;
      text-align: center;
      color: var(--orange);
    }
  }

  &__footer-link {
    margin-right: 25px;
  }

  &__footer-info-text {
    color: var(--dark);
    margin-left: 24px;
    font-size: 12px;
    line-height: 14px;
  }

  &__footer-info-icon {
    margin-right: 8px;
  }

  &__aside {
    width: 30%;
    min-width: 240px;
    padding: 15px 20px;
    background-color: var(--bg2);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &__total-cost {
    font-size: 24px;
    text-align: center;
  }

  &__cost-info {
    font-size: 12px;
    text-align: center;
    color: var(--dark);
  }

  &__luggage {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    width: 100%;

    &-add {
      color: var(--blue);
      background-color: var(--light-blue);
      padding: 3px 8px;
      border-radius: 2px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .cart {
    &__main {
      padding: 44px 22px 18px;
    }

    &__airline {
      min-width: 110px;
    }

    &__flight-info {
      min-width: 140px;
      margin: 0 14px;
    }

    &__aside {
      min-width: 200px;
    }
    &__order-btn {
      width: 160px;
    }
    &__luggage {
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 768px) {
  .cart {
    flex-direction: column;

    &__main {
      width: 100%;
      padding: 22px;

      header {
        justify-content: space-between;
      }
    }

    &__airline {
      min-width: 110px;
    }

    &__flight-info {
      min-width: 140px;
      margin: 0 14px;
    }

    &__aside {
      width: 100%;
      height: 100px;
      flex-direction: row;
      position: relative;
      align-items: flex-start;
    }
    &__order-btn {
      width: 160px;
    }
    &__cost-info {
      position: absolute;
      bottom: 10px;
      right: 20px;
    }
    &__luggage {
      position: absolute;
      left: 20px;
      bottom: 10px;
      flex-direction: row;
      width: 200px;
    }
  }
}

@media screen and (max-width: 520px) {
  .cart {
    flex-direction: column;

    &__main {
      width: 100%;
      padding: 22px;

      header {
        flex-direction: column;
      }
    }

    &__dep-arr {
      width: fit-content;
    }
    .--dep {
      margin-top: 16px;
    }
    .--arr {
      align-self: flex-end;
      margin-bottom: 16px;
    }

    &__airline {
      width: fit-content;
      min-width: unset;
      margin: 0;
      align-self: center;
    }

    &__footer-link {
      margin-right: 10px;
    }
    footer {
      justify-content: space-between;
    }
    &__footer-info-text {
      margin-left: 0px;
    }

    &__flight-info {
      min-width: 140px;
      margin: 0 14px;
    }

    &__aside {
      width: 100%;
      height: 100px;
      flex-direction: row;
      position: relative;
      align-items: flex-start;
    }
    &__order-btn {
      width: 140px;
    }
    &__total-cost {
      margin-top: 5px;
      font-size: 22px;
    }
    &__luggage {
      position: absolute;
      bottom: 10px;
      flex-direction: row;
      width: calc(100% - 40px);
    }
  }
}
</style>
