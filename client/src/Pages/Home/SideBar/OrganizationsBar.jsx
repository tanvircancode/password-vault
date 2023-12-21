
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Accordion as MuiAccordion, AccordionSummary as MuiAccordionSummary,  Typography, Button } from '@mui/material';
import { useState } from 'react';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
   
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  
  

const OrganizationsBar = () => {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  
    return (
      <div style={{marginBottom: 10}}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary  aria-controls="panel1d-content" id="panel1d-header" style={{paddingLeft:8}}>
            <Typography style={{fontWeight:'bold', color:'#175DDC'}}>All Vaults</Typography>
          </AccordionSummary>
          <div style={{marginTop:-10,marginLeft: 32}}>
          <Button style={{padding:0}}>My Vault</Button>
          <br />
          <Button style={{padding:0}}>New Organization</Button>
          </div>
        </Accordion>
        
      </div>
    )
}

export default OrganizationsBar