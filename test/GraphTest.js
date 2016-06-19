
describe('Graph class', () => {
  var graph;
  beforeEach(() => {
    graph = new Graph();
    graph.push(new Edge('A','B',3)).push(new Edge('B','C',5)).push(new Edge('A','D',1)).push(new Edge('B','D',3));
  });
  
  describe('slicedHead', () => {
    
    it('should return head or empty array', () => {
      // expect(graph.slicedHead(-1).length).toBe(4);
      expect(graph.slicedHead(0).length).toBe(0);
      expect(graph.slicedHead(1).length).toBe(1);
      expect(graph.slicedHead(3).length).toBe(3);
      expect(graph.slicedHead(4).length).toBe(4);
      expect(graph.slicedHead(5).length).toBe(4);
    });
      
  });
  
  describe('slicedTail', () => {
    
    it('should return tail or empty array', () => {
      expect(graph.slicedTail(1).length).toBe(3);
      expect(graph.slicedTail(0).length).toBe(4);
      expect(graph.slicedTail(4).length).toBe(0);
      expect(graph.slicedTail(5).length).toBe(0);
    });
      
  });
  
  
  describe('genCross', () => {
    
    it('should cross given genomes', () => {
      expect(Graph.genCross(graph,graph,0)[0].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,0)[1].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,1)[0].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,1)[1].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,2)[0].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,2)[1].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,3)[0].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,3)[1].arr.length).toBe(4);
      // console.log(Graph.genCross(graph,graph,4)[1])
      expect(Graph.genCross(graph,graph,4)[0].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,4)[1].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,5)[0].arr.length).toBe(4);
      expect(Graph.genCross(graph,graph,5)[1].arr.length).toBe(4);
    });
      
  });
    
});
  