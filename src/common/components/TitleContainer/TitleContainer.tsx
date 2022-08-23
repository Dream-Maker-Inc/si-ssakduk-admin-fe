import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import NavigateNextRounded from '@mui/icons-material/NavigateNextRounded'

type TitleContainerProps = {
  title: string
  breadcrumbStrings: string[]
}

export const TitleContainer = ({
  title,
  breadcrumbStrings,
}: TitleContainerProps) => (
  <Stack direction='row' justifyContent='space-between' alignItems='center'>
    <Typography variant='h1'>{title}</Typography>
    <Breadcrumbs
      separator={<NavigateNextRounded color='action' fontSize='small' />}
    >
      {breadcrumbStrings.map((item, key) => (
        <Typography variant='caption' key={key}>
          {item}
        </Typography>
      ))}
    </Breadcrumbs>
  </Stack>
)
