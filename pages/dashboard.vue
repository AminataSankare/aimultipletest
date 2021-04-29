<template>
  <div>
    <chartJs :data="barChartData" :options="barChartOptions" :height="200" />
  </div>
</template>
<script>
import chartJs from '~/components/dashboard/chartJs.vue';

export default {
  components: { chartJs },
    data() {
    return {
      barChartData: {
        labels: [
          
        ],
        datasets: []
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'AI multiple analytics data',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    }
  },
    async fetch() {
      this.loaded = false
    try {
      this.tickers  = await fetch('https://api.coinlore.net/api/tickers').then(res => res.json());
      this.barChartData.datasets = this.tickers;
      let labels = [];
      let dataChart = [];
      this.tickers.data.forEach(ticker => {
        if(ticker.rank <= 20){
          dataChart.push(ticker.market_cap_usd);
        }
      });
      for (let i = 1; i <= 20; i++) {
        labels.push(i);
      }
      this.barChartData.labels = labels;
      this.barChartData.datasets = [{
        label: 'market cap usd',
        data: dataChart,
        backgroundColor: '#2f4b7c',
        order: true
      }]
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
    }
    
}



</script>