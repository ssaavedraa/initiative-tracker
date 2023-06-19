import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

/* eslint-disable react/prop-types */
export default function Character ({
  name,
  initiative,
  id,
  onClose,
  onDelete,
  onSave,
  onEdit,
  isEditEnabled,
  createOrEdit
}) {
  const [characterData, setCharacterData] = useState({
    id,
    name,
    initiative
  })

  const [pendingChanges, setPendingChanges] = useState(true)

  const handleChange = (e) => {
    const characterId = id ?? uuidv4()
    const { name, value } = e.target
    const newCharacter = {
      ...characterData,
      id: characterId,
      [name]: value
    }

    setCharacterData(newCharacter)
  }

  const closeOrDelete = () => {
    createOrEdit === 'create' ? onClose() : onDelete(characterData.id)
  }

  const handleSave = () => {
    onSave(characterData)

    onClose()
  }

  const handleEdit = () => {
    onEdit(characterData)

    setPendingChanges((prevState) => !prevState)
  }

  return (
    <div className='flex flex-col items-center my-4 bg-gray-500 p-4 rounded-lg shadow-xl relative w-[250px] mx-auto'>
      <div className='my-2'>
        {
          createOrEdit === 'create' ? (
              <>
                <label htmlFor="name">Set character name</label>
                <input
                  className='w-full px-2 py-1 rounded-lg block my-2'
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </>
            ) : (
              <p className='inline-block w-[100%]'>{name}</p>
            )
        }
        <label className='m-2 block'>Initiative</label>
        {(createOrEdit && pendingChanges) ? (
            <input
              className='w-16 px-2 py-1 rounded-lg'
              type="text"
              name='initiative'
              onChange={handleChange}
              placeholder={initiative}
            />
          ) : (
            <p className='w-16 h-8'>{initiative}</p>
          )}
      </div>
      {createOrEdit === 'create' && <button onClick={handleSave}>Add character</button>}
      {isEditEnabled && <button onClick={handleEdit}>{(createOrEdit === 'edit' && pendingChanges) ? 'Save changes' : 'Edit'}</button>}
      <button className='w-auto h-auto absolute top-2 right-2 bg-transparent p-1' onClick={closeOrDelete}>X</button>
    </div>
  )
}