import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { FC, useState } from 'react';

import Service from '../models/Service';
import serviceList from '../util/service-list';

interface ServicesProps {
  services: Service[];
  updateServices: (services: Service[]) => void;
}

const Services: FC<ServicesProps> = ({ services, updateServices }) => {
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const serviceObj = serviceList.find((service) => service.name === value);
    const index = services.map((service) => service.name).indexOf(value);

    if (index === -1 && serviceObj !== undefined) {
      updateServices([...services, serviceObj!]);
    } else {
      updateServices(services.filter((_, i) => i !== index));
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
  );
};

export default Services;
