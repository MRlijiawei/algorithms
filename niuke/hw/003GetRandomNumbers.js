while(line=readline()) {
    let arr = []
    for (let i=0;i<line;i++) { 
        arr.push(readline())
    }
    const arSet = [...new Set(arr)]
    const arSetSort = arSet.sort((a,b)=>{return a-b})
    for (let j=0;j<arSetSort.length;j++) { 
        console.log(arSetSort[j])
    }
}