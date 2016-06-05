var graph = new Graph();
graph.push(new Edge('A','B',3)).push(new Edge('B','C',5)).push(new Edge('A','D',1)).push(new Edge('B','D',3)).push(new Edge('C','E',5)).push(new Edge('B','E',3)).push(new Edge('D','E',3)).push(new Edge('E','G',5)).push(new Edge('D','G',9)).push(new Edge('D','F',5)).push(new Edge('F','G',2));

let mst = new MST(graph);
// mst.findMST();