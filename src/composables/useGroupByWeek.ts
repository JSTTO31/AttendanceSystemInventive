

export default (sortedData: any[]) => {
  const container : any[] = []
  let weeks : any[] = []
  sortedData.forEach((item, index) => {
    if(index + 1 >= sortedData.length){
      if(weeks.length> 0){
        container.push(weeks)
      }
    }else{
      const currentData = new Date(item.created_at)
      if(currentData.getDay() + 1 == 7){
        weeks.push(item)
        container.push(weeks)
        weeks = []
      }else{

        weeks.push(item)
      }
    }
  })


  return container
}
