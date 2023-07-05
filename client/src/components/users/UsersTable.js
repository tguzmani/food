import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useStoreState } from 'easy-peasy'
import UsersTableRow from './UsersTableRow'
import useResponsive from 'hooks/useResponsive'
import { useTranslation } from 'react-i18next'

const UsersTable = () => {
  const { users } = useStoreState(state => state.users)
  const isMobile = useResponsive('sm')

  const { t } = useTranslation()

  const sortedUsersByFirstName = users.sort((a, b) => (a.firstName < b.firstName ? -1 : 1))

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ '> .MuiTableCell-root': { fontWeight: 'bold' } }}>
              <TableCell>{t('users.name')}</TableCell>
              <TableCell>{t('users.membership')}</TableCell>
              {!isMobile && <TableCell align="right">{t('users.until')}</TableCell>}
              {!isMobile && <TableCell align="right">{t('users.daysRemaining')}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsersByFirstName.map(user => (
              <UsersTableRow user={user} key={user._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersTable
