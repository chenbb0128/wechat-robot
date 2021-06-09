function randomNum(minNum,maxNum){
  let num
  switch(arguments.length){
    case 1:
      num =  parseInt(Math.random() * minNum + 1,10)
      break
    case 2:
      num =  parseInt(Math.random() * (maxNum - minNum + 1) + minNum,10)
      break
    default:
      num = 0
  }
  return num
}

module.exports = randomNum;
