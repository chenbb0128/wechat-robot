/**
 * 更新用户联系人
 * @param bot bot实例
 * @returns {Promise<void>}
 */
async function updateContactInfo(bot) {
  const contactList = await bot.Contact.findAll();
  let data = [];
  for (let contact of contactList) {
    contact = contact.payload
    if (!contact.friend || contact.type !== bot.Contact.Type.Individual) {
      continue
    }
    let obj = {
      wx_id: contact.id,
      wx_no: contact.weixin,
      username: contact.name,
      alias: contact.alias,
      gender: contact.gender,
      province: contact.province,
      city: contact.city,
      avatar: contact.avatar,
      is_friend: contact.friend,
      signature: contact.signature,
      star: contact.star,
    }
    data.push(obj)
  }
  console.log(data.length)
}

/**
 * 更新群信息
 * @param bot 机器人实例
 * @returns {Promise<void>}
 */
async function updateRoomInfo(bot) {
  try {
    const roomList = await bot.Room.findAll()
    let data = []
    for (let i of roomList) {
      let room = i.payload
      let obj = {
        roomId: room.id,
        topic: room.topic,
        avatar: room.avatar || '',
        ownerId: room.ownerId || '',
        adminIds: room.adminIdList.toString(),
        memberCount: room.memberIdList.length,
      }
      data.push(obj)
    }
    console.log(data)
  } catch (e) {
    console.log('e', e)
  }
}

module.exports = {
  updateContactInfo,
  updateRoomInfo
}
