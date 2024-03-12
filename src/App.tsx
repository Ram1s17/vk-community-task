import { FC, useEffect, useMemo, useState } from "react"

import { getGroups } from "./fake-backend"
import { Filters, Group } from "./types/types"
import GroupList from "./components/GroupList/GroupList"
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner"
import NoData from "./components/NoData/NoData"
import Filter from "./components/Filter/Filter"
import useFilteredGroups from "./hooks/useFilteredGroups"

import './styles/style.css'

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [filters, setFilters] = useState<Filters>({
    closed: '',
    avatarColor: '',
    hasFriends: ''
  })
  
  const PrivacyTypeOptions = useMemo(() => {
    return [
      {
        label: 'все',
        value: ''
      },
      {
        label: 'открытая',
        value: false
      },
      {
        label: 'закрытая',
        value: true
      }
    ]
  }, [])

  const AvatarColorOptions = useMemo(() => {
    const defaultOptionsArray = [
      {
        label: 'все',
        value: ''
      }
    ]
    if (groups.length) {
      const colorOptions = Array
        .from(new Set(groups
          .filter(group => group.avatar_color)
          .map(group => group.avatar_color))
        )
        .map(item => ({
          label: item,
          value: item
        }));
      return [
        ...defaultOptionsArray,
        ...colorOptions
      ]
    }
    return defaultOptionsArray
  }, [groups])

  const HasFriendsOptions = useMemo(() => {
    return [
      {
        label: 'все',
        value: ''
      },
      {
        label: 'есть друзья',
        value: true
      }
    ]
  }, [])

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
          setError(e.message)
        } else {
          setError("Произошла непредвиденная ошибка")
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchGroups()
  }, [])

  const filteredGroups = useFilteredGroups(groups, filters)

  return (
    <div className="app-container">
      {isLoading &&
        <LoadingSpinner />
      }
      {error && !isLoading &&
        <div className="text-align-center error-text">{error}</div>
      }
      {!error && !isLoading &&
        <div className="filter-block ">
          <Filter value={filters.closed}
            onChange={(value: boolean | string) => setFilters({ ...filters, closed: value })}
            options={PrivacyTypeOptions}
            placeholder="Тип группы"
            width="200px" />

          <Filter value={filters.avatarColor}
            onChange={(value: boolean | string) => setFilters({ ...filters, avatarColor: value as string })}
            options={AvatarColorOptions}
            placeholder="Цвет аватарки"
            width="200px" />

          <Filter value={filters.hasFriends}
            onChange={(value: boolean | string) => setFilters({ ...filters, hasFriends: value })}
            options={HasFriendsOptions}
            placeholder="Наличие друзей"
            width="200px" />
        </div>
      }
      {!error && !isLoading && filteredGroups.length > 0 &&
        <GroupList groups={filteredGroups} />
      }
      {!error && !isLoading && filteredGroups.length === 0 &&
        <NoData />
      }
    </div>
  )
}

export default App
