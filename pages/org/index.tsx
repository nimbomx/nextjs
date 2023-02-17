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

let mydata:any

const removeNodeHandler = (evt:any) => {
    const user = (mydata.find( (row:any) => row.id === evt.currentTarget.dataset.id))
    mydata = mydata.filter( (row:any) => row.id != user.id)
    chart.removeNode(user.id)
}
const newNodeHandler = (evt:any) => {
    const user = (mydata.find( (row:any) => row.id === evt.currentTarget.dataset.id))
    let person = prompt("Please enter your name", "Harry Potter");
    if(!person) return 
    const newId = Date.now()+''
    const add = {
        "EMPLOYEE_ID": newId,
        "EMPLOYEE_FIRST_NAME": person,
        "EMPLOYEE_LAST_NAME": "XYZ",
        "PRIMARY_WORK_COUNTRY": "United States of America",
        "MANAGER_ID": user.id,
        "CC_FUNCTION": "Executive Office",
        "JOB_PROFILE_NAME": "Chief Executive Officer, WD",
        "JOB_FAMILY": "Administration",
        "JOB_FAMILY_GROUP": "General Management/Administration",
        "TRACK": "Management",
        "ORG_LEVEL": "Level 1",
        "parentId": user.id,
        "id": newId,
        "progress": [
            29.604939518907077,
            9.811308588362007
        ],
    }
    mydata = [...mydata, add] //update DB
    chart.addNode(add)
    // chart.addNode({imageUrl:"https:\/\/raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",id:"root child",parentId:"O-6066",name:"test",progress:[25,20,15,10]})
}

const getData = async() => {

    const data = await d3.csv("/api/staticdata")
    data.forEach(function(d:any) {                              
        d.parentId = d.MANAGER_ID === "0" ? '' : d.MANAGER_ID;
        d.id = d.EMPLOYEE_ID;
        const val = Math.round(d.EMPLOYEE_FIRST_NAME.length / 2);
        d.progress = [...new Array(val)].map((d) => Math.random() * 25 + 5);

   }); 
   mydata = data
//    const root = d3.stratify()
//             .id((d:any) => { return d.EMPLOYEE_ID; })
//             .parentId((d:any) => { return d.MANAGER_ID; })
//             (data);
    chart = new OrgChart()
    chart.container(".chart-container")
    chart.data(data)
    chart.buttonContent(({ node, state }:any) => {
        return `<div style="color:#2CAAE5;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:#040910;border: 1px solid #2CAAE5"> <span style="font-size:9px">${
          node.children
            ? `<i class="fas fa-angle-up"></i>`
            : `<i class="fas fa-angle-down"></i>`
        }</span> ${node.data._directSubordinates}  </div>`;
      })
      .svgHeight(window.innerHeight - 10)
      .nodeHeight((d) => 170)
          .nodeWidth((d) => {
            if (d.depth == 0) return 500;
            return 330;
          })
      .childrenMargin((d) => 90)
          .compactMarginBetween((d) => 65)
          .compactMarginPair((d) => 100)
          .neightbourMargin((a, b) => 50)
          .siblingsMargin((d) => 100)
          .buttonContent(({ node, state }) => {
            return `<div style="color:#2CAAE5;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:#040910;border: 1px solid #2CAAE5"> <span style="font-size:9px">${
              node.children
                ? `<i class="fas fa-angle-up"></i>`
                : `<i class="fas fa-angle-down"></i>`
            }</span> ${node.data._directSubordinates}  </div>`;
          })
      .linkUpdate(function (d, i, arr) {
        d3.select(this)
          .attr('stroke', (d) =>
            d.data._upToTheRootHighlighted ? '#14760D' : '#2CAAE5'
          )
          .attr('stroke-width', (d) =>
            d.data._upToTheRootHighlighted ? 15 : 1
          );

        if (d.data._upToTheRootHighlighted) {
          d3.select(this).raise();
        }
      })
      .nodeContent( (d:any, i:any, arr:any, state:any) => {
   
        return `
                  <div style="font-family: 'Inter'; background-color:#040910;sans-serif; position:absolute;margin-top:-1px; margin-left:-1px;width:${
                        d.width
                      }px;height:${d.height}px;border-radius:0px;border: 2px solid #2CAAE5" >
                         
                         <div class="pie-chart-wrapper" style="margin-left:-10px;margin-top:5px;width:320px;height:300px"></div>
                       
                        <div style="color:#2CAAE5;position:absolute;right:15px;top:-20px;">
                          <div style="font-size:15px;color:#2CAAE5;margin-top:32px"> ${
                            d.data.EMPLOYEE_FIRST_NAME
                          } </div>
                          <button class="clickme" data-id="${d.data.id}">Add</button>
           
                          ${(!d.children && !d._children) ? '<button class="clickmeDel" data-id="'+d.data.id+'">Remove</button>' :""}
                          <div style="font-size:10px;"> ${
                            d.data.CC_FUNCTION || ''
                          } </div>
                          <div style="font-size:10px;"> ${
                            d.data.id || ''
                          } </div>
                          ${
                            d.depth == 0
                              ? `                              <br/>
                          <div style="max-width:200px;font-size:10px;">
                            A corporate history of Ian is a chronological account of a business or other co-operative organization he founded.  <br><br>Usually it is produced in written format but it can also be done in audio or audiovisually  
                          </div>`
                              : ''
                          }

                        </div>
                      </div>
                      
`;
      }).nodeUpdate(function (d, i, arr) {
        const array = document.querySelectorAll(".clickme")
        array.forEach( (el:any) => el.removeEventListener('click', newNodeHandler))
        array.forEach( (el:any) => el.addEventListener('click',  newNodeHandler))
        const arrayDel = document.querySelectorAll(".clickmeDel")
        arrayDel.forEach( (el:any) => el.removeEventListener('click', removeNodeHandler))
        arrayDel.forEach( (el:any) => el.addEventListener('click',  removeNodeHandler))
        
        d3.select(this)
          .select('.node-rect')
          .attr('stroke', (d) =>
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
    if(first){
        first = false
        console.log('load')
        getData()
    }
},[])
    
    return (<>

    <div className="chart-container"></div>
    </>)


}

export default Org