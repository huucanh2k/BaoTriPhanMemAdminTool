import * as React from "react"
import { Outlet } from "react-router-dom"

export interface IStatisticContainerProps {}

export default function StatisticContainer(props: IStatisticContainerProps) {
  return <Outlet />
}
