/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import './App.css'
import Character from './components/Character/Character'
import { useState } from 'react'
import { useAddCharacter } from './hooks/useAddCharacter'

function App() {
  const {
    characterList,
    isAddCharacterOpen,
    openAddCharacter,
    closeAddCharacter,
    saveNewCharacter,
    deleteCharacter,
    editInitiative,
    sortCharacters,
    deleteAllCharacters
  } = useAddCharacter()

  const [isEditEnabled, setIsEditEnabled] = useState(false)

  const toggleEdit = () => {
    setIsEditEnabled((prevState) => !prevState)
  }

  useEffect(() => {
    if (!isEditEnabled) {
      sortCharacters()
    }
  }, [isEditEnabled, characterList])

  return (
    <div className='w-full'>
      <div>
        <button className='m-2' onClick={openAddCharacter}>
          Add character
        </button>
        <button className='m-2' onClick={toggleEdit}>
          {!isEditEnabled ? 'Edit iniciative' : 'Finish Edit'}
        </button>
        <button className='m-2 bg-red-800' onClick={deleteAllCharacters}>
          Delete all
        </button>
      </div>
      {isAddCharacterOpen &&
        <Character
          add={isAddCharacterOpen}
          onClose={closeAddCharacter}
          createOrEdit='create'
          onSave={saveNewCharacter}
        />}
      <div className='max-h-[80vh] overflow-y-auto'>
        {
          characterList.map(({name, initiative, id}) => (
            <Character
              name={name}
              initiative={initiative}
              id={id}
              key={id}
              add={isAddCharacterOpen}
              onSave={saveNewCharacter}
              createOrEdit={isEditEnabled ? 'edit' : undefined}
              onDelete={deleteCharacter}
              onEdit={editInitiative}
              isEditEnabled={isEditEnabled}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
