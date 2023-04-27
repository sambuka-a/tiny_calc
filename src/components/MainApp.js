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

  const [filters, setFilters] = useState([])
  const [show, setShow] = useState(false)
  const [input, setInput] = useState(false)

  const currentInput = Object.values(price).reduce((acc, i) => acc + i, 0)
  const handleInput = () => {
    setInput(input => !input)
  }

  let filtered = offers.filter(i => !filters.includes(i.id)).reduce((acc, item) => acc + item.totalCash, 0)

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

  const handleClearInputs = () => {
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

  const handleHidePositions = (id) => {
    if(filters.indexOf(id) === -1) {
      setFilters([...filters, id])
    } else {
      setFilters(filters.filter(i => i !== id))
    }
  }

  return (
    <div className='mainApp'>
      <div className='content'>
        <div className='hero'>
          <div className='choices'>
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
          <div>
            <div className='current'>  
              <p>{currentInput || ''}</p>
            </div>
            <div className='current button'>  
              <p onClick={handleClearInputs}>C</p>
            </div>
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
                <p>Filters</p>
              </div>
              <div className='total'>
                {offers.map(i => (
                  <div key = {i.id} className='totalChecks'>
                    <label>hide</label>
                    <input
                      type='checkbox'
                      value={i.id}
                      onChange={() => handleHidePositions(i.id)}
                    />
                  </div>  
                ))}
                <div className='totalsData'>
                  <span>{filtered}</span>
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