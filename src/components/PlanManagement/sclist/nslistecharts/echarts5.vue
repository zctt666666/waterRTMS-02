<template>
    <div>
          <div id="mainnl5"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Echarts5",
  data() {
    return {
      resstu5:{},
      bjsechartsdataxl1: [],
      bjsechartstimexl1: [],
      bjsechartstypexl1: "" 
    };
  },
  mounted() {
   var _this = this;
     Bus.$on("info15", e => {
      _this.resstu5 = e; 
      var WaterTotalEfficiency =_this.resstu5.WaterTotalEfficiency;
        var dataxl1 = [];
        var timexl1 = [];
        for (var i = 0; i < WaterTotalEfficiency.length; i++) {
          dataxl1.push(WaterTotalEfficiency[i].Data);
          timexl1.push(WaterTotalEfficiency[i].Time);
        }
        _this.bjsechartsdataxl1 = dataxl1;
        _this.bjsechartstimexl1 = timexl1;
        _this.drawLine()
    });
  },

  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("mainnl5")); 
      myChart.setOption({
        grid: {
          height: 84,
         
          bottom: 10,
          top: 35,
          right: 1,
          left: 51
        },
        color: ["#859dc0", "#bcc2cb"],
        legend: {
          right: 10,
          width: 500,
          itemWidth: 40,
          textStyle: {
            color: "#6e7b8b"
          },
          data: ["供水总效率"],
          icon: "rect", 

          itemWidth: 14, 

          itemHeight: 14, 

          itemGap: 40 
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            data: this.bjsechartstimexl1,
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          }
        ],
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: "#dfdfdf",
              width: 1,
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
     
        series: [
          {
            name: "供水总效率",
            type: "bar",
            barWidth: 6,
            data: this.bjsechartsdataxl1,
            zlevel: 99,
            itemStyle: {
              emphasis: {
                color: "red"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#mainnl5 {
  width:1260px;
  height: 134px;
  margin-left: 20px;
  /*   border: 1px red solid; */
}
</style>


