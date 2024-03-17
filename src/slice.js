import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SetCookies, readCookies } from "./utils";

export const get_hint = createAsyncThunk(
  "hunt/get_hint",
  async (params, thunkAPI) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");
    let Path = JSON.parse(readCookies("path"));
    if (Path === undefined || Path === null) {
      Path = [];
    }
    if (id != null) {
      var response = await fetch("/api/is_valid", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: Path,
          id: id,
        }),
      });
      var json = await response.json();
      json.id = id
      return json;
    }
    return({status:false});
  }
);

const initialState = {
  path:
    JSON.parse(readCookies("path")) === null
      ? []
      : JSON.parse(readCookies("path")),
  steps: JSON.parse(readCookies("steps")) === null ?[
    {
      label: "First clue",
      description: "Reach out to CISCO booth to start the scavenger hunt",
      solved_at: null,
      id: null,
    },
    {
      label: "Second clue",
      description: "Solve the first clue",
      solved_at: null,
      id: null,
    },
    {
      label: "Third clue",
      description: "Solve the second clue",
      solved_at: null,
      id: null,
    },
    {
      label: "Finish",
      description: "Wow you finished it.",
      solved_at: null,
      id: null,
    },
  ]:JSON.parse(readCookies("steps")),
  invalid : false
};

export const hunt = createSlice({
  name: "hunt",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_hint.fulfilled, (state, action) => {
        if (action.payload.status === true) {
          console.log(action.payload);
          state.steps[action.payload.pos].description = action.payload.clue;
          state.steps[action.payload.pos].id = action.payload.id
          console.log(Date())
          state.steps[action.payload.pos].solved_at = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} `
          state.path = action.payload.path
          SetCookies("path", JSON.stringify(action.payload.path));
          SetCookies("steps", JSON.stringify(state.steps));
        }
        else{
            if(state.path.length !== state.steps.length){
                state.invalid = true;
            }

        }
      })
      .addCase(get_hint.pending, (state, action) => {
        state.invalid = false;
      })
      .addCase(get_hint.rejected, (state, action) => {});
  },
});

export default hunt.reducer;
