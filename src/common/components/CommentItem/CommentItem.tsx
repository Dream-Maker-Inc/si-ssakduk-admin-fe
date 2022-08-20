import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
} from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { DeleteRounded } from '@mui/icons-material'

type CommentItemProps = {
  avatarImageUrl: string
  primaryText: string
  captionText: string
}

export const CommentItem = ({
  avatarImageUrl,
  primaryText,
  captionText,
}: CommentItemProps) => (
  <div>
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={avatarImageUrl} src={avatarImageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={primaryText}
          secondary={
            <Typography variant='caption' style={{ marginTop: 4 }}>
              {captionText}
            </Typography>
          }
        />
        <IconButton>
          <DeleteRounded
            onClick={() =>
              confirm(
                `[${primaryText.substring(
                  0,
                  10,
                )}...] 댓글을 삭제하시겠습니까?\n삭제 후에는 되돌릴 수 없습니다.`,
              )
            }
          />
        </IconButton>
      </ListItem>
    </List>
    <Divider variant='inset' />
  </div>
)
