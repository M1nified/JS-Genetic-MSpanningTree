describe('MSTTest',()=>{
    var mst;
    var graph = new Graph();
    var size = null;
    graph.push(new Edge('A','B',3)).push(new Edge('B','C',5)).push(new Edge('A','D',1)).push(new Edge('B','D',3));
    beforeEach(() => {
        mst = new MST(graph);
        mst.makeFamily();
        size = mst.size;
    });

    
    describe('makeFamily', () => {
        
        it('should make family containing cerain number of graphs', () => {
            expect(mst.family.length).toBe(size);
        });
            
    });
        
    
    
    describe('genSelectLinearPair', () => {
        
        it('should return best two graphs', () => {
            expect(mst.genSelectLinearPair().length).toBe(2);
            expect(mst.genSelectLinearPair()[0]).not.toBe(undefined);
            expect(mst.genSelectLinearPair()[1]).not.toBe(undefined);
        });
            
    });

    
})