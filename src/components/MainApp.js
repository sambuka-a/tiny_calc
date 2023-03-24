import {useState, useEffect, useRef} from 'react'


const MainApp = ({confirm, offers, setTotal, setConfirm, handleClearData, handleConfirmClear}) => {
  const inputRef = useRef()
  const min = -999
  const max = 999

  const [price, setPrice] = useState({
    candles: +'',
    notes: +'',
    prosfory: +'',
    other: +'',
  })
  const [show, setShow] = useState(false)
  const [input, setInput] = useState(false)

  const handleInput = () => {
    setInput(input => !input)
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [input])

  const handlePayment = (e) => {
    let type = e.target.value
    setTotal(Object.values(price), type)
    setPrice({
      candles: null,
      notes: null,
      prosfory: null,
      other: null,
    })
    handleInput()
  }

  const handleShowTotal = () => {
    setShow(show => !show)
  }

  const handlePrice = (e) => {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setPrice({
      ...price,
      [e.target.name] : +value  
    })
  }

  return (
    <div className='mainApp'>
      <div className='content'>
        <div className='hero'>
          <div className='choice'>
            <label>Candles</label>  
            <input
              ref={inputRef}
              type='number'
              name='candles'
              value={price.candles || ''}
              onChange={handlePrice}
            />
          </div>
          <div className='choice'>
            <label>Notes</label>  
              <input
                type='number'
                name='notes'
                value={price.notes || ''}
                onChange={handlePrice}
              />
          </div>
          <div className='choice'>
            <label>Prosfory</label>  
              <input
                type='number'
                name='prosfory'
                value={price.prosfory || ''}
                onChange={handlePrice}
              />
          </div>
          <div className='choice'>
            <label>Other</label>  
              <input
                type='number'
                name='other'
                value={price.other || ''}
                onChange={handlePrice}
              />
          </div>
        </div>
        <div className='paymentType'>
          <button value={'card'} className='payment' onClick={handlePayment}>Card</button>
          <button id='cash' value={'cash'} className='payment' onClick={handlePayment}>Cash</button>
        </div>
        <div className='reset'>
          <button onClick={handleShowTotal}>Show/Hide</button>
        </div>
        {show && 
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
            <div className='card'>
              <div className='title'>
                <p>Total</p>
              </div>
              <div className='total totalSum'>
                {offers.map(i => (
                  <p key={i.id}>{i.totalCash + i.totalCard}</p>
                ))}
                <div className='totalsData'>
                  <span>{offers.reduce((acc, item) => acc + (item.totalCash + item.totalCard), 0)}</span>
                </div>
              </div>
            </div>
          </div>
        }
        <div className='reset'>
          <div>
            <button onClick={handleConfirmClear}>Clear Data</button>
          </div>
          {confirm && 
            <div className='confirm'>
              <button onClick={handleClearData}>Yes</button>
              <button id='no' onClick={() => setConfirm(false)}>No</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MainApp