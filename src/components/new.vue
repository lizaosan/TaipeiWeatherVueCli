<template>
  <div class="newtemplate">
        {{ location }}
        <button @click="tempSongShan">松山區</button>
        <button @click="tempShinYi">信義區</button>
  </div>
</template>

<script>
import Vue from 'vue';
import * as d3 from 'd3';

export default {
  name: 'newtemplate',
  data (){
    return {
        jsonUrl: 'https://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=1f1aaba5-616a-4a33-867d-878142cac5c4',
        jsonData: [],
        location: '松山區',
        scope: { x: 0, y: 24 },
        choosedData: [],
    };
  },
  mounted(){
      const that = this;
      // 保存當前 this 對象，如果在 success 裡使用 this，this 就變成指向 ajax 請求本身。 
    $.ajax({
        url: that.jsonUrl,
        success: function(data) {
            // console.log(data);
            that.jsonData = data.result.results;
            // console.log(d3);
            console.log(that.jsonData)
            },
        error: function(err) {}
    });
  },
    methods:{
    selectArea: function(){
        this.choosedData = [];
        for (var i = this.scope.x; i < this.scope.y; i++) { // 以 for 迴圈填入空陣列裡的氣溫資料
            this.choosedData.push({x:i,y:parseInt(this.jsonData[i].value)});
        };
    },
    drawChart: function(){
        var width = 1800 // svg寬度
        var height = 400 // svg寬度
        var padding = { top: 20, right: 20, bottom: 20, left: 20 } // 內距
        var graphicHeight = height - padding.top - padding.bottom // 圖表高度為svg高度扣掉內距
        

        var svg = d3.select("#app") // 畫布設定
        .append("svg")
        .attr("width", width)
        .attr("height", height)

        var minX = d3.min(this.choosedData, d => d.x); // 以變數設定畫布上 X 與 Y 軸最少的數值與最多的數值
        var maxX = d3.max(this.choosedData, d => d.x);
        var minY = d3.min(this.choosedData, d => d.y);
        var maxY = d3.max(this.choosedData, d => d.y);

        var scaleX = d3.scale.linear()
        .range([0, width])
        .domain([minX, maxX])

        var scaleY = d3.scale.linear()
        .range([height, 0])
        .domain([minY-2, maxY])

        var line = d3.svg.line()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y))

        svg.append('path')
        .attr({
            'd': line(this.choosedData), 
            'y': 0,
            'stroke': '#000',
            'stroke-width': '1px',
            'fill': 'none',
            'transform':'translate(45,20)'
        })

        var that = this;
        var axisX = d3.svg.axis() // 定義座標軸上的數字呈現
        .scale(scaleX)
        .orient("bottom")
        .ticks(20)
        .tickFormat(function(d){
            var unixTimeZero = Date.parse(that.jsonData[d].dataTime); // 使得來的時間變成 timestamp 參考 https://blog.csdn.net/yummry/article/details/79175496
            function formatDate(time)   { // 格式化物件    
                var year=time.getYear();     
                var month=time.getMonth()+1;     
                var date=time.getDate();     
                var hour=time.getHours();     
                var minute=time.getMinutes();     
                var second=time.getSeconds();     
                return month+"/"+date+" "+hour+"時";     
            };
            var newDate = new Date(unixTimeZero); // 建立 Date 物件
            return formatDate(newDate);   
            return unixTimeZero;
        });

        var axisY = d3.svg.axis()
        .scale(scaleY)
        .orient("left")
        .ticks(10)
        .tickFormat(function(d){return d+'°C'})

        svg.append('g') // 因為座標軸預設是從上到下從左到右，所以需要移動位置以符合
        .call(axisX)
        .attr({
        'fill':'none',
        'stroke':'#000',
        'transform':'translate(45,'+(height-20)+')' 
        });

        svg.append('g')
        .call(axisY)
        .attr({
        'fill':'#000',
        'stroke':'#000',
        'transform':'translate(45,20)'

        });
    },

    tempSongShan(){
        d3.select("#app svg").remove();
        this.location = "松山區"
        this.scope.x = 0;
        this.scope.y = 24;
        this.selectArea();
        this.drawChart();
        
    },

    tempShinYi(){
        d3.select("#app svg").remove();
        this.location = "信義區"
        this.scope.x = 24;
        this.scope.y = 48;
        this.selectArea();
        this.drawChart();
    }
}
};
</script>

<style scoped>
</style>
