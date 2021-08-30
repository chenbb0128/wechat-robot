const { arrayResolve } = require('../utils/array')
const syncUsers = require('../server/SyncUsers')
const delay = require('delay');

/**
 * 更新用户联系人
 * @param bot bot实例
 * @returns {Promise<void>}
 */
async function updateContactInfo(bot) {
  console.log('更新用户')
  const contactList = await bot.Contact.findAll();
  let data = [];
  for (let contact of contactList) {
    contact = contact.payload
    // 是好友且不是公众号
    if (contact.friend && contact.type !== bot.Contact.Type.Official) {
      let obj = {
        wx_id: contact.id,
        wx_no: contact.weixin,
        name: contact.name,
        alias: contact.alias,
        gender: contact.gender,
        province: contact.province,
        city: contact.city,
      }
      data.push(obj)
    }
  }
  await updateFriend(data, 10)
}

/**
 * 添加新的好友
 * @param friend
 * @returns {Promise<void>}
 */
async function addFriend(friend) {
  const contact = friend.payload
  let data = {
    wx_id: contact.id,
    wx_no: contact.weixin,
    name: contact.name,
    alias: contact.alias,
    gender: contact.gender,
    province: contact.province,
    city: contact.city,
  }
  await updateFriend([data])
}

async function updateFriend(list, chunkNum = 10) {
  const arr = arrayResolve(list, chunkNum)
  for (const users of arr) {
    await new syncUsers(users)
      .send()
      .then(response => {
        const data = response.data
        if (data.code !== 200) {
          console.log('更新好友失败', data.msg)
        }
      })
      .catch(error => {
        console.log(error)
        console.log('更新好友列表失败')
      })
    await delay(10000)
  }
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
  updateRoomInfo,
  addFriend
}
