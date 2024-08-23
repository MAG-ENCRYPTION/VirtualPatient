import {
  AccountCircle,
  Group,
  Home,
  LocalHospital,
  Logout,
  Person,
  School,
} from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import { Tooltip } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserStateType } from '../../../redux/userStore/reducer'
import { ROUTES } from '../../../routes'
import { ProtectedRoutes } from '../../security/protectedRoutes'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export const Dashboard = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const router = useNavigate()
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer,
  ).user

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <ProtectedRoutes authorization='EXPERT'>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='fixed' open={open}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography variant='h6' noWrap>
                Dashboard
              </Typography>
              <div style={{ display: 'flex' }}>
                <AccountCircle sx={{ fontSize: 45, mr: 1 }} />
                <div>
                  <Typography variant='subtitle1' sx={{ mb: -1 }}>
                    {connectedUser.username}
                  </Typography>
                  <Typography variant='caption'>
                    {connectedUser.userType.toLowerCase()}
                  </Typography>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {DrawerItems.map(({ text, icon, link }) => (
              <Tooltip
                key={text}
                title={open ? '' : text}
                arrow
                placement='right'
              >
                <ListItemButton
                  key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => router(link)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        </Drawer>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </div>
    </ProtectedRoutes>
  )
}

const DrawerItems = [
  { text: 'Dashboard', icon: <Home />, link: ROUTES.EXPERT.DASHBOARD },
  { text: 'Learners', icon: <Group />, link: ROUTES.EXPERT.LEARNERS },
  { text: 'Clinical case', icon: <LocalHospital />, link: ROUTES.EXPERT.CASES },
  { text: 'Evaluations', icon: <School />, link: ROUTES.EXPERT.EVALUATION },
  { text: 'My Profile', icon: <Person />, link: ROUTES.EXPERT.PROFILE },
  { text: 'Logout', icon: <Logout />, link: ROUTES.LOGIN },
]
