import styled from "styled-components"

const RadioGroup = styled.div`
  display:flex;
  input{position:absolute;width:0;height:0;opacity:0;z-index:-1}
  label{border:1px solid #38B2AC;border-radius:5px;height:40px;padding:0 1rem;
    display:flex;align-items:center;margin-right:7px
  }
  input:checked + label{background:#38B2AC;color:#fff;font-weight:600}
`

export default function ComRadio({...props}) {
  return (
    <RadioGroup>
      {
        props.list.map((el,idx)=>{
          const type = el.split('_')
          return (
          <>
            <input type="radio" 
              id={`${type[0]}_${idx}`} 
              name={type[1]} value={type[0]} 
              {...props.register(props.name, {
                required: `${props.label}은 필수항목 입니다.`,
              })}
            />
            <label htmlFor={`${type[0]}_${idx}`}>{type[1]}</label>
          </>
        )
      })
      }
    </RadioGroup>
  )
}
