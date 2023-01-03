import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useStoreState } from 'easy-peasy'
import dayjs from 'dayjs'
import UsersTableRow from './UsersTableRow'
import { Box } from '@mui/material'
import useResponsive from 'hooks/useResponsive';

const UsersTable = () => {
  const { users } = useStoreState(state => state.users)
  const isMobile = useResponsive('sm')

  return (
    <div>
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow sx={{ '> .MuiTableCell-root': { fontWeight: 'bold' } }}>
              <TableCell>Name</TableCell>
              <TableCell>Membership</TableCell>
              {!isMobile && <TableCell align='right'>Until</TableCell>}
              {!isMobile && <TableCell align='right'>Days remaining</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <UsersTableRow user={user} key={user._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersTable
