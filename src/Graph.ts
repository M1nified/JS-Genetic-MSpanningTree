'use strict';
class Edge{
  a:string
  b:string
  weight:number = 0
  inuse:boolean = false;
  constructor(a:string,b:string,value:number){
    this.a = a;
    this.b = b;
    this.weight = value;
  }
  randomUse(){
    this.inuse = Math.floor(Math.random()*10) < 5 ? true : false;
    return this;
  }
  toString():string{
    return this.a + ' - ' + this.weight + ' -> ' + this.b + ' ('+this.inuse+')';
  }
  genMutate(){
    this.inuse = !this.inuse;
    return this;
  }
}
class Graph {
  arr:Edge[] = []
  constructor(arr:Edge[]=[]){
    this.arr = arr;
  }
  valueOfCompletness():number{
    let gc = new GraphConnections();
    let len = gc.parseGraph(this).length;
    return (len + 1) * 10;
  }

  value():number{//the less the better
    let sum = 0;
    this.arr.forEach(element => {
      sum += element.inuse !== false ? element.weight : 0;
    });
    sum *= this.valueOfCompletness()
    return sum;
  }
  randomUse():Graph{
    this.arr.forEach(element=>{
      element.randomUse();
    })
    return this;
  }
  push(edge:Edge){
    this.arr.push(edge);
    return this;
  }
  toString():string{
    return this.arr.map(elem=>{
      return elem.toString();
    }).join('\n');
  }
  sortByWeight():Graph{
    this.arr.sort((a,b)=>{
      return a.weight - b.weight;
    });
    return this;
  }
  genCrossed(snd:Graph):Graph[]{
      let pivot = Math.floor(Math.random()*this.arr.length);
      return Graph.genCross(this,snd,pivot);
  }
  static genCross(g1:Graph,g2:Graph,pivot:number){
      if(!g1 || !g2){
        return [g1,g2];
      }
      // console.log(g1.slicedHead(pivot),g2.slicedTail(pivot))
      let tmp1:Edge[] = g1.slicedHead(pivot).concat(g2.slicedTail(pivot));
      let tmp2:Edge[] = g1.slicedTail(pivot).concat(g2.slicedHead(pivot));
      return [new Graph(tmp1).sortByWeight(),new Graph(tmp2).sortByWeight()];
  }
  slicedHead(pivot:number):Edge[]{
    return pivot < this.arr.length ? this.arr.slice(0,pivot) : Array.apply(null,this.arr);
  }
  slicedTail(pivot:number):Edge[]{
    return pivot < this.arr.length ? this.arr.slice(pivot) : [];
  }
  genMutate(){
    this.arr[Math.floor(Math.random()*this.arr.length)].genMutate();
    return this;
  }
}