# Minimalne Drzewo Rozpinające (Minimum Spanning Tree)
## Problem
Wykrzystanie programowania genetycznego w poszukiwaniu minimalnego drzewa rozpinającego.
## Nazwy
* ***gen***/***bit*** np. Kobieta/Mężczyzna
* ***chromosom*** to ciąg ***genów***
* ***populacja*** zbiór ***chromosomów*** o stałym rozmiarze

## Dostępne operacje genetyczne
* __mutacja__ to odwrócenie losowo wybranego ***genu***
* __krzyżowanie__/__krosowanie__ oznacza rozmnożenie ze sobą dwóch ***chromosomów*** poprzez ich podział w losowym miejscu. Długość nowych ***dzieci*** jest taka sama jak ***rodziców***.   

## Deklaracje typów
### 1. Krawędź - ***gen***
Krawędzie odpowiadają ***genom***, każdy zawiera informaje o
* `a`,`b` - wierzchołkach łączonych za jej pomocą 
* `weight` - waga krawędzi
* `inuse` - określa czy krawędz jest aktywna w grafie, ***gen*** aktywny lub nie

Operacje na krawędzi
* `randomUse()` - losuje czy ***gen*** ma być aktywny
* `genMutate()` - jeśli krawedz zostanie wybrana jako element do __mutowania__, to odwracana jest wartość `inuse`

``` typescript
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
```
### 2. Graf - ***chromosom***
Graf przechowuje
*  `arr` - swoją liste krawędzi (***genów***)

Operacje na grafie obejmują
* `value()` - obliczanie wartości grafu, funkcja powinna brać pod uwagę ilość przyłączonych do grafu wierzchołków w stosunku do wszystkich, które trzeba dołączyć aby graf był pełny oraz wagę aktywnych krawędzi
* `randomUse()` - losuje dla każdej krawędzi (***genu***), czy ma być aktywna
* `sortByWeight()` - sortuje liste krawędzi od najtańszych
* `genCrossed(snd:Graph)` - wykonuje operację __krzyżowania__ grafu `this` z zadanym innym grafem i zwraca parę po __korosowaniu__
* `genMutate()` - wykonuje operacje __mutacji__ na losowym połączeniu w grafie

``` typescript
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
```
### 3. MST
Klasa MST zawiera
* `god` - graf wejściowy, który jest źródłem do zapełnienia `family`
* `family` - rodzina, a właściwie najmłodsza generacja
* `size` - określa liczność generacji (ilość ***chromosomów***)
* `maxIter` - określa ilość iteracji do wykonania w celu poszukiwania rozwiązania
 
Możliwe operacje to
* `makeFamily()` - tworzy pierwsze pokolenia na podstawie `god` i ustawia losowe ***geny***
* `sortByValue()` - sortuje pokolenia na podstawie przystosowania ***chromosomów***
* `genMutate()` - wykonuje __mutacje__ losowego ***chromosomu***
* `genCross()` - __krzyżuje__ losowy ***chromosom***
* `genEvolve()` - wykonuje losowo jedną z operacji i tworzy nowe pokolenie zastępujące dotychczasowe

``` typescript
declare class MST {
    god: Graph;
    family: Graph[];
    size: number;
    maxIter: number;
    constructor(god: Graph);
    findMST(): Graph;
    makeFamily(): MST;
    sortByValue(): MST;
    genMutate(): MST;
    genCrossSelectLinear(): Graph[];
    genCross(): MST;
    genEvolve(): MST;
}
```

## Pobieranie wyniku
Po zakończeniu działania musimy jeszcze raz posortosć zawartośc `(MST).family` według wartości i pobrać pierwszy element listy. Będzie to najlpeiej dopasowany osobnik.
