import { FC } from "react"
import { List } from "antd"

import { Group } from "../../types/types"
import GroupItem from "../GroupItem/GroupItem"

interface GroupListProps {
    groups: Group[];
}

const GroupList: FC<GroupListProps> = ({ groups }) => {
    return (
        <List
            itemLayout="vertical"
            dataSource={groups}
            renderItem={(group: Group) => (
                <GroupItem key={group.id} {...group} />
            )}
        />
    )
}

export default GroupList