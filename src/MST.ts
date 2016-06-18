// var graph = new Graph();
// graph.push(new Edge('A','B',3)).push(new Edge('B','C',5)).push(new Edge('A','D',1)).push(new Edge('B','D',3)).push(new Edge('C','E',5)).push(new Edge('B','E',3)).push(new Edge('D','E',3)).push(new Edge('E','G',5)).push(new Edge('D','G',9)).push(new Edge('D','F',5)).push(new Edge('F','G',2));

// let mst = new MST(graph);
// // mst.findMST();

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
    //console.log(this.family.toString());
    for(let i = 0;i<this.maxIter;i++){
      this.genEvolve();
      console.log('---');
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
    console.log("toctoss:",tocorss)
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