module.exports = bot => {
  return async function onLogout(user) {
    console.log(`用户${user}已登出`)
    const contact = await bot.Contact.find({ alias: '陈华' })
    await contact.say('我退出了')
  }
}
