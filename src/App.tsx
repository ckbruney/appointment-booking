import React, { FC, useState } from 'react';
import NavBar from './components/NavBar';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';

interface Step {
  label: string;
  Component?: FC;
}

interface Service {
  name: string;
  price: number;
  durationInMinutes: number;
}

const serviceList: Service[] = [
  {
    name: 'Adult Cut',
    price: 18,
    durationInMinutes: 30,
  },
  {
    name: 'Kids Cut',
    price: 10,
    durationInMinutes: 20,
  },
  {
    name: 'Shape Up',
    price: 5,
    durationInMinutes: 5,
  },
];

interface ServicesFormValues {
  services: Service[];
  error?: string;
}

const initialValues: ServicesFormValues = {
  services: [],
};

interface ServicesProps {
  services: Service[];
  updateServices: (services: Service[]) => void;
}

const Services: FC<ServicesProps> = ({ services, updateServices }) => {
  const [error, setError] = useState<string | null>(null);
  // const [services, setServices] = useState<Service[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const serviceObj = serviceList.find((service) => service.name === value);
    const index = services.map((service) => service.name).indexOf(value);

    if (index === -1 && serviceObj !== undefined) {
      // setServices([...services, serviceObj!]);
      updateServices([...services, serviceObj!]);
    } else {
      updateServices(services.filter((_, i) => i !== index));
      // setServices(services.filter((_, i) => i !== index));
    }
  };
  return (
    <FormControl>
      <FormLabel>Services</FormLabel>
      <FormGroup>
        {serviceList.map((service) => {
          return (
            <FormControlLabel
              key={service.name}
              label={`${service.name} - $${service.price}`}
              control={
                <Checkbox
                  value={service.name}
                  checked={services.includes(service)}
                  onChange={handleCheckboxChange}
                />
              }
            ></FormControlLabel>
          );
        })}
      </FormGroup>
    </FormControl>
    // <Formik
    //   initialValues={initialValues}
    //   onSubmit={({ services }) => {
    //     if (services.length === 0) {
    //       setError('Please select at least one service');
    //       setTimeout(() => {
    //         setError(null);
    //       }, 3000);
    //       return;
    //     }

    //     console.log({ services });
    //   }}
    // >
    //   {({ values }) => (
    //     <Form>
    //       <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
    //         {services.map((service) => {
    //           return (
    //             <FormControlLabel
    //               key={service.name}
    //               control={
    //                 <Field
    //                   key={service.name}
    //                   type='checkbox'
    //                   name='services'
    //                   value={service.name}
    //                   as={Checkbox}
    //                 />
    //               }
    //               label={`${service.name} - $${service.price}`}
    //             />
    //           );
    //         })}
    //       </FormControl>
    //       {error && <Typography color='red'>{error}</Typography>}
    //       <pre>{JSON.stringify(values, null, 2)}</pre>
    //     </Form>
    //   )}
    // </Formik>
  );
};

const steps: Step[] = [
  { label: 'Select your services' },
  { label: 'Create an ad group' },
  { label: 'Create an ad' },
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
            {steps.map(({ label }, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
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
