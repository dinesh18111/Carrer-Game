import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

function Comparator({ compOutput }) {
  {compOutput.map((out)=>console.log(out))}

  const headers = compOutput.map((job) => job.jobName);
  const newHeaders = ["Comparator", ...headers];


  console.log(compOutput)
  {compOutput.map((output, index) =>console.log(output))}
 
  const handleCellClick = () => {}

  return (
    <div className="eventstable ratestablecls">
      <TableContainer sx={{ maxHeight: 420 }} component={Paper} className="Rate-list-table">
        <Table sx={{ width: '100%' }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {compOutput.map((job, index) => (
                <TableCell key={index} align="center" id="th-title">{job.jobName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody id="rtl-td">
          {compOutput ? 
          <>
          {compOutput.map((output, index) => (
            <TableRow >            
            {newHeaders.map((headerrow, index) => (
                <TableCell key={index} align="center" id="th-title">{headerrow}</TableCell>
              ))}
                  <TableCell>
                    <Typography >
                      {output.habits}
                    </Typography>
                  </TableCell>
            <TableCell>
              <Typography>{output.skills}
              </Typography>
              </TableCell>
                  <TableCell>
                    <Typography >
                      {output.interest}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography >
                      {output.preps}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography >
                      {output.habits}
                    </Typography>
                  </TableCell>
  
        </TableRow>
          )
            
          ) }

                
              </>
              : "N/A" }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Comparator;
