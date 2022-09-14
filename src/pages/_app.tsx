import '../common/styles/globals.css'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { theme } from '@/common/themes/Theme'
import { Layout } from '@/common/components/Layout'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'reflect-metadata'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Layout>
          <ReactQueryDevtools initialIsOpen={true} />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
