/**
 * New Course Form
 *
 * Add course form uses react-hook-form and Material Dialog elements
 * This form shows up in dialogs and it creates new Course
 *
 * @param {Object} authUser - Holds details about the current user
 * @param {Class} firebase - Firebase class provides access to authUser and db
 * @return {<form></form>}
 */

import React, { useState } from "react";

import { useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import MoFormDialog from "components/library/MoFormDialog";
import { questionMock } from "mocks/question";

const NewCourseForm = ({ authUser, firebase }) => {
  /* TODO: add watch and error
   * const { watch, errors } = useForm();
   */
  const { register, handleSubmit } = useForm();

  const [formData] = useState({
    title: "Master React Course",
    desc: "Learn React best practices",
    id: 0
  });

  const Form = ({ handleDialogState }) => {
    /* TODO: Move to hooks or helpers */
    const onSubmit = formData => {
      if (formData.title) {
        // Generate random id to post fix each document id
        const uid = Math.random()
          .toString(36)
          .substring(7);
        // Create doc based on title name, doc is lowercase without spaces
        const doc = formData?.title.replace(/\s+/g, "-").toLowerCase();
        // Final Id for storing
        const id = `${doc}-${uid}`;

        const payload = {
          ...formData,
          doc: id,
          id: 1,
          userId: authUser.uid,
          createdAt: firebase.fieldValue.serverTimestamp()
        };

        // Create courses in db with doc, then set the payload
        firebase
          .collection("courses")
          .doc(id)
          .set(payload, { merge: true });

        // Add a questions array to the collection created above add a placeholder entry
        // TODO: figure a more efficient way to do this with one firebase query
        firebase
          .collection("courses")
          .doc(id)
          .collection("questions")
          .doc()
          .set({ ...questionMock });

        // Set Dialog state back to false to close the Dialog
        handleDialogState(false);
      }
    };
    const handleDialog = () => {
      handleDialogState(false);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <DialogTitle id="form-dialog">New Course</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <TextField
                label="Title"
                autoFocus
                inputRef={register}
                fullWidth
                margin="dense"
                name="title"
                placeholder={formData.title}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                label="Subtitle"
                fullWidth
                inputRef={register}
                margin="dense"
                name="subtitle"
                placeholder={formData.desc}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Difficulty</FormLabel>
                <RadioGroup aria-label="difficulty" name="difficulty">
                  <FormControlLabel
                    inputRef={register}
                    value="easy"
                    control={<Radio />}
                    label="Easy"
                  />
                  <FormControlLabel
                    inputRef={register}
                    value="medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    inputRef={register}
                    value="hard"
                    control={<Radio />}
                    label="Hard"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup aria-label="type" name="type">
                  <FormControlLabel
                    inputRef={register}
                    value="html"
                    control={<Radio />}
                    label="Html"
                  />
                  <FormControlLabel
                    inputRef={register}
                    value="js"
                    control={<Radio />}
                    label="JavaScript"
                  />
                  <FormControlLabel
                    inputRef={register}
                    value="reactJsx"
                    control={<Radio />}
                    label="React"
                  />
                  <FormControlLabel
                    inputRef={register}
                    value="reactStyle"
                    control={<Radio />}
                    label="CSS in JS"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                inputRef={register}
                label="Disable a course"
                name="isDisabled"
                defaultValue={false}
              />
              <FormHelperText>
                Disabling a course disables the course from being accessed
              </FormHelperText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialog()} color="default">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    );
  };

  return <MoFormDialog Component={Form} />;
};

export default NewCourseForm;