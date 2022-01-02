import { Interface } from 'ethers/lib/utils'
import moment from 'moment'

const contracts = require(`../resources/constants/Contracts.json`)
const questABI = require(`../resources/abi/QuestCoreV2.json`)

const iface = new Interface(questABI)

function transactionRequestWrapper(address) {
  const transaction_body =
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "hmyv2_getTransactionsHistory",
    "params": [
        {
            "address": `${address}`,
            "fullTx": true,
            "txType": "ALL",
            "order": "DESC"
        }
    ]
  }
  return transaction_body
}

// get receipt of Complete Quest event
function receiptRequestWrapper(eth_hash) {
  const receipt_body = 
  {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "hmyv2_getTransactionReceipt",
      "params": [
          `${eth_hash}`
      ]
  }
  return receipt_body
}

export async function getTransactionReceipt(query) {
  const all_tx_res = await fetch('https://rpc.s0.t.hmny.io', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionRequestWrapper(query.address)),
  })
  const all_txns_payload = await all_tx_res.json()
  const all_eth_hash = all_txns_payload.result.transactions.map((transaction) => transaction.ethHash)

  const allQuestData = []
  const allQuestCompletedDecoded = []
  const allQuestRewardsDecoded = []
  const questCompletedDump = []
  const questRewardsDump = []

  for(const eth_hash of all_eth_hash) {
    const res = await fetch('https://rpc.s0.t.hmny.io', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(receiptRequestWrapper(eth_hash)),
    })
    const payload = await res.json()
    const questIds = []

    payload.result.logs.filter(function(log) {
      switch(log.topics[0]) {
        case iface.getEventTopic("QuestCompleted"):
          questCompletedDump.push(payload.result.logs.filter((log) => log.topics[0] == iface.getEventTopic("QuestCompleted")))
          
        case iface.getEventTopic("QuestReward"):
          questRewardsDump.push(payload.result.logs.filter((log) => log.topics[0] == iface.getEventTopic("QuestReward")))

      }
    })
  }

  const questCompletedFlat = [].concat(...questCompletedDump)
  const allQuestCompleted = questCompletedFlat.filter((el, i) => questCompletedFlat.indexOf(el) === i)

  const questRewardsFlat = [].concat(...questRewardsDump)
  const allQuestRewards = questRewardsFlat.filter((el, i) => questRewardsFlat.indexOf(el) === i)

  // Decode all completed quests
  allQuestCompleted.forEach((questComplete) => {
    const data = questComplete.data
    const topics = questComplete.topics

    try {
      const eventLog = iface.decodeEventLog("QuestCompleted", data, topics)
      const id = eventLog.quest.id.toNumber()
      const questContract = Object.keys(contracts).find(key => contracts[key] === eventLog.quest.quest) ? Object.keys(contracts).find(key => contracts[key] === eventLog.quest.quest) : eventLog.quest.quest
      const questId = eventLog.questId.toNumber()
      const player = eventLog.player
      const heroId = eventLog.heroId.toNumber()
      const startTime = eventLog.quest.startTime.toNumber()
      const startBlock = eventLog.quest.startBlock.toNumber()
      const completeAtTime = eventLog.quest.completeAtTime.toNumber()

      const lowerDateRange = moment(query.startDate)
      const upperDateRange = moment(query.endDate).add(1, 'd')

      if(moment.unix(completeAtTime) >= lowerDateRange && moment.unix(completeAtTime) < upperDateRange) {
        allQuestCompletedDecoded.push({ id, questContract, questId, player, heroId, startTime, startBlock, completeAtTime })
      }
    }
    catch(e) {
      console.log(e)
    }
  })

  
  // Decode all rewards from quests
  allQuestRewards.forEach((questReward) => {
    const data = questReward.data
    const topics = questReward.topics

    try {
      const eventLog = iface.decodeEventLog("QuestReward", data, topics)
      const questId = eventLog.questId.toNumber()
      const player = eventLog.player
      const heroId = eventLog.heroId.toNumber()
      const rewardItem = Object.keys(contracts).find(key => contracts[key] === eventLog.rewardItem) ? Object.keys(contracts).find(key => contracts[key] === eventLog.rewardItem) : eventLog.rewardItem
      const itemQuantity = eventLog.itemQuantity.toString()
      
      if(rewardItem !== "Nothing") {
        allQuestRewardsDecoded.push({ questId, player, heroId, rewardItem, itemQuantity })
      }
    }
    catch(e) {
      console.log(e)
    }
  })

  // Format report
  allQuestCompletedDecoded.forEach((questComplete) => {
    allQuestData.push(questComplete)
    allQuestRewardsDecoded.filter((questReward) => questReward.questId == questComplete.questId && questReward.heroId == questComplete.heroId).forEach((questReward) => {
      allQuestData.push(questReward)
    })
  })

  return allQuestData
}