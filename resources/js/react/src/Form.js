import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import {
  ButtonPrimary,
  Button,
  Input,
  Select,
  Label,
  ValidationErrors,
  Combobox
} from '.'

export function Form({ fields, route, method, formSubmitButtonText, className, ...props }) {

  const defaults = {}
  
  fields.map(field => defaults[field.name] = field.default)

  const { data, setData, post, put, processing, progress, errors, reset } = useForm(defaults)

  const onHandleChange = (event) => {
    
    const element = event.target

    let value

    switch(element.type) {
      case 'checkbox':
        value = element.checked
      default:
        value = element.value
    }

    setData(element.name, value)

  }

  const submit = (e) => {
    e.preventDefault()

    if (method === 'put') {
      put(route)
    } else {
      post(route)
    }
  }

  return (
    <form onSubmit={submit} className={`${className} block relative`} {...props}>

      <ValidationErrors errors={errors} />

      <div className="space-y-6">
          
        {fields.map((field, i) => (

          <div key={field.name}>

            {field.label && (
              <Label forInput={field.name} value={field.label} />
            )}

            {field.type === 'select' && (

              <Select
                options={field.options}
                name={field.name}
                value={data[field.name]}
                autoComplete={['first_name', 'last_name', 'email', 'password'].indexOf(field.name) >= 0 ? field.name : null}
                className="block w-full mt-1"
                isFocused={i === 0}
                handleChange={onHandleChange}
                required={field.required} />

            )}

            {['text', 'number', 'email', 'date'].indexOf(field.type) >= 0 && (

              <Input
                type={field.type}
                name={field.name}
                value={data[field.name]}
                autoComplete={['first_name', 'last_name', 'email', 'password'].indexOf(field.name) >= 0 ? field.name : null}
                className="block w-full mt-1"
                isFocused={i === 0}
                handleChange={onHandleChange}
                required={field.required} />

            )}

            {field.type === 'file' && (

              <div>

                <input
                  type="file"
                  name={field.name}
                  className="text-chrome-500"
                  onChange={event => setData(field.name, event.target.files[0])}
                  required={field.required} />

                {progress && (
                  <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                  </progress>
                )}

              </div>

            )}

            {field.type === 'combobox' && (

              <Combobox
                options={field.options}
                handleChange={option => setData(field.name, option.id)}
                />

            )}

          </div>

        ))}

      </div>

      <div className="flex justify-end mt-4">

        <Button onClick={() => window.history.back()} className="sm:bg-transparent sm:hover:bg-transparent sm:underline sm:hover:no-underline" text="Cancel" />
        
        <ButtonPrimary
          type="submit"
          className="ml-4"
          disabled={processing}
          text={formSubmitButtonText} />

      </div>

    </form>
  )
}