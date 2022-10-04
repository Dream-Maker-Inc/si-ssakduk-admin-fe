import { Layout } from '@/common/components/Layout'
import { theme } from '@/common/themes/Theme'
import { ThemeProvider } from '@mui/material'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil'
import 'reflect-metadata'
import '../common/styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {router.pathname !== '/login' ? (
            <Layout>
              <ReactQueryDevtools initialIsOpen={true} />
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
