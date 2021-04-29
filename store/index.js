export const actions = {
    async getTickers() {
      let res = await this.$axios.get('/tickers')
      return res;
    }
  }