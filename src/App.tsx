import { Layout } from "antd"
import React from "react"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import 'antd/dist/reset.css';

const App: React.FC = () => {
  return (
    <RouterProvider router={router} fallbackElement={<div>Error Page</div>} />
  )
}

export default App
