import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { Field } from "formik";

const myStyle = {
  width: "100%",
  height: "40px",
  border: "2px solid gray",
  borderRadius: "5px",
};

const myStyle2 = {
  width: "100%",
  height: "40px",
  border: "2px solid gray",
  borderRadius: "5px",
};

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length < 6) {
    error = "Password must be at least 6 characters";
  }
  return error;
};

const validatePhone = (value) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (/^[0-9]+$/.test(value) && value.length !== 10) {
    error = "Phone number must be of 10 digits";
  } else if (value.length !== 10) {
    error = "Phone number must be of 10 digits";
  }
  return error;
};

const validateDate = (value) => {
  let error;
  if (!value) {
    error = "Date is required";
  }
  return error;
};

const dataRequired = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

function TextInput(props) {
  const { name, type, validation, errors, touched, label, setData, value } =
    props;
  return (
    <>
      <div className="label_container">
        {label}
        <span className="error_container">
          {" "}
          {" * "}
          {errors[value] && touched[value] && (
            <div className="text-red-700 text-xs">{errors[value]}</div>
          )}{" "}
        </span>{" "}
      </div>
      <Field
        onChange={(e) => {
          const value = e.target.value;
          setData(value);
        }}
        value={value}
        style={myStyle}
        name={name}
        type={type}
        validate={validation}
      />
    </>
  );
}

function TextInputTwo(props) {
  const { name, type, validation, errors, touched, label } = props;
  return (
    <>
      <div className="label_container">
        {label}
        <span className="error_container">
          {" "}
          {" * "}
          {errors[name] && touched[name] && (
            <div className="text-red-700 text-xs">{errors[name]}</div>
          )}{" "}
        </span>{" "}
      </div>
      <Field style={myStyle} name={name} type={type} validate={validation} />
    </>
  );
}

function DateInput(props) {
  const { name, type, validation, errors, touched, label, setData } = props;
  return (
    <>
      <div className="label_container">
        {label}{" "}
        <span className="error_container">
          {" "}
          {" * "}
          {errors[name] && touched[name] && (
            <div className="text-red-700 text-xs">{errors[name]}</div>
          )}{" "}
        </span>
      </div>
      <Field
        onChange={(e) => {
          const value = e.target.value;
          setData(value);
        }}
        style={myStyle}
        name={name}
        type={type}
        validate={validation}
      />
    </>
  );
}

function SelectInput(props) {
  const {
    name,
    type,
    validation,
    errors,
    touched,
    label,
    listArray,
    placeholder,
    setData,
    value,
  } = props;
  return (
    <>
      <div className="label_container">
        {label}{" "}
        <span className="error_container">
          {" "}
          {" * "}
          {errors[value] && touched[name] && (
            <div className="text-red-700 text-xs">{errors[value]}</div>
          )}{" "}
        </span>
      </div>
      <Field
        onChange={(e) => {
          const value = e.target.value;
          setData(value);
        }}
        style={myStyle2}
        as={type}
        name={name}
        id={name}
        validate={validation}
        value={value}
      >
        <option
          value=""
          label={placeholder}
          disabled
          hidden
          className="placeholder"
        />
        {listArray.length > 0 &&
          listArray.map((data, index) => {
            return (
              <option key={index} value={data}>
                {data}
              </option>
            );
          })}
      </Field>
    </>
  );
}

function SelectInputTwo(props) {
  const {
    name,
    type,
    validation,
    errors,
    touched,
    label,
    listArray,
    placeholder,
  } = props;
  return (
    <>
      <div className="label_container">
        {label}{" "}
        <span className="error_container">
          {" "}
          {" * "}
          {errors[name] && touched[name] && (
            <div className="text-red-700 text-xs">{errors[name]}</div>
          )}{" "}
        </span>
      </div>
      <Field
        style={myStyle2}
        as={type}
        name={name}
        id={name}
        validate={validation}
      >
        <option
          value=""
          label={placeholder}
          disabled
          hidden
          className="placeholder"
        />
        {listArray.length > 0 &&
          listArray.map((data, index) => {
            return (
              <option key={index} value={data}>
                {data}
              </option>
            );
          })}
      </Field>
    </>
  );
}

function TextInputWrapper(props) {
  const { name, type, Icon } = props;
  return (
    <>
      <Field style={myStyle} name={name} type={type} className="input-field" />
      <Icon className="input-icon" />
    </>
  );
}

function getNextInstallmentDate(plan, date) {
  const today = new Date(date);
  let monthsToAdd = 0;

  switch (plan) {
    case "Monthly":
      monthsToAdd = 1;
      break;
    case "2 Months":
      monthsToAdd = 2;
      break;
    case "Quarterly":
      monthsToAdd = 3;
      break;
    case "Half Yearly":
      monthsToAdd = 6;
      break;
    case "Yearly":
      monthsToAdd = 12;
      break;
    default:
      return "Invalid plan";
  }

  // Add months to current date
  today.setMonth(today.getMonth() + monthsToAdd);

  // Format date as dd-mm-yyyy
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
}

function formatDate(dateString) {
  // const date = new Date(dateString);
  if(dateString){
  const [day, month, year] = dateString.split("-").map(Number);
  const validDate = new Date(year, month - 1, day);
  const newday = String(validDate.getDate()).padStart(2, "0"); 
  const newmonth = String(validDate.getMonth() + 1).padStart(2, "0"); 
  const newyear = validDate.getFullYear();
  return `${newday}-${newmonth}-${newyear}`;
  }
}

const getPaymentStatus = (nextPaymentDate) => {
  const today = new Date();
  const paymentDate = new Date(nextPaymentDate);

  return today > paymentDate ? "Pending" : "Completed";
};

function BasicTextFields(props) {
  const { validation, label, placeholder, setData, value } = props;
  return (
    <div className="w-full my-4">
      {validation === true && value === "" && (
        <div className="text-red-500 text-sm relative bottom-1">
          {" "}
          * Required
        </div>
      )}
      <TextField
        className={`w-full `}
        required
        id="outlined-required"
        label={label}
        defaultValue={value}
        placeholder={placeholder}
        onChange={(e) => setData(e.target.value)}
      />
    </div>
  );
}

function BasicSelect(props) {
  const { label, listArray, placeholder, setData, value, validation } = props;
  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div className="w-full my-3">
      {validation === true && value === "" && (
        <div className="text-red-500 text-sm relative bottom-1">
          {" "}
          * Required
        </div>
      )}
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        className={`w-full`}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-labelr"
        value={value}
        label={label}
        onChange={handleChange}
        placeholder={placeholder}
      >
        {listArray.map((data, index) => {
          return (
            <MenuItem key={index} value={data}>
              {data}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}

function DatePickerInput(props) {
  const { setData, label, value, validation } = props;
  return (
    <div className="w-full my-5">
      {validation === true && value === "" && (
        <div className="text-red-500 text-sm relative bottom-1">
          {" "}
          * Required
        </div>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs} className="w-full">
        <DatePicker
          className={`w-full `}
          label={label}
          value={null}
          onChange={(newValue) => setData(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}

function TimePickerInput(props) {
  const { setData, label, value, validation } = props;
  return (
    <div className="w-full my-5">
      {validation === true && value === "" && (
        <div className="text-red-500 text-sm relative bottom-1">
          {" "}
          * Required
        </div>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs} className="w-full">
        <TimePicker
          className={`w-full`}
          label={label}
          defaultValue={dayjs("Mon Feb 24 2025 00:00:00")}
          onChange={(e) => {
            setData(`${e.$d}`);
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

export {
  TextInput,
  DateInput,
  SelectInput,
  TextInputWrapper,
  dataRequired,
  validateEmail,
  validatePassword,
  validatePhone,
  validateDate,
  getNextInstallmentDate,
  TextInputTwo,
  SelectInputTwo,
  formatDate,
  getPaymentStatus,
  BasicTextFields,
  BasicSelect,
  DatePickerInput,
  TimePickerInput,
};
