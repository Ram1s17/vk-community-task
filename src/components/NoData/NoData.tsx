import { FC } from "react"
import { Empty } from "antd"

const NoData: FC = () => {
    return (
        <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
                <span>
                    Список пуст
                </span>
            }
        />
    )
}

export default NoData