import { useState } from "react";
import MainApp from "./components/MainApp";
import useLocalStorage from "./components/hooks/useLocalStorage";
 
import './App.css'
import Plate from "./components/Plate";

const offers = [
  { 
    id: 0,
    name: 'candles',
    totalCard: 0,
    totalCash: 0,
  },
  {
    id: 1,
    name: 'notes',
    totalCard: 0,
    totalCash: 0,
  },
  {
    id: 2,
    name: 'prosfory',
    totalCard: 0,
    totalCash: 0,
  },
  {
    id: 3,
    name: 'other',
    totalCard: 0,
    totalCash: 0,
  },
  {
    id: 4,
    name: 'plate',
    totalCard: 0,
    totalCash: 0,
  },
]


function App() {
  const [order, setOrder] = useLocalStorage(offers, 'order')
  const [confirm, setConfirm] = useState(false)
  const [plateTrigger, setPlateTrigger] = useState(false)

  const handleShowPlate = () => {
    plateTrigger ? setPlateTrigger(false) : setPlateTrigger(true)
  }

  const handleConfirmClear = () => {
    setConfirm(confirm => !confirm)
  }

  const setTotal = (data, method) => {
    let newState = order.map((item,index) => {
      if(Array.isArray(data)) {
        if(method === 'card') {
          item.totalCard += data[index]  
        } else {
          item.totalCash += data[index]
        }
      }
      else if (item.name === 'plate') {
        return {...item, totalCash: item.totalCash + data}
      }
      return item
    })
    setOrder(newState)
  }  

  const clearStorage = () => {
    let zero = order.map(i => {
      i.totalCard = 0 
      i.totalCash = 0
      return i
    })
    setOrder(zero)
    setConfirm(false)
  }

  return (
    <div className="app">
      <div 
        className={`plateButton ${plateTrigger && "active"}`}
        onClick ={handleShowPlate}
      >
        <p>{`${plateTrigger ? 'Calc' : 'Taca'}`}</p>
      </div>
      {!plateTrigger ?  
        <MainApp 
        offers={order} 
        setTotal={setTotal}
        handleClearData={clearStorage}
        confirm={confirm}
        handleConfirmClear={handleConfirmClear}
        setConfirm={setConfirm}

      />
        : 
        <Plate
          setPlate={setTotal}
        />
      }
      
    </div>
  );
}

export default App;

