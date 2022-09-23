import { AppBar, Container, createTheme, MenuItem, Select, styled, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useCryptoContext } from '../context/CryptoContext'
import './Header.css'

export default function Header() {

  const navigate = useNavigate()
  const TitleTypography = styled(Typography)({
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  })

  const darkTheme = createTheme({
    palette: {
      mode: "dark"
    }
  })

  const { currency, setCurrency } = useCryptoContext()

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <TitleTypography variant='h6' onClick={() => {navigate("./")}}>Crypto Rush</TitleTypography>
            <Select value={currency} onChange={(e) => {setCurrency(e.target.value)}} variant='outlined' style={{ width: 100, height: 40, marginLeft: 15}} >
              <MenuItem value='INR'>INR</MenuItem>
              <MenuItem value='USD'>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
