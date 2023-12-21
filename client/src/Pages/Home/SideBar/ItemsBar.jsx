import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Accordion as MuiAccordion, AccordionSummary as MuiAccordionSummary, AccordionDetails as MuiAccordionDetails, Typography, Button } from '@mui/material';
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
  
  
const ItemsBar = () => {

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  
    return (
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{paddingLeft:8}}>
            <Typography style={{fontWeight:'bold', color:'#175DDC'}}>All Items</Typography>
          </AccordionSummary>
          <div style={{marginTop:-10,marginLeft:32}}>
          <Button style={{padding:0}}>Favourites</Button>
          <br/>
          <Button style={{padding:0 ,marginLeft: -12}}>Login</Button>
          <br />
          <Button style={{padding:0,marginLeft: -12}}>Card</Button>
          <br/>
          <Button style={{padding:0}}>Identity</Button>
          <br/>
          <Button style={{padding:0}}>Secure Note</Button>
          </div>
          
      
        </Accordion>
        
      </div>
    )
  
}

export default ItemsBar