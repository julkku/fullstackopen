import React, { useState } from "react";
import { Grid, Button, Segment } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption, HealthRatingOption, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Entry, HealthCheckRating, HealthCheckTypes } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}



const typeOptions: EntryTypeOption[] = [
    { value: "HealthCheck", label: "Health check" },
    { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
    { value: "Hospital", label: "Hospital" },
];

const healthRatingOptions: HealthRatingOption[] = [
    { value: HealthCheckRating.Healty, label: "Healty" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
    { value: HealthCheckRating.HighRisk, label: "Hight risk" },
    { value: HealthCheckRating.LowRisk, label: "Low risk" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [type, setType] = useState('HealthCheck');
    const [{ diagnoses }] = useStateValue();

    const initialValues = {
        type: type as HealthCheckTypes,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
        employerName: "",
        sickLeave: {
            startDate: "",
            endDate: ""
        },
        discharge: {
            date: "",
            criteria: ""
        },

    };

    return (
        <div>

            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={onSubmit}
                validate={values => {
                    const requiredError = "Field is required";
                    const errors: { [field: string]: string } = {};
                    if (!values.type) {
                        errors.type = requiredError;
                    }
                    if (!values.description) {
                        errors.description = requiredError;
                    }
                    if (!values.date) {
                        errors.date = requiredError;
                    }
                    if (!values.specialist) {
                        errors.specialist = requiredError;
                    }
                    if (type === "HealthCheck" && !values.healthCheckRating) {
                        errors.healthCheckRating = requiredError;
                    }
                    if (type === "Hospital" && !values.discharge.date) {
                        errors.discharge = requiredError;
                    }
                    if (type === "Hospital" && !values.discharge.criteria) {
                        errors.discharge = requiredError;
                    }
                    if (type === "OccupationalHealthcare" && !values.employerName) {
                        errors.employerName = requiredError;
                    }

                    return errors;
                }}
            >
                {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                    return (

                        <Form className="form ui">
                            <label>Type:</label>
                            <select name="type"
                                className="ui dropdown"
                                onChange={e => {
                                    setType(e.target.value);
                                    setFieldValue("type", e.target.value);
                                }}
                                value={type}>
                                {typeOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label || option.value}
                                    </option>
                                ))}
                            </select>
                            <Field type="hidden"
                                name="type"
                                value={type} />

                            <Field
                                label="Description"
                                placeholder="description"
                                name="description"
                                component={TextField}
                            />
                            <Field
                                label="Date"
                                placeholder="YYYY-MM-DD"
                                name="date"
                                component={TextField}
                            />
                            <Field
                                label="specialist"
                                placeholder="Specialist"
                                name="specialist"
                                component={TextField}
                            />
                            <DiagnosisSelection
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                diagnoses={Object.values(diagnoses)}
                            />
                            {type === "HealthCheck" &&
                                <SelectField
                                    label="Health rating"
                                    name="healthCheckRating"
                                    options={healthRatingOptions}
                                />}
                            {type === "OccupationalHealthcare" &&
                                <div>
                                    <Field
                                        label="Employer name"
                                        placeholder="employer"
                                        name="employerName"
                                        component={TextField}
                                    />
                                    <Segment>
                                        <Field
                                            label="Sickleave start date"
                                            placeholder="YYYY-MM-DD"
                                            name="sickLeave.startDate"
                                            component={TextField}
                                        />
                                        <Field
                                            label="Sickleave end date"
                                            placeholder="YYYY-MM-DD"
                                            name="sickLeave.endDate"
                                            component={TextField}
                                        />
                                    </Segment>
                                </div>
                            }
                            {type === "Hospital" &&
                                <div>
                                    <Field
                                        label="Discharge date"
                                        placeholder="YYYY-MM-DD"
                                        name="discharge.date"
                                        component={TextField}
                                    />
                                    <Field
                                        label="Discharge criteria"
                                        placeholder="criteria"
                                        name="discharge.criteria"
                                        component={TextField}
                                    />
                                </div>
                            }
                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button type="button" onClick={onCancel} color="red">
                                        Cancel
                    </Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button
                                        type="submit"
                                        floated="right"
                                        color="green"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add
                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>

        </div>
    );
};

export default AddEntryForm;
