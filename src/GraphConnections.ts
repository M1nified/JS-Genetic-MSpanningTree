class GraphConnections extends Array<string[]>{
	addEdge(edge:Edge){
		if(edge.inuse === false){
			return this;
		}
		let cc = this.findContainingConnection(edge.a);
		if(this.addToConnection(cc,edge.b) === false){
			cc = this.findContainingConnection(edge.b);
			if(this.addToConnection(cc,edge.a) === false){
				this.push([edge.a,edge.b]);
			}
		}
		return this;
	}
	consolidate(){
		for(let i = this.length - 1; i>=0;i--){
			let conn = this[i];
			for(let j = 0;j<this.length;j++){
				if(this.isMergable(conn,this[j])){
					conn.forEach(elem=>{
						this.addToConnection(this[j],elem);
					})
					this.splice(i,1);
					break;
				}
			}
		}
		return this;
	}
	findContainingConnection(peak:string):string[]|boolean{
		for(let connection of this){
			let inc = this.isInConnection(connection,peak);
			if(inc!==false){
				return connection;
			}
		}
		return false;
	}
	isInConnection(connection:string[],peak:string):number|boolean{
		let index = connection.indexOf(peak)
		if(index>=0){
			return index;
		}else{
			return false;
		}
	}
	addToConnection(connection:string[]|boolean,peak:string):boolean{
		if(Array.isArray(connection) && this.isInConnection(connection,peak) === false){
			connection.push(peak);
			return true;
		}else{
			return false;
		}
	}
	parseGraph(graph:Graph){
		graph.arr.forEach(edge=>{
			this.addEdge(edge);
		})
		this.consolidate();
		return this;
	}
	isMergable(a:string[],b:string[]){
		for(let el of a){
			if(b.indexOf(el) >= 0){
				return true;
			}
		}
		return false;
	}
}