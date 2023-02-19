/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import {
  START_DATE,
  useDatepicker,
  useDay,
  useMonth,
  type FirstDayOfWeek,
  type FocusedInput,
  type OnDatesChangeProps,
} from "@datepicker-react/hooks";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, m } from "framer-motion";

import { cn } from "@lib/clsx";

import { formatDate } from "@utils/base";

import { OutsideClickHandler } from "@components/outside-click-handler";

import { fadeInBottom } from "@styles/animations";

type DatePickerContextType = {
  focusedDate: Date | null;
  isDateFocused: (date: Date) => boolean;
  isDateSelected: (date: Date) => boolean;
  isDateHovered: (date: Date) => boolean;
  isDateBlocked: (date: Date) => boolean;
  isFirstOrLastSelectedDate: (date: Date) => boolean;
  onDateFocus: (date: Date) => void;
  onDateHover: (date: Date) => void;
  onDateSelect: (date: Date) => void;
};

const datepickerContextDefaultValue: DatePickerContextType = {
  focusedDate: null,
  isDateFocused: () => false,
  isDateSelected: () => false,
  isDateHovered: () => false,
  isDateBlocked: () => false,
  isFirstOrLastSelectedDate: () => false,
  onDateFocus: () => {},
  onDateHover: () => {},
  onDateSelect: () => {},
};

const DatePickerContext = createContext<DatePickerContextType>(
  datepickerContextDefaultValue
);

// Day
interface DayProps {
  day: number;
  date: Date;
}

const Day: React.FC<DayProps> = ({ day, date }: DayProps): JSX.Element => {
  const dayRef = useRef<HTMLButtonElement>(null);

  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
  } = useContext(DatePickerContext);

  const {
    isSelected,
    disabledDate,
    isSelectedStartOrEnd,

    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  });

  if (!day) {
    return <div />;
  }

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      role="button"
      aria-label={`${formatDate(date.toISOString())} - ${
        disabledDate ? "Disabled" : "Not Disabled"
      } - ${isSelected ? "Selected" : "Not Selected"}`}
      aria-disabled={Boolean(disabledDate)}
      className={cn(
        "h-8 w-8 rounded-full bg-white text-black lg:h-12 lg:w-12",
        { " bg-primary text-white": isSelectedStartOrEnd },
        { "bg-white-300": isSelected && !isSelectedStartOrEnd },
        { "cursor-not-allowed text-black-400": disabledDate }
      )}
    >
      {day}
    </button>
  );
};

// Month
interface MonthProps extends ComponentPropsWithoutRef<"div"> {
  firstDayOfWeek: FirstDayOfWeek;
  year: number;
  month: number;
}

const Month = forwardRef<HTMLDivElement, MonthProps>(
  ({ firstDayOfWeek, year, month, ...props }, ref) => {
    const { days, monthLabel, weekdayLabels } = useMonth({
      year,
      month,
      firstDayOfWeek,
    });

    return (
      <div
        ref={ref}
        {...props}
        className="flex flex-col items-center justify-start gap-y-3 lg:gap-y-6"
      >
        <strong className="text-center font-sans text-lg font-bold tracking-wide text-black-800">
          {monthLabel}
        </strong>

        <ul className="grid grid-cols-7 items-center justify-items-center gap-x-1">
          {weekdayLabels.map((dayLabel) => (
            <li
              className="flex h-auto w-8 items-center justify-center text-center font-sans text-xs font-semibold text-black-500 lg:h-12 lg:w-12"
              key={dayLabel}
            >
              {dayLabel}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-[repeat(7,_min-content)] items-center justify-center justify-items-center gap-1">
          {days.map((day) => {
            if (typeof day === "object") {
              return (
                <Day
                  date={day.date}
                  key={day.dayLabel}
                  day={parseInt(day.dayLabel)}
                />
              );
            } else {
              return <div key={day} />;
            }
          })}
        </div>
      </div>
    );
  }
);

Month.displayName = "Month";

const dateInputFieldVariants = cva(
  [
    "flex items-center gap-x-4 justify-start w-full rounded-sm border bg-transparent px-2 py-3 font-sans text-sm  lg:text-base font-normal outline-none placeholder:font-sans placeholder:text-sm lg:placeholder:text-base placeholder:font-normal  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 group  disabled:cursor-not-allowed disabled:!outline-none ",
  ],
  {
    variants: {
      intent: {
        white:
          "text-white border-white placeholder:text-white-700 focus-visible:outline-white data-[placeholder=true]:text-white-700 disabled:text-white-400 disabled:border-white-400",
        black:
          "text-black border-black-900 placeholder:text-black-800 focus-visible:outline-black data-[placeholder=true]:text-black-400 disabled:text-black-500 disabled:border-black-500",
      },
    },
    defaultVariants: {
      intent: "black",
    },
  }
);

const inputLabelVariants = cva("block text-sm font-semibold tracking-wider", {
  variants: {
    intent: {
      black: "text-black",
      white: "text-white",
    },
    disabled: {
      true: "cursor-not-allowed",
    },
  },
  compoundVariants: [
    {
      intent: "black",
      disabled: true,
      className: "text-black-500",
    },
    {
      intent: "white",
      disabled: true,
      className: "text-white-400",
    },
  ],
  defaultVariants: {
    intent: "black",
    disabled: false,
  },
});

// Date Range Picker
interface DateRangePickerProps
  extends VariantProps<typeof dateInputFieldVariants>,
    VariantProps<typeof inputLabelVariants> {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  label: string;
  name: string;
  error?: string;
  placeholders?: [string, string];
  noOfMonths?: 1 | 2;
  onRangeChange: (startDate: Date | null, endDate: Date | null) => void;
  unavailableDates?: Date[];
  minDateRange?: number;
  exactMinRange?: true;
  required?: boolean;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate = null,
  endDate = null,
  minDate,
  maxDate,
  label,
  name,
  intent,
  error,
  placeholders = ["Start Date", "End Date"],
  noOfMonths = 1,
  unavailableDates,
  minDateRange,
  disabled,
  exactMinRange,
  required,
  onRangeChange,
}): JSX.Element => {
  const [portalOpen, setPortalOpen] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const filedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        setPortalOpen(false);
      }
    };

    if (portalOpen) {
      // portalRef.current?.setAttribute("tabIndex", 0);
      portalRef.current?.addEventListener("keydown", handleKeyPress);
    } else {
      portalRef.current?.removeEventListener("keydown", handleKeyPress);
    }

    return () =>
      // eslint-disable-next-line react-hooks/exhaustive-deps
      portalRef.current?.removeEventListener("keydown", handleKeyPress);
  }, [portalOpen]);

  const [state, setState] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    focusedInput: FocusedInput;
  }>({
    startDate: startDate,
    endDate: endDate,
    focusedInput: START_DATE,
  });

  const handleDateChange = (data: OnDatesChangeProps) => {
    onRangeChange(data.startDate, data.endDate);
    if (!data.focusedInput) {
      setState({ ...data, focusedInput: START_DATE });
    } else {
      setState(data);
    }
  };

  const togglePortal = () =>
    setPortalOpen((prev) => (disabled ? false : !prev));

  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
  } = useDatepicker({
    startDate: state.startDate,
    endDate: state.endDate,
    focusedInput: state.focusedInput,
    onDatesChange: handleDateChange,
    numberOfMonths: noOfMonths,
    minBookingDate: minDate,
    maxBookingDate: maxDate,
    initialVisibleMonth: new Date(),
    unavailableDates: unavailableDates,
    minBookingDays: minDateRange,
    exactMinBookingDays: exactMinRange,
  });

  return (
    <div className="flex flex-col items-start justify-start gap-y-1">
      {label && (
        <label
          htmlFor={name}
          className={cn(inputLabelVariants({ intent, disabled }))}
        >
          {label}
          {required && (
            <svg className="ml-1 inline h-2 w-2 fill-primary">
              <use xlinkHref="/assets/svg/sprites.svg#icon-asterisk" />
            </svg>
          )}
        </label>
      )}
      <div className="relative w-full" id="date-range-picker-portal">
        <button
          disabled={Boolean(disabled)}
          aria-disabled={Boolean(disabled)}
          id={name}
          className={dateInputFieldVariants({
            intent,
          })}
          onClick={togglePortal}
          ref={filedRef}
        >
          <span className="font-sans text-base tracking-wide text-black-900 group-disabled:text-white-600">
            {state.startDate
              ? state.startDate.toLocaleDateString("en-us")
              : placeholders[0]}
          </span>
          <svg className="h-4 w-4 fill-black-800">
            <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-right-short" />
          </svg>
          <span className="font-sans text-base tracking-wide text-black-900">
            {state.endDate
              ? state.endDate.toLocaleDateString("en-us")
              : placeholders[1]}
          </span>
        </button>
        <DatePickerContext.Provider
          value={{
            focusedDate,
            isDateFocused,
            isDateSelected,
            isDateHovered,
            isDateBlocked,
            isFirstOrLastSelectedDate,
            onDateSelect,
            onDateFocus,
            onDateHover,
          }}
        >
          <AnimatePresence>
            {portalOpen && (
              <OutsideClickHandler
                onOutsideClick={() => setPortalOpen(false)}
                id="date-range-picker-portal"
              >
                <m.div
                  className="absolute top-full left-0 z-[500] w-min rounded-md bg-white p-4 shadow-lg"
                  variants={fadeInBottom}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  role="application"
                  aria-roledescription="datepicker"
                  aria-label="Calendar"
                  // tabIndex={-1}
                  ref={portalRef}
                >
                  <div className="flex w-full items-center justify-between gap-x-6">
                    <button
                      type="button"
                      onClick={goToPreviousMonths}
                      tabIndex={0}
                      className="group flex h-9 w-9 items-center justify-center rounded-full border border-white-500 transition-[background-color] duration-200 ease-in-out hover:bg-black-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-700 lg:h-12 lg:w-12"
                    >
                      <svg className="h-5 w-5 fill-black-700 transition-colors duration-200 ease-in-out group-hover:fill-black">
                        <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-left-short" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      tabIndex={0}
                      onClick={goToNextMonths}
                      className="group flex h-9 w-9 items-center justify-center rounded-full border border-white-500 transition-[background-color] duration-200 ease-in-out hover:bg-black-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-700 lg:h-12 lg:w-12"
                    >
                      <svg className="h-5 w-5 fill-black-700 transition-colors duration-200 ease-in-out group-hover:fill-black ">
                        <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-right-short" />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={cn(
                      "mt-5 grid auto-rows-min grid-cols-[min-content] gap-6 md:mt-7  lg:gap-12",
                      {
                        "md:grid-cols-[repeat(2,_min-content)]":
                          noOfMonths === 2,
                      }
                    )}
                  >
                    {activeMonths.map((month) => (
                      <Month
                        key={`${month.year}-${month.month}`}
                        year={month.year}
                        month={month.month}
                        firstDayOfWeek={firstDayOfWeek}
                      />
                    ))}
                  </div>
                </m.div>
              </OutsideClickHandler>
            )}
          </AnimatePresence>
        </DatePickerContext.Provider>
      </div>
      {error && (
        <p className="block text-left font-sans text-xs font-medium text-primary">
          {error}
        </p>
      )}
    </div>
  );
};

// Date Picker
interface DatePickerProps
  extends VariantProps<typeof dateInputFieldVariants>,
    VariantProps<typeof inputLabelVariants> {
  value: Date | null;
  onDateChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  label: string;
  name: string;
  error?: string;
  placeholder?: string;
  noOfMonths?: 1 | 2;
  unavailableDates?: Date[];
  required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  minDate,
  maxDate,
  label,
  name,
  intent,
  error,
  placeholder = "Start Date",
  noOfMonths = 1,
  value,
  onDateChange,
  disabled,
  unavailableDates,
  required,
}): JSX.Element => {
  const [portalOpen, setPortalOpen] = useState(false);

  const handleDateChange = (data: OnDatesChangeProps) => {
    onDateChange(data.startDate);
  };

  const togglePortal = () =>
    setPortalOpen((prev) => (disabled ? false : !prev));

  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
  } = useDatepicker({
    startDate: value,
    endDate: null,
    focusedInput: START_DATE,
    onDatesChange: handleDateChange,
    numberOfMonths: noOfMonths,
    minBookingDate: minDate,
    maxBookingDate: maxDate,
    initialVisibleMonth: new Date(),
    unavailableDates: unavailableDates,
  });

  return (
    <div className="flex flex-col items-start justify-start gap-y-1">
      {label && (
        <label
          htmlFor={name}
          className={cn(inputLabelVariants({ disabled, intent }))}
        >
          {label}
          {required && (
            <svg className="ml-1 inline h-2 w-2 fill-primary">
              <use xlinkHref="/assets/svg/sprites.svg#icon-asterisk" />
            </svg>
          )}
        </label>
      )}
      <div className="relative w-full" id="date-picker-portal">
        <button
          disabled={Boolean(disabled)}
          aria-disabled={Boolean(disabled)}
          id={name}
          className={dateInputFieldVariants({
            intent,
          })}
          type="button"
          onClick={togglePortal}
          data-placeholder={Boolean(!value && placeholder)}
        >
          <span className="font-sans text-base tracking-wide">
            {value ? value.toLocaleDateString("en-lk") : placeholder}
          </span>
        </button>
        <DatePickerContext.Provider
          value={{
            focusedDate,
            isDateFocused,
            isDateSelected,
            isDateHovered,
            isDateBlocked,
            isFirstOrLastSelectedDate,
            onDateSelect,
            onDateFocus,
            onDateHover,
          }}
        >
          {portalOpen && (
            <OutsideClickHandler
              onOutsideClick={() => setPortalOpen(false)}
              id="date-picker-portal"
            >
              <m.div
                className="absolute top-full left-0 z-[200] w-min rounded-md bg-white p-4 shadow-lg"
                variants={fadeInBottom}
                initial="initial"
                animate="animate"
                exit="exit"
                role="application"
                aria-roledescription="datepicker"
                aria-label="Calendar"
                tabIndex={-1}
              >
                <div className="flex w-full items-center justify-between gap-x-6">
                  <button
                    type="button"
                    onClick={goToPreviousMonths}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-white-500 transition-[background-color] duration-200 ease-in-out hover:bg-black-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-700 lg:h-12 lg:w-12"
                  >
                    <svg className="h-5 w-5 fill-black-700 transition-colors duration-200 ease-in-out group-hover:fill-black">
                      <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-left-short" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={goToNextMonths}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-white-500 transition-[background-color] duration-200 ease-in-out hover:bg-black-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-700 lg:h-12 lg:w-12"
                  >
                    <svg className="h-5 w-5 fill-black-700 transition-colors duration-200 ease-in-out group-hover:fill-black ">
                      <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-right-short" />
                    </svg>
                  </button>
                </div>
                <div
                  className={cn(
                    "mt-5 grid auto-rows-min grid-cols-[min-content] gap-6 md:mt-7  lg:gap-12",
                    {
                      "md:grid-cols-[repeat(2,_min-content)]": noOfMonths === 2,
                    }
                  )}
                >
                  {activeMonths.map((month) => (
                    <Month
                      key={`${month.year}-${month.month}`}
                      year={month.year}
                      month={month.month}
                      firstDayOfWeek={firstDayOfWeek}
                    />
                  ))}
                </div>
              </m.div>
            </OutsideClickHandler>
          )}
        </DatePickerContext.Provider>
      </div>
      {error && (
        <p
          className={cn(
            "block text-left font-sans text-xs font-medium text-primary",
            { "text-primary-400": disabled }
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};
