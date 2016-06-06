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
  value():number{//less is better
    let sum = 0;
    this.arr.forEach(element => {
      sum += element.inuse !== false ? element.weight : 0;
    });
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
class MST{
  god:Graph
  family:Graph[] = []
  size:number = 100
  maxIter:number = 400;
  values:number[] = [];
  valsum:number = 0;
  constructor(god:Graph){
    this.god = god;
  }
  findMST():Graph{
    this.makeFamily();
    console.log(this.family.toString());
    for(let i = 0;i<this.maxIter;i++){
      this.genEvolve();
      console.log(this.family[0].toString(),'\n');
    }
    return this.sortByValue().family[0];
  }
  makeFamily():MST{
    for(let i = 0;i<this.size;i++){
      this.family.push(Object.create(this.god).randomUse().sortByWeight());
    }
    return this;
  }
  sortByValue():MST{
    this.family.sort((a,b)=>{
      return a.value() - b.value();
    })
    return this;
  }
  genMutate(){
    let rnd = Math.floor(Math.random()*(this.family.length-1));
    this.family[rnd] && this.family[rnd].genMutate();
    return this;
  }
  genSelectLinearPair(){
    this.sortByValue();
    return [this.family[0],this.family[1]];
  }
  genCross(){
    let tocorss = this.genSelectLinearPair();
    let crossed = tocorss[0].genCrossed(tocorss[1]);
    this.family[0] = crossed[0];
    this.family[1] = crossed[1];
    return this;
  }
  genEvolve(){
    return this.genQuotation().genSelection().genCross().genMutate();
  }
  genQuotation(){
    this.values = [];
    this.valsum = 0;
    this.sortByValue();
    for(let i = 0;i<this.family.length;i++){
      if(!this.family[i]) continue;
      let elval = this.family[i].value();
      this.values.push(elval)
      this.valsum += elval;
    }
    for(let i = 1;i<this.values.length;i++){
      this.values[i] += this.values[i-1]; 
    }
    return this;
  }
  genSelection(){
    let newfamily:Graph[] = [];
    for(let i = 0;i<this.size;i++){
      let rnd = Math.random();
      let j = 0;
      for(;++i<this.values.length && rnd>this.values[i];);
      newfamily.push(this.family[i]);
    }
    this.family = newfamily;
    return this;
  }
}
declare var module: any;
try{
  (module).exports = {
    Edge,
    Graph,
    MST
  }
}catch(e){}