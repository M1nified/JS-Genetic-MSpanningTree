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
  value():number{
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
      let tmp1:Edge[] = g1.slicedHead(pivot).concat(g2.slicedTail(pivot));
      let tmp2:Edge[] = g1.slicedTail(pivot).concat(g2.slicedHead(pivot));
      return [new Graph(tmp1).sortByWeight(),new Graph(tmp2).sortByWeight()];
  }
  slicedHead(pivot:number):Edge[]{
    return pivot < this.arr.length ? this.arr.slice(0,pivot) : Object.create(this.arr);
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
  size:number = 4
  maxIter:number = 40;
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
    return this.god;
  }
  makeFamily():MST{
    for(let i = 0;i<this.size;i++){
      this.family.push(Object.create(this.god).randomUse().sortByWeight());
    }
    return this;
  }
  sortByWeight():MST{
    this.family.sort((a,b)=>{
      return a.value() - b.value();
    })
    return this;
  }
  genMutate(){
    this.family[Math.floor(Math.random()*this.family.length)].genMutate();
    return this;
  }
  genCrossSelectLinear(){
    this.sortByWeight();
    return [this.family[0],this.family[1]];
  }
  genCross(){
    let tocorss = this.genCrossSelectLinear();
    let crossed = tocorss[0].genCrossed(tocorss[1]);
    this.family[0] = crossed[0];
    this.family[1] = crossed[1];
    return this;
  }
  genEvolve(){
    let way = Math.random()*10;
    if(way < 5){
      this.genCross();
    }else{
      this.genMutate();
    }
    return this;
  }
}
declare var module: any;
(module).exports = {
  Edge,
  Graph,
  MST
}