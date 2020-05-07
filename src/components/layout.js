import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { NavBar, Icon, WingBlank, WhiteSpace, SearchBar } from 'antd-mobile'

import './index.css'

function Layout ({ children, title, description }) {
  const router = useRouter()

  return (
    <div>
      <NextSeo 
        title={title}
        description={description}
      />
      <NavBar
        mode="light"
        icon={(router.pathname == "/")? null:<Icon type="left" />}
        onLeftClick={(router.pathname == "/")? null:() => router.back()}
        rightContent={[
          <Icon key="0" type="search" />
        ]}
      >
        {title}
      </NavBar>
      <WhiteSpace size="lg" />
      <WingBlank>{children}</WingBlank>
    </div>
  )
}

export default Layout
