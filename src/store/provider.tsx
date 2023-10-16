import { Provider } from "mobx-react"
import { store } from "."
import React, { ReactNode } from "react"

const MobxProvider: React.FC<{ store?: any; children: ReactNode }> = ({ children, store }) => {
  return <Provider {...store}>{children}</Provider>
}

export default MobxProvider
