import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      currencies: "TEST", //The value of this does not matter, it is getting re-assigned.
      forConversion: 0,
      baseCurrency: "",
      result: null //We use null as this co-erces to false, therefore our corresponding v-if
                  //doesn't trigger.
    },
    methods: {
      // We could make this a computed property, so we would'nt need a convert button in our HTML,
      // it would trigger on input.
      calculateAmount: function (){
        this.result = this.forConversion * this.currencies[this.baseCurrency]
      },

      //Benefit of using this in method and calling it in mounted: Re-usable code.
      // However, we aren't really going to re-use this so can also host it in mounted.
      fetchCurrencies: function(){
      fetch("https://api.exchangeratesapi.io/latest")
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.currencies = data.rates;
        console.log(this.currencies);
        });
      }
    },
    filters: {
      // These are implemented in HTML.
      twoDecimPlaces: function(number) {
        return number.toFixed(2);
      }
    },
    mounted() {
      this.fetchCurrencies()
    }
  })
})
