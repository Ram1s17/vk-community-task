import { FC, useEffect, useState } from "react"

import { getGroups } from "./fake-backend"
import { Group } from "./types/types"
import GroupList from "./components/GroupList/GroupList"
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner"
import NoData from "./components/NoData/NoData"

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
      {isLoading &&
        <LoadingSpinner />
      }
      {error && !isLoading &&
        <div className="text-align-center error-text">{error}</div>
      }
      {!error && !isLoading && groups.length > 0 &&
        <GroupList groups={groups} />
      }
      {!error && !isLoading && groups.length === 0 &&
        <NoData />
      }
    </div>
  )
}

export default App
