import { Colors } from '@/common/themes/Color'
import NavigateNextRounded from '@mui/icons-material/NavigateNextRounded'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useRouter } from 'next/router'

type BreadcrumbModel = {
  displayName: string
  path: string
}

type TitleContainerProps = {
  title: string
  breadcrumbModels: BreadcrumbModel[]
}

export const TitleContainer = ({
  title,
  breadcrumbModels,
}: TitleContainerProps) => {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography variant='h4' fontWeight={500} color={Colors.TitlePrimary}>
        {title}
      </Typography>
      <Breadcrumbs
        separator={<NavigateNextRounded color='action' fontSize='small' />}
      >
        {breadcrumbModels.map((model, key) => (
          <Link key={key} href={model.path}>
            <LinkTypo model={model} />
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
  )
}

const LinkTypo = ({ model }: { model: BreadcrumbModel }) => {
  const router = useRouter()
  const isEqualCurrentPath = (path: string) => router.asPath === path

  console.log(router)
  console.log(model.path)

  return (
    <Typography
      variant='caption'
      fontWeight={isEqualCurrentPath(model.path) ? '600' : 'unset'}
      color={isEqualCurrentPath(model.path) ? Colors.TextPrimary : 'unset'}
      sx={{ cursor: 'pointer' }}
    >
      {model.displayName}
    </Typography>
  )
}
