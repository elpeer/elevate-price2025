import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { he } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

// Register Hebrew locale
registerLocale('he', he);

interface HebrewDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

const HebrewDatePicker: React.FC<HebrewDatePickerProps> = ({
  selectedDate,
  onChange,
  placeholder = 'בחר תאריך'
}) => {
  return (
    <div className="relative w-full">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        locale="he"
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        showPopperArrow={false}
        calendarClassName="hebrew-calendar"
        wrapperClassName="w-full"
        className="w-full bg-secondary rounded-full px-6 py-4 text-right text-foreground outline-none pr-12"
        popperPlacement="bottom-end"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
    </div>
  );
};

export default HebrewDatePicker;
