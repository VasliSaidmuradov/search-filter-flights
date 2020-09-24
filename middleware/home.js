export default function ({ store }) {
  store.dispatch('fetchAirlines')
  store.dispatch('fetchFlights')
}
