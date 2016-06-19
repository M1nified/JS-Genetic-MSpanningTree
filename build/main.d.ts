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
    valueOfCompletness(): number;
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
declare class GraphConnections extends Array<string[]> {
    addEdge(edge: Edge): GraphConnections;
    consolidate(): GraphConnections;
    findContainingConnection(peak: string): string[] | boolean;
    isInConnection(connection: string[], peak: string): number | boolean;
    addToConnection(connection: string[] | boolean, peak: string): boolean;
    parseGraph(graph: Graph): GraphConnections;
    isMergable(a: string[], b: string[]): boolean;
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
