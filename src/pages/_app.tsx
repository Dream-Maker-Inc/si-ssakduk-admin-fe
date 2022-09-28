import '../common/styles/globals.css'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { theme } from '@/common/themes/Theme'
import { Layout } from '@/common/components/Layout'
import { ReactQueryDevtools } from 'react-query/devtools'
import React from 'react'
import { RecoilRoot } from 'recoil'
import 'reflect-metadata'
import 'antd/dist/antd.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <ReactQueryDevtools initialIsOpen={true} />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
