"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import dayjs from "dayjs";

import { colors } from "@/constants/date-color";
import { HomeDateProps } from "../type";

// 공식에 공개되지 않은 MuiMonthCalendar, MuiYearCalendar을 사용하기 위해 타입을 지정합니다.
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
const HomeDate = ({ currentDate, setCurrentDate }: HomeDateProps) => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: colors.secondary[200],
        contrastText: colors.secondary[200],
      },
    },
    components: {
      //월별 설정
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
      //연도 설정
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

  return (
    <div
      onKeyDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
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
                sx: {
                  width: "130px",
                  height: "50px",
                  fontSize: "0.875rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  backgroundColor: colors.background,
                  borderRadius: "12px",
                  caretColor: "transparent",
                },
              },
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default HomeDate;
