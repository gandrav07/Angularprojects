import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription} from 'rxjs';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
 

declare var require:any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);

@Component({
  selector: 'app-highcharts-demo',
  templateUrl: './highcharts-demo.component.html',
  styleUrls: ['./highcharts-demo.component.css']
})
export class HighchartsDemoComponent implements OnInit {
  public options: any = {
    chart: {
      type: 'line',
      height:500
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled:false
    },
    tooltip: {
      formatter: function(){
        return 'x: ' + this.x + 'y:' + this.y;
      }
    },
    xAxis: {
      categories: []
    },
    series:[
     {
       name: 'Mr.Venkat',
       data:[]

     },
     {
       name: 'Mr.Gandra',
       data: []
     }
    ]
  }
subscription: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //update data again and again after every 5 seconds interval
    const apiLink = 'https://api.myjson.com/bins/zg8of';
    this.getApiResponse(apiLink).then(
      data => {
        const faisal=[];
        const pathanArr = [];
        const xAxisArr = [];
        data.forEach(row =>{
          const temp_row = [
            row.Sales_Figure
          ];
          if(xAxisArr.find(ob => ob === row.Month) === undefined){
            xAxisArr.push(row.Month)
          }
          row.Name === 'Faisal'?faisal.push(temp_row):
          pathanArr.push(temp_row);
        } );
        this.options.xAxis['categories'] = xAxisArr;
        this.options.series[0]['data'] = faisal;
        this.options.series[1]['data'] = pathanArr;
        Highcharts.chart('container', this.options);
      },
      error => {
        console.log('Something went wrong');

      }
    );
  }
async getApiResponse(url: string){
const res = await this.http.get<any[]>(url, {})
.toPromise();
return res; 
}
}
