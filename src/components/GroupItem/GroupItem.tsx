import { FC, useState } from "react"
import { Avatar, List } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

import { Group } from "../../types/types"
import FriendsBlock from "../FriendList/FriendsBlock"

const GroupItem: FC<Group> = ({ name, closed, avatar_color, members_count, friends }) => {
    const [isFriendListVisible, setIsFriendListVisible] = useState<boolean>(false)

    return (
        <List.Item
            extra={
                friends && isFriendListVisible &&
                <FriendsBlock friends={friends} />
            }
            actions={[
                <span>подписчики: {members_count}</span>,
                friends && <div
                    className="group-members-count"
                    onClick={() => setIsFriendListVisible((prevState) => !prevState)}
                >
                    <span>друзья: {friends.length}</span>
                    {isFriendListVisible ? <LeftOutlined /> : <RightOutlined />}
                </div>
            ]}>
            <List.Item.Meta
                avatar={avatar_color &&
                    <Avatar
                        className="group-avatar"
                        style={{ backgroundColor: avatar_color }}
                        shape="circle" />
                }
                title={name}
                description={closed ? 'закрытая группа' : 'открытая группа'}
            />
        </List.Item>
    )
}

export default GroupItem