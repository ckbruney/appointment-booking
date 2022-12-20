import { FC, useEffect, useState } from 'react';
import { format, formatISO } from 'date-fns';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';

import generateAvailableTimeSlotsForDate from '../util/generate-available-time-slots';

interface SelectAppointmentProps {
  appointment: Date | null;
  updateAppointment: (appointmentDateTime: Date) => void;
}

const SelectAppointment: FC<SelectAppointmentProps> = ({
  appointment,
  updateAppointment,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState<Date | null>(null);
  const [availableAppointments, setAvailableAppointments] = useState<Date[]>(
    []
  );

  useEffect(() => {
    const today = new Date();
    console.log(appointment);
    setDate(format(today, 'yyyy-MM-dd'));
    setAvailableAppointments(generateAvailableTimeSlotsForDate(today));
  }, []);

  const handleTimeChange = (event: SelectChangeEvent) => {
    const updatedAppointment = new Date(event.target.value);
    updateAppointment(updatedAppointment);
  };

  return (
    <Stack spacing={4} style={{ marginTop: '12px' }}>
      <TextField
        type='date'
        value={date}
        label='Select Date'
        onChange={(event) => setDate(event.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl>
        <InputLabel id='time-label'>Select Time</InputLabel>
        <Select
          labelId='time-label'
          label='Select Time'
          onChange={handleTimeChange}
          value={appointment ? formatISO(appointment) : ''}
        >
          {availableAppointments.map((apt) => {
            const formattedTime = format(apt, 'HH:mm a');
            return (
              <MenuItem
                selected={
                  appointment
                    ? formatISO(apt) === formatISO(appointment)
                    : false
                }
                key={formattedTime}
                value={formatISO(apt)}
              >
                {formattedTime}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SelectAppointment;
