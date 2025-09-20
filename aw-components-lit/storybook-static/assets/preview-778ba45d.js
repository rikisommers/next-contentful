const r={parameters:{actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}},docs:{extractComponentDescription:(t,{notes:e})=>e?typeof e=="string"?e:e.markdown||e.text:null}},globalTypes:{theme:{name:"Theme",description:"Global theme for components",defaultValue:"light",toolbar:{icon:"paintbrush",items:["light","dark"],showName:!0}}},decorators:[(t,e)=>`
        <div data-theme="${e.globals.theme||"light"}" style="padding: 1rem;">
          ${t()}
        </div>
      `]};export{r as default};
