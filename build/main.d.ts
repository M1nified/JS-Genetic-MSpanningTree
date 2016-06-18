declare class Edge {
    a: string;
    b: string;
    weight: number;
    inuse: boolean;
    constructor(a: string, b: string, value: number);
    randomUse(): Edge;
    toString(): string;
    genMutate(): Edge;
}
declare class Graph {
    arr: Edge[];
    constructor(arr?: Edge[]);
    value(): number;
    randomUse(): Graph;
    push(edge: Edge): Graph;
    toString(): string;
    sortByWeight(): Graph;
    genCrossed(snd: Graph): Graph[];
    static genCross(g1: Graph, g2: Graph, pivot: number): Graph[];
    slicedHead(pivot: number): Edge[];
    slicedTail(pivot: number): Edge[];
    genMutate(): Graph;
}
declare class MST {
    god: Graph;
    family: Graph[];
    size: number;
    maxIter: number;
    values: number[];
    valsum: number;
    constructor(god: Graph);
    findMST(): Graph;
    makeFamily(): MST;
    sortByValue(): MST;
    genMutate(): MST;
    genSelectLinearPair(): Graph[];
    genCross(): MST;
    genEvolve(): MST;
    genQuotation(): MST;
    genSelection(): MST;
}
declare var module: any;
