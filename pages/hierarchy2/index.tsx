import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
}
// const width = 960 - margin.right - margin.left
// const height = 800 - margin.top - margin.bottom
const width = 960 
const height = 800 

const nH = 50
const nW = 90
const sV = 40
const sH = 10

var i = 0, duration = 750;


// var tree = d3.tree()
//     .size([height, width]);

// var diagonal = d3.svg.diagonal()
//     .projection(function (d) {
//     return [d.y, d.x];
// });
interface INode {
    children?:any
    data:any
    depth: number
    height: number
    id: string
    parent?: string
}
const Hierarchy2 = () => {

    const [data, setData] = useState<any>()
    const [levels, setLevels] = useState(2)

    const svgRef = useRef(null);
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    const g = svg.attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g");
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const click = (d:any) => {
        console.log(d)
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update();
    }

    const update = () => {
     
        const treemap = d3.tree()
        .size([innerWidth,innerHeight])
        .nodeSize([nW+sH,nH+sV])

        let nodes:any = d3.hierarchy(data, (d:any) => d.children);
        nodes = treemap(nodes);

        const link = g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", (d:any) => "link depth-"+ d.depth )
        .attr("d", (d:any) => {
            return "M" + (d.x) + "," + d.y
                + "L" + d.x + "," + (d.y + d.parent.y) / 2
                + " " + (d.parent.x) + "," + (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," + d.parent.y;
        });

        //Enter any new nodes at the parent's previous position.
        link.attr("transform", function (d) {
            return "translate(" + ((width+margin.left+(margin.right/2))/2) + "," + 40 + ")";
        })

        const node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", (d:any) => "node depth-"+ d.depth + (d.children ? " node--internal"
                : " node--leaf"))
            .attr("transform", (d:any) => "translate(" + d.x + "," +
                d.y + ")");

        //Enter any new nodes at the parent's previous position.
        node.attr("transform", function (d:any) {
            return "translate(" + (d.x+((width+margin.left+(margin.right/2))/2)) + "," + (d.y+40) + ")";
        })
        node.append("rect")
        .attr('width', nW)
        .attr('height', nH)
        .attr('x', -(nW/2))
        .attr('y', -(nH/2))
        .style("fill","white")
        .style("stroke", "blue")
        // .on("mouseover", (event:MouseEvent) => console.log(event))
        .on("click", click);
        // .on("click", (event:MouseEvent, d:any) => console.log(d))  ;



        // // Normalize for fixed-depth.
        // nodes.forEach(function (d:any) {
        //     d.y = d.depth * 180;
        //     if (d.parent != null) {
        //         d.x =  d.parent.x - (d.parent.children.length-1)*30/2 + (d.parent.children.indexOf(d))*30;
        //     }
        //     if (d.children != null && d.children.length > 4) {
        //         d.children.forEach(function (d:any, i:number) {
        //             d.y = (d.depth * 180 + i % 2 * 100);
        //             d.x =  d.parent.x - (d.parent.children.length-1)*30/4 + (d.parent.children.indexOf(d))*30/2 - i % 2 * 15;
        //         });
        //     }
        // });

        // // Update the nodes…
        // var node = svg.selectAll("g.node")
        //     .data(nodes, function (d:any) {
        //     return d.id || (d.id = ++i);
        // });

        // Enter any new nodes at the parent's previous position.
        // var nodeEnter = node.enter().append("g")
        // .attr("class", "node")
        // .attr("transform", function (d) {
        //         return "translate(" + data.y0 + "," + data.x0 + ")";
        //     })
        // .on("click", click);

        // nodeEnter.append("circle")
        //     .attr("r", 10)
        //     .style("fill","blue")
        //     .style("fill", function (d:any) {
        //     return d._children ? "lightsteelblue" : "#000";
        // });

        // // Transition nodes to their new position.
        // var nodeUpdate = node.transition()
        // .duration(duration)
        // .attr("transform", function (d:any) {
        //     console.log('g')
        //     return "translate(" + d.y + "," + d.x + ")";
        // })

    //     // Transition exiting nodes to the parent's new position.
    //     var nodeExit = node.exit().transition()
    //     .duration(duration)
    //     .attr("transform", function (d:any) {
    //     return "translate(" + d.y + "," + d.x + ")";
    // })
    //     .remove();

        // nodeExit.select("circle")
        // .attr("r", 1e-6);

        // const node = g.selectAll(".node")
        //     .data(nodes.descendants())
        //     .enter().append("g")
        //     .attr("class", (d:any) => "node depth-"+ d.depth + (d.children ? " node--internal"
        //         : " node--leaf"))
        //     .attr("transform", (d:any) => "translate(" + d.x + "," +
        //         d.y + ")");

        // node.append("rect")
        //     .attr('width', nW)
        //     .attr('height', nH)
        //     .attr('x', -(nW/2))
        //     .attr('y', -(nH/2))
        //     .style("fill","white")
        //     .style("stroke", "blue")
        //     .on("click", (event:MouseEvent, d:any) => console.log(d))

        svg.call(d3.zoom().on('zoom', (e:any) => {
            g.attr('transform',e.transform)
            //return "translate(" + width/2 + "," + 20 + ")";
        }));

        // Transition exiting nodes to the parent's new position.
        g.selectAll(".link").exit().remove();

        // Stash the old positions for transition.
        console.log('nodes',nodes)
        stash(nodes)
        // nodes.forEach(function (d:any) {
        //     d.x0 = d.x;
        //     d.y0 = d.y;
        // });
    }
    const stash = (d:any) => {
            d.x0 = d.x;
            d.y0 = d.y;
        if (d.children) {
            d.children.forEach(stash);
        }
    }
    const collapse = (d:any) => {
        if (d.children || d._children) {
            if(d.depth >= levels) {
                d._children = d.children || d._children;
                d._children.forEach(collapse);
                d.children = null;
            }else{
                d.children = d._children || d.children;
                d._children = null;
                d.children.forEach(collapse);
            }
        }
    }
    const getData = async() => {
        const data = await d3.csv("/api/staticdata")
        data.forEach(function(d:any) {                              
             d.MANAGER_ID = d.MANAGER_ID === "0" ? '' : d.MANAGER_ID;                                   
        }); 
        
        console.log('have data')

        const root:any = d3.stratify()
            .id((d:any) => { return d.EMPLOYEE_ID; })
            .parentId((d:any) => { return d.MANAGER_ID; })
            (data);
        root.x0 = height / 2;
        root.y0 = 0;
        collapse(root)
        // update(root);
        setData(root)
    }

    useEffect( () => {
        if(data) collapse(data)
    },[data, collapse, levels])

    useEffect( () => {
        if(data) {
            update()
        }
    },[data, update, levels])



    useEffect( () => {
        getData()
    },[])

    return (
        <>
        <div>
            Hierarchy 
            <input type="number" value={+levels +1 } onChange={ e => setLevels( +e.target.value-1)}></input>

            </div>
            <svg ref={svgRef} width={width} height={height} style={{border:"solid 1px black"}} />
        </>
    )
}
export default Hierarchy2

