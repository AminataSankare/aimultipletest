<template>
  <div>
    <div>
      <button class="btn btn-primary" @click="sort">Sort</button>
    </div>
    <chartJs :data="barChartData" :options="barChartOptions" :height="200" />
  </div>
</template>
<script>
import chartJs from '~/components/dashboard/chartJs.vue';

export default {
  components: { chartJs }, // import chartJs component
    data() {
    return {
      tickers: [],
      barChartData: {
        labels: [],
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
  // function to fecth api datas
    async fetch() {
      this.loaded = false
      try {
        // fetch data and make it in json format
        this.tickers  = await fetch('https://api.coinlore.net/api/tickers').then(res => res.json());
        this.barChartData.datasets = this.tickers;
        let labels = [];
        let dataChart = [];
        this.tickers.data.forEach(ticker => {
          // exclude tickers with rank < 20 
          if(ticker.rank <= 20){
            // push data in array dataChart
            dataChart.push(ticker.market_cap_usd);
          }
        });
        // Create array of rank 1-20
        for (let i = 1; i <= 20; i++) {
          labels.push(i);
        }
        // Define barChart datas
        this.barChartData.labels = labels;
        this.barChartData.datasets = [{
          label: 'market cap usd',
          data: dataChart,
          backgroundColor: '#2f4b7c',
          order: true
        }]
        // add loader
        this.loaded = true
      }
      // whenever we have error on fetching data 
      catch (e) {
        console.error(e)
      }
    },
    methods:{
      // method to sort data
      sort(){
        var dataArray = [];
        // create array with only datasets data
        this.barChartData.datasets.forEach(element => {
          dataArray.push(element.data);
        });
        // Get the index after sorted.
        let dataIndexes = dataArray.map((d, i) => i);
        // sort them
        dataIndexes.sort((a, b) => {
            return dataArray[a] - dataArray[b];
        });
        // create after sorted datasets.
        var tempDatasets = [];
        dataIndexes.forEach(elm =>  {
            tempDatasets.push(this.barChartData.datasets[elm]);
        });
        // apply it
        this.barChartData.datasets = tempDatasets;
      }
    }
  }
</script>