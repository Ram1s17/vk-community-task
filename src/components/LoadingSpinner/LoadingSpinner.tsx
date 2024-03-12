import { FC } from "react"
import { Spin } from "antd"

const LoadingSpinner: FC = () => {
  return (
    <Spin
      tip="Загрузка..."
      size="large"
      fullscreen>
      <div className="content" />
    </Spin>
  )
}

export default LoadingSpinner