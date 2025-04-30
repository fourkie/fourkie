"use client";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

import { colors } from "@/constants/date-color";
import { HomeDateProps } from "../type";

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey {
    MuiMonthCalendar: string;
    MuiYearCalendar: string;
  }
  interface Components {
    MuiMonthCalendar?: Components["MuiButton"];
    MuiYearCalendar?: Components["MuiButton"];
  }
}

let customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: colors.secondary[200],
      contrastText: colors.secondary[200],
    },
  },
  components: {
    MuiMonthCalendar: {
      styleOverrides: {
        root: {
          "& .MuiPickersMonth-monthButton.Mui-selected": {
            backgroundColor: `${colors.secondary[50]} !important`,
            color: colors.foreground,
            "&:hover": {
              backgroundColor: `${colors.secondary[300]} !important`,
              color: colors.background,
            },
          },
        },
      },
    },
    MuiYearCalendar: {
      styleOverrides: {
        root: {
          "& .MuiPickersYear-yearButton.Mui-selected": {
            backgroundColor: `${colors.secondary[50]} !important`,
            color: colors.foreground,
            "&:hover": {
              backgroundColor: `${colors.secondary[300]} !important`,
              color: colors.background,
            },
          },
        },
      },
    },
  },
});

customTheme = responsiveFontSizes(customTheme);

const HomeDate = ({ currentDate, setCurrentDate }: HomeDateProps) => {
  return (
    <div
      onKeyDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="flex h-full w-full items-center justify-center"
    >
      <ThemeProvider theme={customTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            maxDate={dayjs()}
            views={["year", "month"]}
            openTo="month"
            format="YYYY.MM"
            value={currentDate}
            onChange={(newValue) => {
              if (newValue) {
                setCurrentDate(newValue);
              }
            }}
            disableOpenPicker={false}
            slotProps={{
              textField: {
                InputProps: {
                  readOnly: true,
                  onKeyDown: (e) => e.preventDefault(),
                },
                sx: () => ({
                  width: "130px",
                  height: "50px",
                  caretColor: "transparent",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiInputBase-root": {
                    backgroundColor: {
                      xs: "white",
                      md: "#F7FAF2",
                    },
                    borderRadius: "12px",
                    width: {
                      xs: "130px",
                      md: "150px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: {
                      xs: "1rem",
                      md: "1.5rem",
                    },
                  },
                }),
              },
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default HomeDate;
