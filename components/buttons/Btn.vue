<template>
  <button :type="type" :link="link" :class="classes" @click="click()">
    <div class="v-btn__content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    rounded: Boolean,
    link: Boolean,
    disabled: Boolean,
    type: String,
  },
  computed: {
    classes() {
      return {
        "v-btn": true,
        "v-btn__rounded": this.rounded,
        "v-btn__disabled": this.disabled,
        "v-btn__link": this.link,
      };
    },
  },
  methods: {
    click() {
      if (this.disabled) return;
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 4px;

  display: flex;
  align-items: center;
  position: relative;

  font-size: 18px;
	font-weight: 700;

  background: var(--green);
  color: var(--white);
	cursor: pointer;
	
	&__content {
		width: 100%;
		text-align: center;
	}

  &:focus {
    outline: none;
  }

  &__link {
    width: max-content;
    height: unset;

    padding: 0;
    border-color: inherit;
    background: transparent;

    font-weight: 400;
    font-size: 12px;
    color: var(--blue);
    border-radius: 0;
    border-bottom: 1px dashed var(--blue);
  }
}
</style>
