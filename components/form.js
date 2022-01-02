import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import { addDays } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { getTransactionReceipt } from '../lib/posts'
import Image from 'next/image'
import styles from './form.module.css'

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
      <div id="loader" style={{ display: "none" }} className={styles.container}>
        <Image
          priority
          src="/images/loader.png"
          height={144}
          width={144}
          className={styles.loader}
        />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Time</th>
              <th>Start Block</th>
              <th>Complete At Time</th>
              <th>Quest Contract</th>
              <th>Quest ID</th>
              <th>Player</th>
              <th>Hero</th>
              <th>Reward</th>
              <th>Reward Photo</th>
              <th>Item Quantity</th>
          </tr>
          </thead>
          <tbody>
            { transactionData.map(({ id, questContract, questId, player, heroId, startTime, startBlock, completeAtTime, rewardItem, itemQuantity }) => (
              <tr>
                <td>{ id }</td>
                <td>{ startTime }</td>
                <td>{ startBlock }</td>
                <td>{ completeAtTime ? moment.unix(completeAtTime).toString() : '' }</td>
                <td>{ questContract }</td>
                <td>{ questId }</td>
                <td>{ player }</td>
                <td>{ heroId }</td>
                <td>{ rewardItem }</td>
                <td>
                  <Image
                    src={ "/images/items/" + rewardItem + ".png" }
                    height={40}
                    width={40}
                  />
                </td>
                <td>{ itemQuantity }</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Form