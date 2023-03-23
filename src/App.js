import MainApp from "./components/MainApp";
import useLocalStorage from "./components/hooks/useLocalStorage";
 
import './App.css'

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
]


function App() {
  const [order, setOrder] = useLocalStorage(offers, 'order')

  const setTotal = (data, method) => {
    let newState = order.map((item,index) => {
      if(method === 'card') {
        item.totalCard += data[index]  
      } else {
        item.totalCash += data[index]
      }
      return item
    })
    setOrder(newState)
  }  

  const clearStorage = () => {
    let zero = order.map(i => {
      i.totalCard = 0 
      i.totalCash=0
      return i
    })
    setOrder(zero)
  }

  return (
    <div className="app">
      <MainApp 
        offers={order} 
        setTotal={setTotal}
        handleClearData={clearStorage} 
      />
    </div>
  );
}

export default App;

