import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Container,
} from '@mui/material';

import Service from './models/Service';
import NavBar from './components/NavBar';
import Services from './components/Services';

interface Step {
  label: string;
}

const steps: string[] = [
  'Select your services',
  'Create an ad group',
  'Create an ad',
];

const App: FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [services, setServices] = useState<Service[]>([]);

  const updateServices = (updatedServices: Service[]) => {
    setServices(updatedServices);
  };

  const handleNext = () => {
    if (services.length === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <NavBar />
      <Container>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                  <StepContent>
                    {index === 0 && (
                      <Services
                        services={services}
                        updateServices={updateServices}
                      />
                    )}
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color='inherit'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
        <pre>{JSON.stringify(services, null, 2)}</pre>
      </Container>
    </>
  );
};

export default App;
