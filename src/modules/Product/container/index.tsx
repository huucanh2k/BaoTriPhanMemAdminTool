import * as React from "react"
import { Outlet } from "react-router-dom"

export interface IProductContainerProps {}

export default function ProductContainer(props: IProductContainerProps) {
  return <Outlet />
}
