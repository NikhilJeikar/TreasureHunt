import {
  Alert,
  AppBar,
  Box,
  Button,
  Grid,
  Icon,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_hint } from "./slice";

function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(get_hint());
  }, []);
  const { steps, path, invalid } = useSelector((state) => state.hunt);

  useEffect(() => {
    setShow(invalid);
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [invalid]);

  console.log(path);

  return (
    <div className="App">
      <AppBar>
        <Typography>
          Scavenger Hunt
        </Typography>
      </AppBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper
              activeStep={path.length === 0 ? 0 : path.length - 1}
              orientation="vertical"
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      step.solved_at !== null ? (
                        <Typography variant="caption">
                          {step.solved_at}
                        </Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {path.length === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  Hooray you completed cisco scavenger hunt
                </Typography>
              </Paper>
            )}
          </Box>
        </Grid>
        {show ? <Alert severity="error">Invalid QR</Alert> : null}
      </Grid>
    </div>
  );
}

export default App;
