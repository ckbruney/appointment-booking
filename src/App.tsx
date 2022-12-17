import React, { FC } from 'react';
import NavBar from './components/NavBar';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Checkbox, Container, FormControlLabel } from '@mui/material';
import { Field, Form, Formik } from 'formik';

interface Step {
  label: string;
  Component?: FC;
}

interface Service {
  name: string;
  price: number;
}

const services: Service[] = [
  {
    name: 'Adult Cut',
    price: 18,
  },
  {
    name: 'Kids Cut',
    price: 10,
  },
  {
    name: 'Shape Up',
    price: 5,
  },
];

const initialValues: Service[] = [];

const Services: FC = (onSubmit) => (
  <Formik initialValues={initialValues} onSubmit={() => {}}>
    {({ values }) => (
      <Form>
        {services.map((service) => {
          return (
            <FormControlLabel
              key={service.name}
              control={
                <Field
                  key={service.name}
                  type='checkbox'
                  name='services'
                  value={service.name}
                  as={Checkbox}
                />
              }
              label={service.name}
            />
          );
        })}
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    )}
  </Formik>
);

const steps: Step[] = [
  { label: 'Select your services' },
  { label: 'Create an ad group' },
  { label: 'Create an ad' },
];

const App: FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
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
            {steps.map(({ label }, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>{index === 0 && <Services />}</StepContent>
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
      </Container>
    </>
  );
};

export default App;
