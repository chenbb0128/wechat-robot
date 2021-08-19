function arrayResolve(arr, chunkNum){
  let result = []
  for (let i = 0; i < arr.length; i += chunkNum) {
    result.push(arr.slice(i, i + chunkNum))
  }
  return result
}

module.exports = {
  arrayResolve
};
