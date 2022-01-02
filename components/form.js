import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import { addDays } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { getTransactionReceipt } from '../lib/posts'
import Image from 'next/image'

function Form() {
  const [transactionData, setTransactionData] = useState([])
  const setNetworkValue = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  function showLoader() {
    document.getElementById('loader').style.display = 'block'
  }

  function hideLoader() {
    document.getElementById('loader').style.display = 'none'
  }

  const fetchTransactionData = async event => {
      event.preventDefault()

      const formData = {
          network: event.target.network.value,
          address: event.target.address.value,
          startDate: startDate,
          endDate: endDate
      }

      const response = []

      try {
        showLoader()
        response = await getTransactionReceipt(formData)
      } catch(e) {
        console.log(e)
      } finally {
        hideLoader()
      }
      setTransactionData(response)
  }

  return(
    <section>
      <form id="transactionQuery" onSubmit={fetchTransactionData}>
        <label htmlFor="network">Network</label>
        <select
          id="network"
          name="network"
          onChange={(e) => setNetworkValue(e.target.value)}
        >
          <option value="harmony">Serendale on Harmony</option>
          <option value="avalanche" disabled>Crystalvale on Avalanche</option>
        </select>

        <label htmlFor="address">Address</label>
        <input id="address" type="text" placeholder="0x0000000000000000000000000000000000000000" required />

        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate.setHours(0,0,0,0)}
          maxDate={addDays(new Date(), 1)}
        />

        <label htmlFor="endDate">End Date</label>
        <DatePicker
          id="endDate"
          selected={endDate.setHours(0,0,0,0)}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          endDate={endDate}
          minDate={startDate}
          maxDate={addDays(new Date(), 1)}
        />

        <button type="submit">Submit</button>
      </form>
      <div id="loader" style={{ display: "none" }}>
        <Image
          priority
          src="/images/loader.png"
          height={144}
          width={144}
          className="animate-spin"
        />
      </div>
      <div className="flex flex-col">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              {/* <th>ID</th>
              <th>Start Time</th>
              <th>Start Block</th> */}
              <th scope="col" className="border font-header text-left px-8 py-4 text-left align-top">Timestamp</th>
              <th scope="col" className="border font-header text-left px-8 py-4 text-left align-top">Quest</th>
              <th scope="col" className="border font-header text-left px-8 py-4 text-left align-top">ID</th>
              {/* <th>Player</th> */}
              <th scope="col" className="border font-header text-left px-8 py-4 text-left align-top">Hero</th>
              <th scope="col" className="border font-header text-left px-8 py-4 text-left align-top">Reward</th>
              <th scope="col" className="border font-header text-left px-8 py-4 text-left align-top">Qty</th>
            </tr>
          </thead>
          <tbody>
            { transactionData.map(({ id, questContract, questId, player, heroId, startTime, startBlock, completeAtTime, rewardItem, itemQuantity }) => (
              <tr>
                {/* <td>{ id }</td>
                <td>{ startTime }</td>
                <td>{ startBlock }</td> */}
                <td className="border px-8 py-4 text-sm">{ completeAtTime ? moment.unix(completeAtTime).format("L @ LT") : '' }</td>
                <td className="border px-8 py-4 text-sm">{ questContract }</td>
                <td className="border px-8 py-4 text-sm">{ questId }</td>
                {/* <td>{ player }</td> */}
                <td className="border px-8 py-4 text-sm">{ heroId }</td>
                <td className="border px-8 py-4 text-sm text-center">
                  <Image
                    src={ "/images/items/" + rewardItem + ".png" }
                    height={40}
                    width={40}
                  /> <br />
                  { rewardItem }
                </td>
                <td className="border px-8 py-4 text-sm">{ itemQuantity }</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Form