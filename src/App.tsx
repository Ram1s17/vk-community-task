import { FC, useEffect, useState } from "react"

import { getGroups } from "./fake-backend"
import { Group } from "./types/types"
import GroupList from "./components/GroupList/GroupList"

import './styles/style.css'

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true)
      try {
        const response = await getGroups()
        if (response.result === 0 || !response.data) {
          throw new Error('Произошла ошибка')
        }
        setGroups(response.data)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Произошла непредвиденная ошибка");
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchGroups()
  }, [])

  return (
    <div className="app-container">
      {isLoading && <div>Загрузка...</div>}
      {error && !isLoading && <div>{error}</div>}
      {!error && !isLoading && <GroupList groups={groups} />}
    </div>
  )
}

export default App
