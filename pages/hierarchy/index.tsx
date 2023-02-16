import { useEffect, useRef, useState } from "react"
import * as d3 from "d3";


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

import styles from "./index.module.css"
import { linkHorizontal, linkVertical, tree, zoom, D3ZoomEvent } from "d3";

const Card = () => {
    return <h2>Card</h2>
}
function CustomDiv() {
    return (
      <foreignObject height="200" width="200">
        <div style={{ background: "red" }}> Some text </div>
      </foreignObject>
    );
  }
  
const nH = 50
const nW = 100
const sV = 40
const sH = 10
const width = 1000
const height = 600
const margin = {
    top:50,
    left:50,
    right:50,
    bottom:50,
}
const innerWidth = width-margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom
// var stratify = d3.stratify().parentId((d:any) => d.MANAGER_ID).id( (d:any) => d.EMPLOYEE_ID)


//npm i d3
//npm i --save-dev @types/d3
const Hierarchy = () => {
    const [data, setData] = useState<any>()
    const [levels, setLevels] = useState(2)

    const svgRef = useRef(null);

    function renderTreemap(treeData:any) {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove()
        const g = svg
            .attr('width',width)
            .attr('height',height)
            .append('g')
            .attr('transform',`translate(${width/2},${margin.top})`);
        
        svg.call(zoom().on('zoom', (e:D3ZoomEvent) => {
            g.attr('transform',e.transform)
        }));
        const treemap = tree()
        .size([innerWidth,innerHeight])
        // .size([height, width])
        .nodeSize([nW+sH,nH+sV])
        // .separation( (a, b) => a.parent == b.parent ? 1 : 2);
        // .separation( (a, b) => (a.parent == b.parent ? 1 : 2) / a.depth );
        let nodes:any = d3.hierarchy(treeData, (d:any) => d.children);
        nodes = treemap(nodes);

        

            
    
        const link = g.selectAll(".link")
        // .data(treemap(treeData).links())
        .data(nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", (d:any) => "link depth-"+ d.depth )
        // .style("stroke", (d:any) => d.data.depth)

        // .attr("d", linkHorizontal().x( (d:any) => d.x).y( (d:any) => d.y));
        .attr("d", (d:any) => {
            return "M" + (d.x) + "," + d.y
                + "L" + d.x + "," + (d.y + d.parent.y) / 2
                + " " + (d.parent.x) + "," + (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," + d.parent.y;
        });
        // .attr("d", (d:any) => {
        //     return "M" + (d.x) + "," + d.y
        //         + "L" + (d.x + d.parent.x) / 2 + "," + d.y
        //         + " " + (d.x + d.parent.x) / 2 + "," + d.parent.y
        //         + " " + d.parent.x + "," + d.parent.y;
        // });



        const node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", (d:any) => "node depth-"+ d.depth + (d.children ? " node--internal"
                : " node--leaf"))
            .attr("transform", (d:any) => "translate(" + d.x + "," +
                d.y + ")");
            // .attr("transform", (d:any) => "translate(" + d.y + "," +
            //     d.x + ")");

        node.append("rect")
        .attr('width', nW)
        .attr('height', nH)
        .attr('x', -(nW/2))
        .attr('y', -(nH/2))
        .style("fill","white")
        .style("stroke", "blue")
        // .on("mouseover", (event:MouseEvent) => console.log(event))
        .on("click", (event:MouseEvent, d:any) => console.log(d))



        // node.append("foreignObject")
        // .attr('width', nW)
        // .attr('height', nH+10)
        // .attr('x', -(nW/2))
        // .attr('y', -(nH/2)-10)
        // .append('xhtml:div')
        // .html('<h1 onClick="alert(\'test\')">Test</h1>')

        // node.append("circle")
        // .attr("r", 10)
        // .style("stroke", "grey")
        // .style("fill", "blue");
        // .attr("r", (d:any) => d.data.value)
        // .style("stroke", (d:any) => d.data.type)
        // .style("fill", (d:any) => d.data.level);

        node.append("text")
        .attr("dy", ".35em")
        .attr("x", -(nW/2-10))
        .attr("y", -5)
        .style("pointer-events", "none")
        // .attr("x", (d:any) => d.children ? (d.data.value + 5) * -1 :
        //     d.data.value + 5)
        // .attr("y", (d:any) => d.children && d.depth !== 0 ?
        //     -(d.data.value + 5) : d)
        // .style("text-anchor", (d:any) => d.children ? "end" : "start")
        .text((d:any) => d.data.data.EMPLOYEE_FIRST_NAME);


      }
    //   useEffect(() => {
    //     renderTreemap();
    //   }, [treeData]);

    const getData = async() => {
        const data = await d3.csv("/api/staticdata")
        data.forEach(function(d:any) {                              
             d.MANAGER_ID = d.MANAGER_ID === "0" ? '' : d.MANAGER_ID;                                   
        }); 
        setData(data)
    }

    // const tree = d3.treemap();
    const update = () => {
        console.log('upDATE')
        const root = d3.stratify()
            .id((d:any) => { return d.EMPLOYEE_ID; })
            .parentId((d:any) => { return d.MANAGER_ID; })
            (data);

        const collapse = (d:any) => {
            if (d.children) {
                if(d.depth >= levels) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }else{
                    d.children.forEach(collapse);
                }
            }
        }
        collapse(root)
    
        renderTreemap(root)
    }

    useEffect( () => {
        if(data) update()
    },[data, update, levels])

    useEffect( () => {
        getData()
    },[])
    return (
        <div className={styles.body}>
            <div>
            Hierarchy 
            <input type="number" value={+levels +1 } onChange={ e => setLevels( +e.target.value-1)}></input>

            </div>

            <svg ref={svgRef} width={width} height={height} style={{border:"solid 1px black"}} />

        </div>
    )
}
export default Hierarchy