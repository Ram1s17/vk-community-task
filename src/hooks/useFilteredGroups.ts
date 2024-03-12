import { useMemo } from "react"

import { Filters, Group } from "../types/types"

const useFilteredGroups = (groups: Group[], filters: Filters) => {
    const filteredGroups = useMemo(() => {
        let filtered = groups

        if (filters.closed !== "") {
            filtered = filtered.filter(
                (group) => group.closed === filters.closed
            )
        }

        if (filters.avatarColor !== "") {
            filtered = filtered.filter(
                (group) => group.avatar_color === filters.avatarColor
            )
        }

        if (filters.hasFriends !== "") {
            filtered = filtered.filter(
                (group) => group.friends && group.friends.length > 0
            )
        }

        return filtered
    }, [groups, filters])

    return filteredGroups
}

export default useFilteredGroups