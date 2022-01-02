import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import { addDays } from "date-fns"
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { getTransactionReceipt } from '../lib/requests'
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

  function formatQuantity(item, quantity) {
    switch(item) {
      case 'Jewel Bag':
        return `${quantity * Math.pow(10, -18)} JEWEL`

      case 'Gold Bag':
        return `${quantity * Math.pow(10, -3)} DFKGOLD`
    }
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
      <div>
        <form id="transactionQuery" className="bg-obsidian p-5 m-5" onSubmit={fetchTransactionData}>
          <div className="flex flex-row mb-5">
            <div className="basis-1/4 mr-2">
              <label htmlFor="network" className="inline-block mb-2 font-header text-lg text-white">World</label>
              <select
                id="network"
                name="network"
                onChange={(e) => setNetworkValue(e.target.value)}
                className="
                  w-full
                  px-3
                  py-1.5
                  text-base
                  text-white
                  bg-obsidian
                  border-2 border-solid border-white
                  hover:border-ivy
                  active:border-ivy
                  transition
                  duration-300
                  ease-in-out
                  m-0
                  focus:bg-obsidian focus:border-ivy focus:outline-none 
                "
              >
                <option value="harmony">Serendale</option>
                <option value="avalanche" disabled>Crystalvale</option>
              </select>
            </div>
            <div className="basis-3/4 ml-2">
              <label htmlFor="address" className="inline-block mb-2 font-header text-lg text-white">Address</label>
              <input 
                className="
                  w-full
                  px-3
                  py-1.5
                  text-base
                  text-white
                  bg-obsidian
                  border-2 border-solid border-white
                  hover:border-ivy
                  transition
                  duration-300
                  ease-in-out
                  m-0
                  focus:bg-obsidian focus:border-ivy focus:outline-none 
                  active:bg-obsidian
                "
                id="address" type="text" placeholder="0x0000000000000000000000000000000000000000" required
              />
            </div>
          </div>

          <div className="flex flex-row mb-5">
            <div className="basis-1/2 mr-2">
              <label htmlFor="startDate" className="inline-block mb-2 font-header text-lg text-white">Start Date</label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate.setHours(0,0,0,0)}
                maxDate={addDays(new Date(), 1)}
                className="
                  w-full
                  px-3
                  py-1.5
                  text-base
                  text-white
                  bg-obsidian
                  border-2 border-solid border-white
                  hover:border-ivy
                  transition
                  duration-300
                  ease-in-out
                  m-0
                  focus:bg-obsidian focus:border-ivy focus:outline-none 
                  active:bg-obsidian 
                "
              />
            </div>
            <div className="basis-1/2 ml-2">
              <label htmlFor="endDate" className="inline-block mb-2 font-header text-lg text-white">End Date</label>
              <DatePicker
                id="endDate"
                selected={endDate.setHours(0,0,0,0)}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                endDate={endDate}
                minDate={startDate}
                maxDate={addDays(new Date(), 1)}
                className="
                  w-full
                  px-3
                  py-1.5
                  text-base
                  text-white
                  bg-obsidian
                  border-2 border-solid border-white
                  hover:border-ivy
                  transition
                  duration-300
                  ease-in-out
                  m-0
                  focus:bg-obsidian focus:border-ivy focus:outline-none 
                  active:bg-obsidian 
                "
              />
            </div>
          </div>

          <div className="flex flex-row mb-5">
            <button
              className="
                px-10
                py-1.5
                bg-obsidian
                text-honey                
                text-xs
                uppercase
                tracking-widest
                rounded-lg
                border-honey
                border-2
                hover:-translate-y-0.5
                hover:text-obsidian
                hover:bg-daffodil
                active:bg-daffodil
                transition
                duration-300
                ease-in-out
              "
              type="submit">Submit</button>
          </div>
        </form>
      </div>
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
              {/* <th scope="col" className="border font-header text-left px-8 py-4 text-left align-top">ID</th>
              <th scope="col" className="border font-header text-left px-8 py-4 text-left align-top">Start Time</th>
              <th scope="col" className="border font-header text-left px-8 py-4 text-left align-top">Start Block</th> */}
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
                {/* <td className="border px-8 py-4 text-sm">{ id }</td>
                <td className="border px-8 py-4 text-sm">{ startTime }</td>
                <td className="border px-8 py-4 text-sm">{ startBlock }</td> */}
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
                <td className="border px-8 py-4 text-sm">{ formatQuantity(rewardItem, itemQuantity) }</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Form