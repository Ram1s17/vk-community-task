import { FC } from "react"
import { Modal } from "antd"

import { User } from "../../types/types"

interface FriendsModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    friends: User[];
}

const FriendsModal: FC<FriendsModalProps> = ({ isModalOpen, setIsModalOpen, friends }) => {
    return (
        <Modal
            title="Список друзей"
            centered
            footer={null}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
        >
            {friends.map((friend: User, index) => (
                <div key={index}>
                    {friend.first_name} {friend.last_name}
                </div>
            ))}
        </Modal>
    )
}

export default FriendsModal