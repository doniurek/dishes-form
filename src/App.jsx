import { Formik, Form, Field } from 'formik'

export default function App() {
  return (
    <div>
      <h1>Dishes</h1>
      <Formik
       initialValues={{
        name: '',
        preparation_time: '',
        type: 'pizza'
        }}
      >
        {(props) => (
          <Form>
            <label htmlFor='name'>Dish Name</label>
            <Field name='name' type='text' required />

            <label htmlFor='preparation_time'>Preparation Time</label>
            <Field name='preparation_time' type='text' required />

            <label htmlFor='type'>Dish Type</label>
            <Field name='type' as='select' required>
              <option value='pizza'>pizza</option>
              <option value='soup'>soup</option>
              <option value='sandwich'>sandwich</option>
            </Field>

            {
              (props.values.type == 'pizza') ? (
                <>
                  <label htmlFor='no_of_slices'>Number of slices</label>
                  <Field name='no_of_slices' type='number' min='1'/>

                  <label htmlFor='diameter'>Diameter</label>
                  <Field name='diameter' type='number' step='any'/>
                </>
              ) : (props.values.type == 'soup') ? (
                <>
                  <label htmlFor='spiciness_scale'>Spiciness scale</label>
                  <Field name='spiciness_scale' type='range' min='1' max='10'/>
                </>
              ) : (
                <>
                  <label htmlFor='slices_of_bread'>Slices of bread</label>
                  <Field name='slices_of_bread' type='number' min='1'/>
                </>
              )
            }
          </Form>
        )}
      </Formik>
    </div>
  )
}