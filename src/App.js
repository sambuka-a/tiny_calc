import { useState, useEffect, useRef } from 'react';
import MainApp from './components/MainApp';
import useLocalStorage from './components/hooks/useLocalStorage';

import './App.css';
import Plate from './components/Plate';

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
];

function App() {
  const [order, setOrder] = useLocalStorage(offers, 'order');
  const [confirm, setConfirm] = useState(false);
  const [plateTrigger, setPlateTrigger] = useState(false);

  //clear local storage at midnight logic
  useEffect(() => {
    // Function to clear local storage data
    const clearLocalStorage = () => {
      let zero = order.map((i) => {
        i.totalCard = 0;
        i.totalCash = 0;
        return i;
      });
      setOrder(zero);
      setConfirm(false);
    };

    // Function to get the current time
    const getCurrentTime = () => {
      const now = new Date();
      return now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes since midnight
    };

    // Set the target time for clearing (midnight)
    const targetTime = 0; // 0 minutes corresponds to midnight

    // Calculate the time remaining until the target time
    const calculateTimeRemaining = () => {
      const currentTime = getCurrentTime();
      return targetTime - currentTime;
    };

    // Clear local storage data when the target time is reached
    const clearAtNextMidnight = () => {
      const timeRemaining = calculateTimeRemaining();

      // If the time remaining is negative, it means the target time has passed today.
      if (timeRemaining <= 0) {
        // Check if the date has already been cleared today
        const lastClearedDate = localStorage.getItem('lastClearedDate');
        const today = new Date().toLocaleDateString();

        if (lastClearedDate !== today) {
          clearLocalStorage();
          localStorage.setItem('lastClearedDate', today);
        }
      } else {
        // Schedule the clearing for the remaining time until midnight
        setTimeout(clearAtNextMidnight, timeRemaining * 60 * 1000);
      }
    };

    // Clean up the interval when the component unmounts
    return () => clearTimeout(clearAtNextMidnight);
  }, [order]);

  const handleShowPlate = () => {
    plateTrigger ? setPlateTrigger(false) : setPlateTrigger(true);
  };

  const handleConfirmClear = () => {
    setConfirm((confirm) => !confirm);
  };

  //Set total logic depending on method
  const setTotal = (data, method) => {
    let newState = order.map((item, index) => {
      if (Array.isArray(data)) {
        if (method === 'card') {
          item.totalCard += data[index];
        } else {
          item.totalCash += data[index];
        }
      } else if (item.name === 'plate') {
        return { ...item, totalCash: item.totalCash + data };
      }
      return item;
    });
    setOrder(newState);
  };

  //Clear storage manually
  const clearStorage = () => {
    let zero = order.map((i) => {
      i.totalCard = 0;
      i.totalCash = 0;
      return i;
    });
    setOrder(zero);
    setConfirm(false);
  };

  return (
    <div className="app">
      <div className={`plateButton ${plateTrigger && 'active'}`} onClick={handleShowPlate}>
        <p>{`${plateTrigger ? 'Calc' : 'Taca'}`}</p>
      </div>
      {!plateTrigger ? (
        <MainApp
          offers={order}
          setTotal={setTotal}
          handleClearData={clearStorage}
          confirm={confirm}
          handleConfirmClear={handleConfirmClear}
          setConfirm={setConfirm}
        />
      ) : (
        <Plate setPlate={setTotal} />
      )}
    </div>
  );
}

export default App;
