import React, {useState} from 'react'
import {withAuthRedirect} from '../../hoc/WithAuthRedirect'
// import s from '/Settings.module.css'


const Settings = () => {

    let [items, setItems] = useState([])
    let [inputValue, setInputValue] = useState('')


    const addItem = () => {
        if (!items.includes(inputValue.trim())) {
            setItems([...items, inputValue.trim()])
            setInputValue('')
        }
    }

    const removeItem = () => {
        setItems(items.filter((item) => item != inputValue.trim()))
        setInputValue('')
    }

    const clearItems = () => {
        setItems([])
        setInputValue('')

    }

    const handleKeyDown = (event) => {
        if (!items.includes(inputValue.trim())) {
            if (event.key === 'Enter') {
                setItems([...items, inputValue.trim()])
                setInputValue('')
            }
        }
    }




    return (
        <>
            <div>
                <input
                    className="item-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                />
                <input
                    className="add-button"
                    type="button"
                    value="Add Item"
                    onClick={addItem}
                />
                <input
                    className="remove-button"
                    type="button"
                    value="Remove Item"
                    onClick={removeItem}
                />
                <input
                    className="clear-button"
                    type="button"
                    value="Clear Items"
                    onClick={clearItems}
                />
            </div>
            <ul className="items">
                {items.map((item) => {
                    return <li>{item}</li>
                })}
            </ul>
        </>
    )
}

let SettingsContainer = withAuthRedirect(Settings)

export default SettingsContainer
