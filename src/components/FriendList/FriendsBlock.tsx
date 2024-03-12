import { FC, useMemo, useState } from "react"

import { User } from "../../types/types"
import FriendsModal from "../FriendsModal/FriendsModal"

interface FriendsBlockProps {
    friends: User[];
}

const FriendsBlock: FC<FriendsBlockProps> = ({ friends }) => {
    const friendsSlice = useMemo(() => {
        return friends.length > 3 ? friends.slice(0, 3) : friends
    }, [friends])

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <>
            {friendsSlice.map((friend: User, index) => (
                <div key={index}>
                    {friend.first_name} {friend.last_name}
                </div>
            ))}
            {friends.length > 3 &&
                <>
                    <div
                        onClick={() => setIsModalOpen((prevState) => !prevState)}
                        className="show-more-link">Показать еще...</div>
                    <FriendsModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        friends={friends}
                    />
                </>
            }
        </>
    )
}

export default FriendsBlock