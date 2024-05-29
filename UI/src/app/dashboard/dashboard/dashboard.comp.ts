import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import * as moment from "moment";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexFill,
  ApexDataLabels,
  ApexYAxis,
  ApexGrid
} from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { dashboardService } from "./dashboard.service";



@Component({
  selector:"dashboard",
  templateUrl:"./dashboard.html",
  styleUrls:['./dashboard.css']
})
export class dashboard {
  @ViewChild("chart",{static: false}) chart: ChartComponent;
  public chartOptions: Partial<any>;
  @ViewChild("chartPie",{static: false}) chartPie: ChartComponent;
  public chartOptionsPie: Partial<any>;
  protected userData;
  protected recorrds = [];
  protected status = [];
  protected userNames = [];
  protected userSelected:string;
  protected colors = ["#008FFB","#00E396","#775DD0","#FEB019","#FF4560"]
  constructor(private ser:dashboardService, private cdr: ChangeDetectorRef) {
    this.chartOptions = {
      series: [
        {
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val, opts) {
          var label = opts.w.globals.labels[opts.dataPointIndex];
          var a = moment(val[0]);
          var b = moment(val[1]);
          var diff = b.diff(a, "days");
          return label + ": " + diff + (diff > 1 ? " days" : " day");
        },
        style: {
          colors: ["#f3f4f5", "#fff"]
        }
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        show: false
      },
      grid: {
        row: {
          colors: ["#f3f4f5", "#fff"],
          opacity: 1
        }
      }
    };

    this.chartOptionsPie = {
      series: [2, 1],
      chart: {
        type: "donut"
      },
      labels: ["completed", "Inprorss"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  


ngOnInit(){
  this.ser.getUsers().subscribe((t)=>{
   this.userData = t || [];
   this.userData.forEach(element => {
    if(element.userrecords){
      this.userNames.push(element.userrecords || '') 
      
    }
    
   });
   console.log(t)
   this.userData.map((data)=>{
    let rcrds = data.userrecords? data.userrecords.records : [];
    rcrds.map((r)=>{
      if(this.recorrds.indexOf(r.course_code) == -1){
        this.recorrds.push(r.course_code)
      }
      
    })
   
   })
   console.log( this.recorrds)
  })
}

selectedUser(e){
  console.log(e);
  console.log(this.userSelected)
  var grphInput = [];
  
  let selUsrData = this.userData.filter((t)=>{
    if(t.userrecords && t.userrecords.delegate_id && t.userrecords.delegate_id == this.userSelected){
      return t.userrecords
    }
    
  }
)

if(selUsrData.length > 0 && selUsrData[0].userrecords && 
  selUsrData[0].userrecords.records.length > 0){
    let recds =  selUsrData[0].userrecords.records || [];
    this.status = [];
    recds.map((t)=>{
      let obj = {};
      obj['x'] = t.course_title || 'default';
      let temp = [];
      temp.push(new Date(t.valid_from).getTime());
      temp.push(new Date(t.valid_until).getTime());
      obj['y'] = temp;
      let ranNo = Math.floor(Math.random()*4)
      obj['fillColor'] = this.colors[ranNo];
      grphInput.push(obj);
      this.status.push(t.status);

    })

    console.log(this.status)
    this.chartOptions.series = [];
    this.chartOptions.series.push({
      data: grphInput
    })
    var tempStatus = []
    this.status.forEach((t,idx)=>{
      let obj = {}
      if(idx == 0){
        obj['name'] = t;
        obj['c'] = 1
        tempStatus.push(obj)
      }else{
        let found = tempStatus.filter(f=> f.name == t);
        if(found.length > 0){
          found[0]['c'] = found[0]['c'] + 1
        }else{
          obj['name'] = t;
        obj['c'] = 1
        tempStatus.push(obj)
        }
      }

    })
    console.log(tempStatus);
    //this.cdr.detectChanges();
    this.chartOptionsPie.series = [];
    this.chartOptionsPie.labels = [];
    tempStatus.map((data)=>{
      this.chartOptionsPie.series.push(data.c);
      this.chartOptionsPie.labels.push(data.name);
    })
    console.log(this.chartOptionsPie)
}

}
}


