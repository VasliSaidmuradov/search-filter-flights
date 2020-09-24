import results from '~/static/results.json';

export const state = () => ({
  airlines: null,
  flights: null,
})

export const mutations = {
  SET_AIRLINES: (state, payload) => state.airlines = payload,
  SET_FLIGHTS: (state, payload) => state.flights = payload,
}

export const actions = {
  async fetchAirlines(store) {
    await store.commit('SET_AIRLINES', results.airlines);
  },
  async fetchFlights(store) {
    await store.commit('SET_FLIGHTS', results.flights);
  },
}

export const getters = {
  GET_AIRLINES: state => state.airlines,
  GET_FLIGHTS: state => state.flights,
}
