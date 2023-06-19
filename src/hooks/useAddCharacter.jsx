import { useState } from 'react'

export const useAddCharacter = () => {
  const [isAddCharacterOpen, setIsAddCharacterOpen] = useState(false)
  const [characterList, setCharacterList] = useState(JSON.parse(window.localStorage.getItem('characterList')) || [])

  const openAddCharacter = () => {
    setIsAddCharacterOpen(true)
  }

  const closeAddCharacter = () => {
    setIsAddCharacterOpen(false)
  }

  const saveNewCharacter = ({ id, name, initiative }) => {
    setCharacterList([...characterList, {
      id,
      name,
      initiative
    }])
  }

  const deleteCharacter = (id) => {
    const filteredCharacters = characterList
      .filter(({ id: characterId }) => id !== characterId)

    setCharacterList([ ...filteredCharacters ])
  }

  const editInitiative = ({ id, name, initiative }) => {
    const characterIndex = characterList.findIndex(({ id: characterId }) => characterId === id)
    const hasChanged = characterList[characterIndex].initiative = initiative

    if (hasChanged) {
      setCharacterList((prevState) => {
        const updatedData = { id, name, initiative }

        const updatedCharacterList = prevState.map(({ id: characterId }, index) => {
          return characterId === id
            ? updatedData
            : prevState[index]
        })

        return updatedCharacterList
      })
    }
  }

  const sortCharacters = () => {
    setCharacterList((prevState) => {
      const sortedCharacters = prevState.sort((character1, character2) => (character2.initiative - character1.initiative))

      window.localStorage.setItem('characterList', JSON.stringify(sortedCharacters))

      return [...sortedCharacters]
    })
  }

  const deleteAllCharacters = () => {
    setCharacterList([])
  }

  return {
    characterList,
    isAddCharacterOpen,
    openAddCharacter,
    closeAddCharacter,
    saveNewCharacter,
    deleteCharacter,
    editInitiative,
    sortCharacters,
    deleteAllCharacters
  }
}