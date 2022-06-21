export function mergeCssClasses(...props) {
  
  let cssClasses = []

  props.filter(prop => ['object', 'array', 'string'].indexOf(typeof prop) >= 0).forEach(prop => {

    if (typeof prop == 'string') {
      prop = prop.split(' ')
    }

    cssClasses = cssClasses.concat(prop)

  })

  return cssClasses.join(' ').trim()

}

export function conditionalClassNames(...classes) {
  
  return classes.filter(Boolean).join(' ')
  
}