import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './styles.css'

export default function App() {
  return (
    <div id='container'>
      <h1>Dishes</h1>
      <Formik
        initialValues={{
          name: '',
          preparation_time: '',
          type: 'pizza',
          no_of_slices: '',
          diameter: '',
          spiciness_scale: 5,
          slices_of_bread: 1
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, 'Min 3 characters')
            .max(30, 'Max 30 characters')
            .required('Required'),
          preparation_time: Yup.string()
            .required('Required'),
          type: Yup.string()
            .required('Required')
            .oneOf(['pizza', 'soup', 'sandwich']),
          no_of_slices: Yup.number().when('type', {
            is: 'pizza',
            then: () => Yup.number()
              .required('Required')
              .integer('Must be integer')
              .min(1, 'Must be at least 1')
              .max(100, 'Must be no more than 100'),
            otherwise: () => Yup.number().notRequired()
          }),
          diameter: Yup.number().when('type', {
            is: 'pizza',
            then: () => Yup.number()
              .required('Required')
              .min(1, 'Must be at least 1')
              .max(100, 'Must be no more than 100'),
            otherwise: () => Yup.number().notRequired()
          }),
          spiciness_scale: Yup.number().when('type', {
            is: 'soup',
            then: () => Yup.number()
              .required('Required')
              .min(1, 'Must be at least 1')
              .max(100, 'Must be no more than 10'),
          }),
          slices_of_bread: Yup.number().when('type', {
            is: 'sandwich',
            then: () => Yup.number()
              .required('Required')
              .min(1, 'Must be at least 1')
              .max(100, 'Must be no more than 100'),
          })
        })}
        onSubmit={(values) => {
          let request_message = {
            name: values.name,
            preparation_time: values.preparation_time,
            type: values.type
          }
          if (values.type === 'pizza') {
            request_message.no_of_slices = values.no_of_slices
            request_message.diameter = values.diameter
          }
          else if (values.type === 'soup') {
            request_message.spiciness_scale = values.spiciness_scale
          }
          else {
            request_message.slices_of_bread = values.slices_of_bread
          }
          alert(JSON.stringify(request_message, null, 2))}
        }
      >
        {(props) => (
          <Form>
            <label htmlFor='name'>Dish Name</label>
            <Field name='name' type='text' />
            <ErrorMessage name="name" />

            <label htmlFor='preparation_time'>Preparation Time</label>
            <Field name='preparation_time' type='time' step='2' />
            <ErrorMessage name="preparation_time" />

            <label htmlFor='type'>Dish Type</label>
            <Field name='type' as='select'>
              <option value='pizza'>pizza</option>
              <option value='soup'>soup</option>
              <option value='sandwich'>sandwich</option>
            </Field>
            <ErrorMessage name="type" />

            {
              (props.values.type == 'pizza') ? (
                <>
                  <label htmlFor='no_of_slices'>Number of Slices</label>
                  <Field name='no_of_slices' type='number' min='1' max='100'/>
                  <ErrorMessage name="no_of_slices" />

                  <label htmlFor='diameter'>Diameter</label>
                  <Field name='diameter' type='number' step='any' min='1' max='100'/>
                  <ErrorMessage name="diameter" />
                </>
              ) : (props.values.type == 'soup') ? (
                <>
                  <label htmlFor='spiciness_scale'>Spiciness scale</label>
                  <Field name='spiciness_scale' type='range' min='1' max='10' />
                  <ErrorMessage name="spiciness_scale" />
                </>
              ) : (
                <>
                  <label htmlFor='slices_of_bread'>Slices of bread</label>
                  <Field name='slices_of_bread' type='number' min='1' max='100'/>
                  <ErrorMessage name="slices_of_bread" />
                </>
              )
            }

            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}