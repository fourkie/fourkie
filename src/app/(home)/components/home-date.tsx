"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import dayjs from "dayjs";
import { HomeDateProps } from "../types/HomeDate";

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
const HomeDate: React.FC<HomeDateProps> = ({ currentDate, setCurrentDate }) => {
  console.log(currentDate);
  const customTheme = createTheme({
    palette: {
      //기본 설정
      primary: {
        main: "#f48fb1",
        contrastText: "#ffffff",
      },
    },
    components: {
      //월별 설정
      MuiMonthCalendar: {
        styleOverrides: {
          root: {
            "& .MuiPickersMonth-monthButton.Mui-selected": {
              backgroundColor: "#f48fb1",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#8e1a40",
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
              backgroundColor: "#f48fb1",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#8d2849",
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
      className="m-3"
    >
      <ThemeProvider theme={customTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            maxDate={dayjs()}
            /* label="월 별로 모아봐요!" */
            views={["year", "month"]}
            openTo="month"
            format="YYYY 🐰 MM"
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
                  width: "150px",
                  height: "50px",
                  fontSize: "0.875rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  backgroundColor: "#ffffff",
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
