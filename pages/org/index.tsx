import * as d3 from "d3";
import React, { useEffect } from "react";
import { OrgChart } from '../../lib/d3-org-chart';

// "EMPLOYEE_ID"
// "EMPLOYEE_FIRST_NAME"
// "EMPLOYEE_LAST_NAME"
// "PRIMARY_WORK_COUNTRY"
// "MANAGER_ID"
// "CC_FUNCTION"
// "JOB_PROFILE_NAME"
// "JOB_FAMILY"
// "JOB_FAMILY_GROUP"
// "TRACK"
// "ORG_LEVEL"


let first = true
let chart:any 

let mydata:any[]

const removeNodeHandler = (evt:any) => {
    mydata = mydata.filter( (row:any) => row.id != evt.currentTarget.dataset.id)
    chart.removeNode(evt.currentTarget.dataset.id)
}
const newNodeHandler = (evt:any) => {
  const userId = evt.currentTarget.dataset.id
  let newName = prompt("Please enter your name", "John Doe");
  if(!newName) return 
  const newId = Date.now()+''
  const add = {
    "EMPLOYEE_ID": newId,
    "EMPLOYEE_FIRST_NAME": newName,
    "EMPLOYEE_LAST_NAME": "XYZ",
    "PRIMARY_WORK_COUNTRY": "United States of America",
    "MANAGER_ID": userId,
    "CC_FUNCTION": "Executive Office",
    "JOB_PROFILE_NAME": "Chief Executive Officer, WD",
    "JOB_FAMILY": "Administration",
    "JOB_FAMILY_GROUP": "General Management/Administration",
    "TRACK": "Management",
    "ORG_LEVEL": "Level 1",
    "parentId": userId,
    "id": newId
  }
  mydata = [...mydata, add] //update DB
  chart.addNode(add)
}

const getData = async() => {

    mydata = await d3.csv("/api/staticdata")
    mydata.forEach(function(d:any) {                              
        d.parentId = d.MANAGER_ID === "0" ? '' : d.MANAGER_ID;
        d.id = d.EMPLOYEE_ID;
   }); 

    chart = new OrgChart()
    chart.container(".chart-container")
    chart.data(mydata)
    chart.buttonContent(({ node, state }:any) => {
        return `<div style="color:#2CAAE5;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:#040910;border: 1px solid #2CAAE5"> <span style="font-size:9px">${
          node.children
            ? `<i class="fas fa-angle-up"></i>`
            : `<i class="fas fa-angle-down"></i>`
        }</span> ${node.data._directSubordinates}  </div>`;
      })
      .svgHeight(window.innerHeight - 10)
      .nodeHeight(() => 170)
          .nodeWidth((d:any) => {
            if (d.depth == 0) return 500;
            return 330;
          })
      .childrenMargin(() => 90)
          .compactMarginBetween(() => 65)
          .compactMarginPair(() => 100)
          .neightbourMargin(() => 50)
          .siblingsMargin(() => 100)
          .buttonContent(({ node }:any) => {
            return `<div style="color:#2CAAE5;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:#040910;border: 1px solid #2CAAE5"> <span style="font-size:9px">${
              node.children
                ? `<i class="fas fa-angle-up"></i>`
                : `<i class="fas fa-angle-down"></i>`
            }</span> ${node.data._directSubordinates}  </div>`;
          })
      .linkUpdate(function (d:any, i:number, arr:any[]) {
        d3.select(this)
          .attr('stroke', (d:any) =>
            d.data._upToTheRootHighlighted ? '#14760D' : '#2CAAE5'
          )
          .attr('stroke-width', (d:any) =>
            d.data._upToTheRootHighlighted ? 15 : 1
          );

        if (d.data._upToTheRootHighlighted) {
          d3.select(this).raise();
        }
      })
      .nodeContent( (d:any, i:any, arr:any, state:any) => {
        return `
          <div style="font-family:'Inter'; background-color:#040910; sans-serif; position:absolute; margin-top:-1px; margin-left:-1px;
            width:${d.width}px; height:${d.height}px; border-radius:0px; border: 2px solid #2CAAE5" >
              
            <div style="color:#2CAAE5;position:absolute;right:15px;top:-20px;">
              <div style="font-size:15px;color:#2CAAE5;margin-top:32px"> 
                ${d.data.EMPLOYEE_FIRST_NAME} ${d.data.EMPLOYEE_LAST_NAME} 
              </div>

              <button class="clickme" data-id="${d.data.id}">Add</button>
              ${(!d.children && !d._children ) ? (
                '<button class="clickmeDel" data-id="'+d.data.id+'">Remove</button>'
              ) : (
                ""
              )}
              
              <div style="font-size:10px;"> 
                ${d.data.CC_FUNCTION || ''} 
              </div>
              <div style="font-size:10px;"> 
                ${d.data.id || ''} 
              </div>
            </div>
          </div>          
        `;
      }).nodeUpdate(function (d:any, i:number, arr:any[]) {
        d3.selectAll(".clickme").on('click',newNodeHandler)
        d3.selectAll(".clickmeDel").on('click',removeNodeHandler)

        d3.select(this)
          .select('.node-rect')
          .attr('stroke', (d:any) =>
            d.data._highlighted || d.data._upToTheRootHighlighted
              ? '#14760D'
              : 'none'
          )
          .attr(
            'stroke-width',
            d.data._highlighted || d.data._upToTheRootHighlighted ? 40 : 1
          );
      })

    chart.render()

}



const Org = () => {
    
  useEffect( () => {
    if(!first) return
    
    first = false
    getData()
  },[])
    
  return <div className="chart-container"></div>
}

export default Org