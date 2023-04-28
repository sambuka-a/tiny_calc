import {useState, useEffect, useRef} from 'react'

const Plate = ({setPlate}) => {
  const inputRef = useRef()
  const min = -999
  const max = 999

  const [price, setPrice] = useState({
    one: +'',
    two: +'',
    five: +'',
    ten: +'',
    twenty: +'',
    fifty: +'',
    hundred: +'',
    twoHundred: +'',
    fiveHundred: +'',
  })

  const [input, setInput] = useState(false)

  const nominals = [1,2,5,10,20,50,100,200,500]
  const currentInput = Object.values(price).map((item, index) => item * nominals[index]).reduce((acc, i) => acc + i, 0)
  const handleInput = () => {
    setInput(input => !input)
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [input])



  const handleClearInputs = () => {
    setPrice({
      one: null,
      two: null,
      five: null,
      ten: null,
      twenty: null,
      fifty: null,
      hundred: null,
      twoHundred: null,
      fiveHundred: null,
    })
    handleInput()
  }


  const handlePrice = (e) => {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setPrice({
      ...price,
      [e.target.name] : +value  
    })
  }

  const handleAddPlate = (e) => {
    let plate = e.target.value
    setPlate([null,null,null,null,+plate])
    setPrice({
      one: null,
      two: null,
      five: null,
      ten: null,
      twenty: null,
      fifty: null,
      hundred: null,
      twoHundred: null,
      fiveHundred: null,
    })
    handleInput()
  }

  return (
    <div className='mainApp'>
      <div className='content'>
        <div className='hero plateContainer'>
          <div className='choices'>
            <div className='choice plate'>
              <label>1</label>  
              <input
                ref={inputRef}
                type='number'
                name='one'
                value={price.one || ''}
                onChange={handlePrice}
              />
            </div>
            <div className='choice plate'>
              <label>2</label>  
                <input
                  type='number'
                  name='two'
                  value={price.two || ''}
                  onChange={handlePrice}
                />
            </div>
            <div className='choice plate'>
              <label>5</label>  
                <input
                  type='number'
                  name='five'
                  value={price.five || ''}
                  onChange={handlePrice}
                />
            </div>
            <div className='choice plate'>
              <label>10</label>  
                <input
                  type='number'
                  name='ten'
                  value={price.ten || ''}
                  onChange={handlePrice}
                />
            </div>
            <div className='choice plate'>
              <label>20</label>  
              <input
                ref={inputRef}
                type='number'
                name='twenty'
                value={price.twenty || ''}
                onChange={handlePrice}
              />
            </div>
            <div className='choice plate'>
              <label>50</label>  
              <input
                ref={inputRef}
                type='number'
                name='fifty'
                value={price.fifty || ''}
                onChange={handlePrice}
              />
            </div>
            <div className='choice plate'>
              <label>100</label>  
              <input
                ref={inputRef}
                type='number'
                name='hundred'
                value={price.hundred || ''}
                onChange={handlePrice}
              />
            </div>
            <div className='choice plate'>
              <label>200</label>  
              <input
                ref={inputRef}
                type='number'
                name='twoHundred'
                value={price.twoHundred || ''}
                onChange={handlePrice}
              />
            </div>
            <div className='choice plate'>
              <label>500</label>  
              <input
                ref={inputRef}
                type='number'
                name='fiveHundred'
                value={price.fiveHundred || ''}
                onChange={handlePrice}
              />
            </div>
          </div>
          <div className='clearSection'>
            <div className='current'>  
              <p>{currentInput || ''}</p>
            </div>
            <div>
              <button value={currentInput || 0} onClick={handleAddPlate}>ADD</button>
            </div>
            <div className='current button'>  
              <p onClick={handleClearInputs}>C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plate