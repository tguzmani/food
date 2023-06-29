import React, { MouseEvent, useEffect, useState } from 'react'

import { Card, CardContent, TextField, Button, Typography, Avatar, Stack } from '@mui/material'

import dayjs, { Dayjs } from 'dayjs'

import HowToRegIcon from '@mui/icons-material/HowToReg'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme, Box } from '@mui/material'
import useResponsive from 'hooks/useResponsive'
import useForm from 'hooks/useForm'
import useAuth from 'hooks/useAuth'
import Alert from 'components/layout/Alert'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import { Unstable_MobileNextDatePicker as MobileNextDatePicker } from '@mui/x-date-pickers/MobileNextDatePicker'
import { Unstable_DesktopNextDatePicker as DesktopNextDatePicker } from '@mui/x-date-pickers/DesktopNextDatePicker'
import { useStoreActions, useStoreState } from 'config/easy-peasy.store'
import { SignUpDto } from 'modules/users/models/users.dto.model'
import { Gender, Units } from 'modules/users/models/users.model'
import { DateValidationError } from '@mui/x-date-pickers'
import { PickerChangeHandler } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue'

const RegisterForm = () => {
  const isMobile = useResponsive('sm')
  const theme = useTheme()
  const isAuth = useAuth()
  const navigate = useNavigate()

  const { signUp, setLoading } = useStoreActions(actions => actions.users)
  const { error, loading } = useStoreState(state => state.users)

  const [birthdate, setBirthdate] = useState(dayjs())
  const [gender, setGender] = useState<Gender>('m')
  const [units, setUnits] = useState<Units>('kg')

  const [credentials, bindCredentials, areCredentialsEmpty] = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  useEffect(() => {
    setLoading(false)
  }, [isAuth, setLoading])

  useEffect(() => {
    if (isAuth) navigate('/')
  }, [isAuth, navigate])

  const handleSignUp = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()

    const signUpDto: SignUpDto = {
      ...credentials,
      birthdate: dayjs(birthdate).format('YYYY-MM-DD'),
      gender,
      units,
    }

    signUp(signUpDto)
  }

  const DatePicker = isMobile ? MobileNextDatePicker : DesktopNextDatePicker

  const handleChangeBirthdate = (date: any) => {
    setBirthdate(date)
  }

  const handleChangeGender = (event: any) => {
    setGender(event.target.value)
  }

  const handleChangeUnits = (event: any) => {
    setUnits(event.target.value)
  }

  return (
    <Card sx={{ paddingTop: '4px', width: isMobile ? '100%' : '85%' }}>
      <CardContent sx={{ height: isMobile ? '95vh' : '85vh', overflowY: 'scroll' }}>
        <Stack sx={{ height: '100%' }} direction="column" justifyContent="space-between">
          {error && <Alert>{error}</Alert>}

          <Box mt={2}>
            <Stack alignItems="center" spacing={1}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <HowToRegIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Register
              </Typography>
            </Stack>
          </Box>

          <Stack>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label="First name"
              {...bindCredentials('firstName')}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label="Last name"
              {...bindCredentials('lastName')}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label="Email Address"
              type="email"
              {...bindCredentials('email')}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label="Password"
              type="password"
              {...bindCredentials('password')}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label="Confirm password"
              type="password"
              {...bindCredentials('passwordConfirm')}
            />
            <DatePicker
              sx={{ width: 1, mt: 1 }}
              label="Birthdate"
              maxDate={dayjs()}
              value={birthdate}
              onChange={handleChangeBirthdate}
            />
            <FormControl sx={{ mt: 1 }}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup value={gender} onChange={handleChangeGender} row>
                <FormControlLabel value="m" control={<Radio />} label="Male" />
                <FormControlLabel value="f" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mt: 1 }}>
              <FormLabel>Metric system</FormLabel>
              <RadioGroup value={units} onChange={handleChangeUnits} row>
                <FormControlLabel
                  sx={{ label: { fontSize: '14px' } }}
                  value="kg"
                  control={<Radio />}
                  label="Metric (kg)"
                />
                <FormControlLabel
                  sx={{ label: { fontSize: '14px' } }}
                  value="lb"
                  control={<Radio />}
                  label="Imperial (lb)"
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          <Button
            onClick={handleSignUp}
            color="primary"
            variant="contained"
            fullWidth
            disabled={areCredentialsEmpty || !birthdate || loading}
          >
            {loading ? 'Loading...' : 'Sign up'}
          </Button>

          <Typography variant="caption" align="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default RegisterForm
