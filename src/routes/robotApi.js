module.exports = service => {
  service.post('/test', async function (req, res) {
    console.log(req.body.formData)
    res.send('调用成功')
  })
}
