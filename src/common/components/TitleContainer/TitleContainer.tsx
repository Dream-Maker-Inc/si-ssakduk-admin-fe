import { Colors } from '@/common/themes/Color'
import NavigateNextRounded from '@mui/icons-material/NavigateNextRounded'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export type BreadcrumbModel = {
  displayName: string
  path: string
  accent?: boolean
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
        {breadcrumbModels.map((model, index) => (
          <Link key={index} href={model.path}>
            <div>
              <LinkTypo model={model} />
            </div>
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
  )
}

const LinkTypo = ({ model }: { model: BreadcrumbModel }) => {
  return (
    <Typography
      variant='caption'
      fontWeight={model.accent ? '600' : 'unset'}
      color={model.accent ? Colors.TextPrimary : 'unset'}
      sx={{ cursor: 'pointer' }}
    >
      {model.displayName}
    </Typography>
  )
}
