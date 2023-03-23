import {useState} from 'react'


const MainApp = ({offers, setTotal, handleClearData}) => {
  const [price, setPrice] = useState({
    candles: null,
    notes: null,
    prosfory: null,
    other: null,
  })

  const handlePrice = (e) => {
    const value = e.target.value
    setPrice({
      ...price,
      [e.target.name] : +value  
    })
  }

  const handlePayment = (e) => {
    let type = e.target.value
    setTotal(Object.values(price), type)
    setPrice({
      candles: 0,
      notes: 0,
      prosfory: 0,
      other: 0,
    })
  }

  return (
    <div className='mainApp'>
      <div className='content'>
        <div className='hero'>
          <div className='choice'>
            <label>Candles</label>  
            <input
              type='number'
              name='candles'
              value={price.candles}
              onChange={handlePrice}
            />
          </div>
          <div className='choice'>
            <label>Notes</label>  
              <input
                type='number'
                name='notes'
                value={price.notes}
                onChange={handlePrice}
              />
          </div>
          <div className='choice'>
            <label>Prosfory</label>  
              <input
                type='number'
                name='prosfory'
                value={price.prosfory}
                onChange={handlePrice}
              />
          </div>
          <div className='choice'>
            <label>Other</label>  
              <input
                type='number'
                name='other'
                value={price.other}
                onChange={handlePrice}
              />
          </div>
        </div>
        <div className='paymentType'>
          <button value={'card'} className='payment' onClick={handlePayment}>Card</button>
          <button id='cash' value={'cash'} className='payment' onClick={handlePayment}>Cash</button>
        </div>
        <div className='totals'>
          <div className='card'>
            <div className='title'>
              <p>Card</p>
            </div>
            <div className='total'>
              {offers.map(i => (
                <p key={i.id}>{`${i.name}: `}<span>{i.totalCard}</span></p>
              ))}
              <div className='totalsData'>
                <span>{offers.reduce((acc, item) => acc + item.totalCard, 0)}</span>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='title'>
              <p>Cash</p>
            </div>
            <div className='total'>
              {offers.map(i => (
                <p key={i.id}>{`${i.name}: `}<span>{i.totalCash}</span></p>
              ))}
              <div className='totalsData'>
                <span>{offers.reduce((acc, item) => acc + item.totalCash, 0)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='reset'>
          <button onClick={handleClearData}>Clear Data</button>
        </div>
      </div>
    </div>
  )
}

export default MainApp