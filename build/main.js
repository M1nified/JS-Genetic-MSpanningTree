'use strict';
class Edge {
    constructor(a, b, value) {
        this.weight = 0;
        this.inuse = false;
        this.a = a;
        this.b = b;
        this.weight = value;
    }
    randomUse() {
        this.inuse = Math.floor(Math.random() * 10) < 5 ? true : false;
        return this;
    }
    toString() {
        return this.a + ' - ' + this.weight + ' -> ' + this.b + ' (' + this.inuse + ')';
    }
    genMutate() {
        this.inuse = !this.inuse;
        return this;
    }
}
class Graph {
    constructor(arr = []) {
        this.arr = [];
        this.arr = arr;
    }
    value() {
        let sum = 0;
        this.arr.forEach(element => {
            sum += element.inuse !== false ? element.weight : 0;
        });
        return sum;
    }
    randomUse() {
        this.arr.forEach(element => {
            element.randomUse();
        });
        return this;
    }
    push(edge) {
        this.arr.push(edge);
        return this;
    }
    toString() {
        return this.arr.map(elem => {
            return elem.toString();
        }).join('\n');
    }
    sortByWeight() {
        this.arr.sort((a, b) => {
            return a.weight - b.weight;
        });
        return this;
    }
    genCrossed(snd) {
        let pivot = Math.floor(Math.random() * this.arr.length);
        return Graph.genCross(this, snd, pivot);
    }
    static genCross(g1, g2, pivot) {
        let tmp1 = g1.slicedHead(pivot).concat(g2.slicedTail(pivot));
        let tmp2 = g1.slicedTail(pivot).concat(g2.slicedHead(pivot));
        return [new Graph(tmp1).sortByWeight(), new Graph(tmp2).sortByWeight()];
    }
    slicedHead(pivot) {
        return pivot < this.arr.length ? this.arr.slice(0, pivot) : Array.apply(null, this.arr);
    }
    slicedTail(pivot) {
        return pivot < this.arr.length ? this.arr.slice(pivot) : [];
    }
    genMutate() {
        this.arr[Math.floor(Math.random() * this.arr.length)].genMutate();
        return this;
    }
}
class MST {
    constructor(god) {
        this.family = [];
        this.size = 4;
        this.maxIter = 40;
        this.god = god;
    }
    findMST() {
        this.makeFamily();
        console.log(this.family.toString());
        for (let i = 0; i < this.maxIter; i++) {
            this.genEvolve();
            console.log(this.family[0].toString(), '\n');
        }
        return this.god;
    }
    makeFamily() {
        for (let i = 0; i < this.size; i++) {
            this.family.push(Object.create(this.god).randomUse().sortByWeight());
        }
        return this;
    }
    sortByValue() {
        this.family.sort((a, b) => {
            return a.value() - b.value();
        });
        return this;
    }
    genMutate() {
        this.family[Math.floor(Math.random() * this.family.length)].genMutate();
        return this;
    }
    genCrossSelectLinear() {
        this.sortByValue();
        return [this.family[0], this.family[1]];
    }
    genCross() {
        let tocorss = this.genCrossSelectLinear();
        let crossed = tocorss[0].genCrossed(tocorss[1]);
        this.family[0] = crossed[0];
        this.family[1] = crossed[1];
        return this;
    }
    genEvolve() {
        let way = Math.random() * 10;
        if (way < 5) {
            this.genCross();
        }
        else {
            this.genMutate();
        }
        return this;
    }
}
try {
    (module).exports = {
        Edge,
        Graph,
        MST
    };
}
catch (e) { }
var graph = new Graph();
graph.push(new Edge('A', 'B', 3)).push(new Edge('B', 'C', 5)).push(new Edge('A', 'D', 1)).push(new Edge('B', 'D', 3)).push(new Edge('C', 'E', 5)).push(new Edge('B', 'E', 3)).push(new Edge('D', 'E', 3)).push(new Edge('E', 'G', 5)).push(new Edge('D', 'G', 9)).push(new Edge('D', 'F', 5)).push(new Edge('F', 'G', 2));
let mst = new MST(graph);
//# sourceMappingURL=main.js.map